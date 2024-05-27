import PackageModel, {
  PackageDocument,
  PackageInput,
} from "../models/package.model";
import mongoose, { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";

export async function createPackage(input: PackageInput) {
  try {
    const packageData = await PackageModel.create(input);
    return packageData.toJSON();
  } catch (e: any) {
    throw new Error(e);
  }
}

export async function getPackage(id: string) {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) throw new Error("invalid id");

    const packageData = await PackageModel.findById(id);

    return packageData?.toJSON();
  } catch (e: any) {
    throw new Error(e);
  }
}

export async function getAllPackages() {
  try {
    return await PackageModel.find().lean();
  } catch (e: any) {
    throw new Error(e);
  }
}

export async function updatePackage(
  query: FilterQuery<PackageDocument>,
  update: UpdateQuery<PackageDocument>,
  options: QueryOptions
) {
  try {
    return await PackageModel.findOneAndUpdate(query, update, options).lean();
  } catch (e: any) {
    throw new Error(e);
  }
}

export async function deletePackage(query: FilterQuery<PackageDocument>) {
  try {
    return PackageModel.deleteOne(query);
  } catch (e: any) {
    throw new Error(e);
  }
}
