import { Request, Response } from "express";
import {
  createPackage,
  getAllPackages,
  getPackage,
  updatePackage,
  deletePackage,
} from "../service/package.service";
import { sanitizePackage } from "../utils/sanitize";
import mongoose from "mongoose";

export async function getAllPackagesHandler(req: Request, res: Response) {
  const packageList = await getAllPackages();

  return res.send(packageList);
}

export async function getPackageHandler(req: Request, res: Response) {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.sendStatus(404);

  const packageElement = await getPackage(id);

  if (!packageElement) {
    return res.status(404).send("Package not found");
  }

  return res.send(packageElement);
}

export async function createPackageHandler(req: Request, res: Response) {
  const createInput = sanitizePackage(req.body);
  const userId = res.locals.user._id;

  const packageElement = await createPackage({
    ...createInput,
    user_id: userId,
  });

  return res.send(packageElement);
}

export async function updatePackageHandler(req: Request, res: Response) {
  const { id } = req.params;
  const updateInput = sanitizePackage(req.body);

  const packageExisits = await getPackage(id);

  if (!packageExisits) {
    return res.status(404).send("Package not found");
  }

  const packageUpdate = await updatePackage({ _id: id }, updateInput, {
    new: true,
  });

  return res.send(packageUpdate);
}

export async function deletePackageHandler(req: Request, res: Response) {
  const { id } = req.params;

  const packageExisits = await getPackage(id);

  if (!packageExisits) {
    return res.status(404).send("Package not found");
  }

  await deletePackage({ _id: id });

  return res.sendStatus(200);
}
