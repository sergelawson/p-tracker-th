import { pick } from "lodash";

export function sanitizePackage(input: any) {
  return pick(input, [
    "user_id",
    "active_delivery_id",
    "description",
    "weight",
    "height",
    "depth",
    "from_name",
    "from_address",
    "from_location",
    "to_name",
    "to_address",
    "to_location",
  ]);
}

export function sanitizeDelivery(input: any) {
  return pick(input, [
    "package_id",
    "user_id",
    "pickup_time",
    "start_time",
    "end_time",
    "location",
  ]);
}
