import { JwtPayload } from "jsonwebtoken";
import prisma from "../../../utils/prisma";

type TAdoptionRequest = {
  petId: string;
  petOwnershipExperience: string;
};



// submit an adoption request
const submitAdoptionRequest = async (
  payload: TAdoptionRequest,
  user: JwtPayload
) => {

  // check if pet exists
  const pet = await prisma.pet.findUniqueOrThrow({
    where: {
      id: payload.petId,
    },
  });

  const adoptionData = {
    userId: user.id,
    petId: pet.id,
    petOwnershipExperience: payload.petOwnershipExperience,
  };

  const result = await prisma.adoptionRequest.create({
    data: adoptionData,
  });

  return result;
};



export const AdoptionServices = {
  submitAdoptionRequest,
};
