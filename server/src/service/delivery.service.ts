import DeliveryModel, {
  DeliveryDocument,
  DeliveryInput,
} from "../models/delivery.model";
import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";

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
    return await DeliveryModel.findOneAndUpdate(query, update, options);
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
