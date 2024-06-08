import zod, { object, string } from "zod";

const validateNumber = (val: any) => !(isNaN(Number(val)) || val === "");
const parseToNumber = (value: any) => {
  return Number(value);
};
const isValidDate = (value: any): boolean => {
  const date = new Date(value);
  return date instanceof Date && !isNaN(date.getTime());
};

export const DeliveryInputSchema = object({
  package_id: string().min(1, { message: "package id is require." }),
  pickup_time: string()
    .refine(isValidDate, { message: "pickup time invalid" })
    .transform((value) => new Date(value).getTime()),

  location: object({
    lat: string()
      .refine(validateNumber, { message: "to location latituude is invalid" })
      .transform(parseToNumber),
    lng: string()
      .refine(validateNumber, { message: "to location longitude is invalid" })
      .transform(parseToNumber),
  }),
});

export type DelivertInputType = zod.infer<typeof DeliveryInputSchema>;
