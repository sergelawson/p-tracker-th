import { object, string, number } from "zod";

export const createPackageSchema = object({
  body: object({
    description: string({
      required_error: "description is require.",
    }),
    weight: number({
      required_error: "weight is required.",
    }),
    height: number({
      required_error: "height confirm is required.",
    }),
    depth: number({
      required_error: "depth is required.",
    }),
    from_name: string({
      required_error: "depth is required.",
    }),
    from_address: string({
      required_error: "from_address is required.",
    }),
    from_location: object({
      lat: number({
        required_error: "lat is required",
      }),
      lng: number({
        required_error: "lng is required",
      }),
    }),
    to_name: string({
      required_error: "to_name is required.",
    }),
    to_address: string({
      required_error: "to_address is required.",
    }),
    to_location: object({
      lat: number({
        required_error: "lat is required",
      }),
      lng: number({
        required_error: "lng is required",
      }),
    }),
  }),
});

export const requiredPackageSchema = object({
  params: object({
    id: string({
      required_error: "package id is required.",
    }),
  }),
});
