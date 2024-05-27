import { NextFunction, Request, Response } from "express";
import {
  createDelivery,
  getAllDeliveries,
  getDelivery,
  updateDelivery,
  deleteDelivery,
} from "../service/delivery.service";
import { sanitizeDelivery } from "../utils/sanitize";

export async function getAllDeliveriesHandler(req: Request, res: Response) {
  const delivery = await getAllDeliveries();

  return res.send(delivery);
}

export async function getDeliveryHandler(req: Request, res: Response) {
  const { id } = req.params;

  const delivery = await getDelivery(id);

  if (!delivery) {
    return res.status(404).send("Delivery not found");
  }

  return res.send(delivery);
}

export async function createDeliveryHandler(req: Request, res: Response) {
  const input = sanitizeDelivery(req.body);
  const userId = res.locals.user._id;

  const delivery = await createDelivery({ ...input, user_id: userId });

  return res.send(delivery);
}

export async function updateDeliveryHandler(req: Request, res: Response) {
  const input = sanitizeDelivery(req.body);
  const { id } = req.params;

  const deliveryExist = await getDelivery(id);

  if (!deliveryExist) {
    return res.status(404).send("Delivery not found");
  }

  const delivery = await updateDelivery({ _id: id }, input, {
    new: true,
  });

  return res.send(delivery);
}

export async function deleteDeliveryHandler(req: Request, res: Response) {
  const { id } = req.params;

  const deliveryExist = await getDelivery(id);

  if (!deliveryExist) {
    return res.status(404).send("Delivery not found");
  }

  await deleteDelivery({ _id: id });

  return res.sendStatus(200);
}
