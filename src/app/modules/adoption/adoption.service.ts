import { JwtPayload } from "jsonwebtoken";
import prisma from "../../../utils/prisma";
import { AdoptionRequestStatus } from "@prisma/client";

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


// get all requests
const getAllRequests = async () => {
  const result = await prisma.adoptionRequest.findMany();

  return result;
};


// update adoption request status
const updateAdoptionStatus = async (
  status: AdoptionRequestStatus,
  id: string
) => {

  // check if request exists
  const adoptionRequest = await prisma.adoptionRequest.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const result = await prisma.adoptionRequest.update({
    where: {
      id: adoptionRequest.id,
    },
    data: {
      status,
    },
  });

  return result;
};


export const AdoptionServices = {
  submitAdoptionRequest,
  getAllRequests,
  updateAdoptionStatus,
};
