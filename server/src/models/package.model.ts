import mongoose, { Schema } from "mongoose";
import { UserDocument } from "./user.model";
import { DeliveryDocument } from "./delivery.model";

type LocationType = {
  lat: number;
  lng: number;
};
export interface PackageInput {
  user_id?: UserDocument["_id"];
  active_delivery_id?: DeliveryDocument["delivery_id"];
  description?: string;
  weight?: number;
  height?: number;
  depth?: number;
  from_name?: string;
  from_address?: string;
  from_location?: LocationType;
  to_name?: string;
  to_address?: string;
  to_location?: LocationType;
}

export interface PackageDocument extends PackageInput, mongoose.Document {
  package_id: string;
  createdAt: Date;
  updatedAt: Date;
}

const packageSchema = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    active_delivery_id: {
      type: Schema.Types.ObjectId,
      ref: "Delivery",
    },
    description: { type: String, required: true },
    weight: { type: Number, required: true },
    height: { type: Number, required: true },
    depth: { type: Number, required: true },
    from_name: { type: String, required: true },
    from_address: { type: String, required: true },
    from_location: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
    to_name: { type: String, required: true },
    to_address: { type: String, required: true },
    to_location: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
  },
  {
    timestamps: true,
  }
);

packageSchema.virtual("package_id").get(function () {
  return this._id;
});

// Ensure virtual fields are included in JSON output
packageSchema.set("toJSON", { virtuals: true });
packageSchema.set("toObject", { virtuals: true });

const PackageModel = mongoose.model<PackageDocument>("Package", packageSchema);

export default PackageModel;
