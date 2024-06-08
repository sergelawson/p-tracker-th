import zod, { object, string } from "zod";

const validateNumber = (val: any) => !(isNaN(Number(val)) || val === "");
const parseToNumber = (value: any) => {
  return Number(value);
};

export const PackageInputSchema = object({
  description: string().min(1, { message: "description is require." }),
  weight: string()
    .refine(validateNumber, { message: "weight is invalid" })
    .transform(parseToNumber),
  height: string()
    .refine(validateNumber, { message: "height is invalid" })
    .transform(parseToNumber),
  depth: string()
    .refine(validateNumber, { message: "depth is invalid" })
    .transform(parseToNumber),
  from_name: string().min(1, { message: "from name is require." }),
  from_address: string().min(1, { message: "from address is require." }),
  from_location: object({
    lat: string()
      .refine(validateNumber, { message: "from location latitude is invalid" })
      .transform(parseToNumber),
    lng: string()
      .refine(validateNumber, { message: "from location longitude is invalid" })
      .transform(parseToNumber),
  }),
  to_name: string().min(1, { message: "to name is require." }),
  to_address: string().min(1, { message: "to address is require." }),
  to_location: object({
    lat: string()
      .refine(validateNumber, { message: "to location latituude is invalid" })
      .transform(parseToNumber),
    lng: string()
      .refine(validateNumber, { message: "to location longitude is invalid" })
      .transform(parseToNumber),
  }),
});

export type PackageInputType = zod.infer<typeof PackageInputSchema>;
