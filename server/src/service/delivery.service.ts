import DeliveryModel, {
  DeliveryDocument,
  DeliveryInput,
} from "../models/delivery.model";
import mongoose, { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";

export async function createDelivery(input: DeliveryInput) {
  try {
    const deliveryData = await DeliveryModel.create(input);
    return deliveryData.toJSON();
  } catch (e: any) {
    throw new Error(e);
  }
}

export async function getDelivery(id: string) {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) throw new Error("invalid id");

    const deliveryData = await DeliveryModel.findById(id);

    return deliveryData?.toJSON();
  } catch (e: any) {
    throw new Error(e);
  }
}

export async function getAllDeliveries() {
  try {
    return await DeliveryModel.find().lean();
  } catch (e: any) {
    throw new Error(e);
  }
}

export async function updateDelivery(
  query: FilterQuery<DeliveryDocument>,
  update: UpdateQuery<DeliveryDocument>,
  options: QueryOptions
) {
  try {
    return await DeliveryModel.findOneAndUpdate(query, update, options).lean();
  } catch (e: any) {
    throw new Error(e);
  }
}

export async function deleteDelivery(query: FilterQuery<DeliveryDocument>) {
  try {
    return DeliveryModel.deleteOne(query);
  } catch (e: any) {
    throw new Error(e);
  }
}
