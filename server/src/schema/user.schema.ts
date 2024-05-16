import { object, string, TypeOf } from "zod";

export const createUserSchema = object({
  body: object({
    name: string({
      required_error: "Name is require.",
    }),
    password: string({
      required_error: "Password is required.",
    }).min(6, "Password too short - should be 6 characters minimum."),
    passwordConfirm: string({
      required_error: "Password confirm is required.",
    }),
    email: string({
      required_error: "Email is required.",
    }).email("Not a valid email."),
  }).refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords do not match.",
    path: ["passwordConfirm"],
  }),
});

export type CreateUserInput = Omit<
  TypeOf<typeof createUserSchema>,
  "body.passwordConfirm"
>;
