type LocationType = {
  lat: number;
  lng: number;
};
export interface PackageType {
  _id: string;
  package_id: string;
  user_id?: string;
  active_delivery_id?: string;
  description?: string;
  weight?: number;
  height?: number;
  depth?: number;
  from_name?: string;
  from_address?: string;
  from_location: LocationType;
  to_name?: string;
  to_address?: string;
  to_location: LocationType;
}

export interface DeliveryType {
  _id: string;
  delivery_id: string;
  package_id?: string;
  user_id?: string;
  pickup_time?: Date;
  start_time?: Date;
  end_time?: Date;
  location: LocationType;
  status?: "open" | "picked-up" | "in-transit" | "delivered" | "failed";
}
