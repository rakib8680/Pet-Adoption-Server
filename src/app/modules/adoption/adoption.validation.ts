import { AdoptionRequestStatus } from "@prisma/client";
import { z } from "zod";



export const submitAdoptionValidationSchema = z.object({
    petId : z.string({ required_error: "Pet ID is required" }),
    petOwnershipExperience : z.string({ required_error: "Pet Ownership Experience is required" })
});


export const updateAdoptionStatusValidationSchema = z.object({
    status : z.enum([AdoptionRequestStatus.APPROVED, AdoptionRequestStatus.REJECTED, AdoptionRequestStatus.PENDING],{ required_error: "Status is required"})
})


