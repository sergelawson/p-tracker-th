import DeliveryModel, {
  DeliveryDocument,
  DeliveryInput,
} from "../models/delivery.model";
import mongoose, {
  FilterQuery,
  QueryOptions,
  UpdateQuery,
  startSession,
} from "mongoose";
import PackageModel from "../models/package.model";

export async function createDelivery(input: DeliveryInput) {
  const session = await startSession();
  session.startTransaction();

  try {
    const deliveryData = new DeliveryModel(input);

    await deliveryData.save({ session });

    const deliveryPackage = await PackageModel.findById(
      input.package_id
    ).session(session);

    if (!deliveryPackage) {
      throw new Error("Package not found");
    }

    deliveryPackage.active_delivery_id = deliveryData._id;

    await deliveryPackage.save({ session });

    await session.commitTransaction();
    session.endSession();
    return deliveryData.toJSON();
  } catch (e: any) {
    await session.abortTransaction();
    session.endSession();

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
