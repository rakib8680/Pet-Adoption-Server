import { JwtPayload } from "jsonwebtoken";
import prisma from "../../../utils/prisma";
import { AdoptionRequestStatus } from "@prisma/client";
import { TAdoptionRequest } from "./adoption.interfaces";



// submit an adoption request
const submitAdoptionRequest = async (
  payload: TAdoptionRequest,
  user: JwtPayload
) => {


  const {petId, ...rest} = payload;

  // check if pet exists
  const pet = await prisma.pet.findUniqueOrThrow({
    where: {
      id: petId,
    },
  });

  const adoptionData = {
    userId: user.id,
    petId: pet.id,
    ...rest
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


// get my  requests 
const getMyAdoptedPetRequests = async (user:JwtPayload, status:AdoptionRequestStatus)=>{

  let result = null;

  if(status === AdoptionRequestStatus.APPROVED){
    result = await prisma.adoptionRequest.findMany({
      where:{
        userId: user.id,
        status: AdoptionRequestStatus.APPROVED
      },
      include:{
        pet:true
      }
    });
  }else{
    result = await prisma.adoptionRequest.findMany({
      where:{
        userId: user.id,
        status: {
          not: AdoptionRequestStatus.APPROVED
        }
      }
    });
  }
    
    return result;
}


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
    }
  });

  return result;
};


export const AdoptionServices = {
  submitAdoptionRequest,
  getAllRequests,
  updateAdoptionStatus,
  getMyAdoptedPetRequests
};
