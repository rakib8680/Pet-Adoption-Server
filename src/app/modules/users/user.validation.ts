import { z } from "zod";

const createUserValidationSchema = z.object({
  name: z.string({ required_error: "Name is required" }),
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Email must be a valid email address." }),
  password: z
    .string({ required_error: "Password is required" })
    .min(4, { message: "Password must be at least 6 characters long" }),
  gender: z.enum(["MALE", "FEMALE"]).optional(),
  role: z.enum(["ADMIN", "USER"]).optional(),
  status: z.enum(["ACTIVE", "BLOCKED"]).optional(),
  age: z.number().int().positive().optional(),
  location: z.string().optional(),
  contactNumber: z.string().optional(),
});

const updateUserValidationSchema = createUserValidationSchema.partial();

export const userValidations = {
  createUserValidationSchema,
  updateUserValidationSchema,
};
