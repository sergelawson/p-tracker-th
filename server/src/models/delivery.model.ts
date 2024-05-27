import mongoose, { Schema } from "mongoose";

import { UserDocument } from "./user.model";
import { PackageDocument } from "./package.model";

type LocationType = {
  lat: number;
  lng: number;
};

export interface DeliveryInput {
  package_id?: PackageDocument["package_id"];
  user_id?: UserDocument["_id"];
  pickup_time?: Date;
  start_time?: Date;
  end_time?: Date;
  location?: LocationType;
  status?: "open" | "picked-up" | "in-transit" | "delivered" | "failed";
}

export interface DeliveryDocument extends DeliveryInput, mongoose.Document {
  delivery_id: string;
  createdAt: Date;
  updatedAt: Date;
}

const deliverySchema = new Schema(
  {
    package_id: { type: Schema.Types.ObjectId, ref: "Package", required: true },
    user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    pickup_time: { type: Date },
    start_time: { type: Date },
    end_time: { type: Date },
    location: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
    status: { type: String, required: true, default: "open" },
  },
  {
    timestamps: true,
  }
);

deliverySchema.virtual("delivery_id").get(function () {
  return this._id;
});

deliverySchema.set("toJSON", { virtuals: true });
deliverySchema.set("toObject", { virtuals: true });

const DeliveryModel = mongoose.model<DeliveryDocument>(
  "Delivery",
  deliverySchema
);

export default DeliveryModel;
