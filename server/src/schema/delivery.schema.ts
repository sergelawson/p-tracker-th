import z, { object, string, number } from "zod";

export const createDeliverySchema = object({
  body: object({
    package_id: string({
      required_error: "package_id is require.",
    }),
    pickup_time: number({
      required_error: "pickup_time is required.",
    }),
    location: object({
      lat: number({
        required_error: "lat is required",
      }),
      lng: number({
        required_error: "lng is required",
      }),
    }),
  }),
});

export const updateDeliverySchema = object({
  params: object({
    id: string({
      required_error: "delivery id is required.",
    }),
  }),
  body: object({
    location: object({
      lat: number({
        required_error: "lat is required",
      }),
      lng: number({
        required_error: "lng is required",
      }),
    }),
    status: z.enum([
      "open",
      "picked-up",
      "in-transit",
      "delivered",
      "failed",
    ] as const),
  }),
});

export const updateDeliveryWSSchema = object({
  deliveryId: string({
    required_error: "delivery id is required.",
  }),
  location: object({
    lat: number({
      required_error: "lat is required",
    }),
    lng: number({
      required_error: "lng is required",
    }),
  }).optional(),
  status: z
    .enum(["open", "picked-up", "in-transit", "delivered", "failed"] as const)
    .optional(),
});

export const requiredDeliverySchema = object({
  params: object({
    id: string({
      required_error: "delivery id is required.",
    }),
  }),
});
