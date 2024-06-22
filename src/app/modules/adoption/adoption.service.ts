import { JwtPayload } from "jsonwebtoken";
import prisma from "../../../utils/prisma";
import { AdoptionRequestStatus } from "@prisma/client";
import { TAdoptionRequest } from "./adoption.interfaces";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";



// submit an adoption request
const submitAdoptionRequest = async (
  payload: TAdoptionRequest,
  user: JwtPayload
) => {
  const { petId, ...rest } = payload;

  // check if pet exists
  const pet = await prisma.pet.findUniqueOrThrow({
    where: {
      id: petId,
    },
  });

  // check if the pet is already adopted
  const isAdopted = await prisma.adoptionRequest.findFirst({
    where: {
      petId,
      status: AdoptionRequestStatus.APPROVED,
    },
  });
  if (isAdopted) {
    throw new AppError(httpStatus.BAD_REQUEST, "This pet is already adopted");
  }

  // check if my request is already submitted
  const existingRequest = await prisma.adoptionRequest.findFirst({
    where: {
      userId: user.id,
      petId,
    },
  });
  if (existingRequest) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "You have already submitted a request for this pet"
    );
  }

  const adoptionData = {
    userId: user.id,
    petId: pet.id,
    ...rest,
  };

  const result = await prisma.adoptionRequest.create({
    data: adoptionData,
  });

  return result;
};



// get all requests
const getAllRequests = async () => {
  const result = await prisma.adoptionRequest.findMany({include:{pet:true, user:true}});

  return result;
};



// get my  requests
const getMyAdoptedPetRequests = async (
  user: JwtPayload,
  status: AdoptionRequestStatus
) => {
  let result = null;

  if (status === AdoptionRequestStatus.APPROVED) {
    result = await prisma.adoptionRequest.findMany({
      where: {
        userId: user.id,
        status: AdoptionRequestStatus.APPROVED,
      },
      include: {
        pet: true,
      },
    });
  } else if (status === AdoptionRequestStatus.REJECTED) {
    result = await prisma.adoptionRequest.findMany({
      where: {
        userId: user.id,
        status: AdoptionRequestStatus.REJECTED,
      },
      include: {
        pet: true,
      },
    });
  } else {
    result = await prisma.adoptionRequest.findMany({
      where: {
        userId: user.id,
        status: AdoptionRequestStatus.PENDING,
      },
      include: {
        pet: true,
      },
    });
  }

  return result;
};



// delete my adoption request
const deleteMyAdoptionRequest = async (user: JwtPayload, id: string) => {
  // check if request exists
  const adoptionRequest = await prisma.adoptionRequest.findUniqueOrThrow({
    where: { id },
  });

  // check if user is the owner of the request
  if (adoptionRequest.userId !== user?.id) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      "You are not authorized to delete this request"
    );
  }

  await prisma.adoptionRequest.delete({
    where: { id },
  });

  return { message: "Adoption request deleted successfully" };
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
  getMyAdoptedPetRequests,
  deleteMyAdoptionRequest,
};
