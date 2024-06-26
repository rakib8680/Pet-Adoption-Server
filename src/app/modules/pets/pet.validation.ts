import { z } from "zod";

const createPetValidationSchema = z.object({
  name: z.string({ required_error: "Name is required" }),
  species: z.string({ required_error: "Species is required" }),
  breed: z.string({ required_error: "Breed is required" }),
  age: z.number({ required_error: "Age is required" }),
  size: z.string({ required_error: "Size is required" }),
  location: z.string({ required_error: "Location is required" }),
  description: z.string({ required_error: "Description is required" }),
  temperament: z.string({ required_error: "Temperament is required" }),
  medicalHistory: z.string({ required_error: "Medical History is required" }),
  adoptionRequirements: z.string({
    required_error: "Adoption Requirements is required",
  }),
});

const updatePetValidationSchema = createPetValidationSchema.partial();

export const petValidations = {
  createPetValidationSchema,
  updatePetValidationSchema,
};
