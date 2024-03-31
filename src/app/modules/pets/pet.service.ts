import { Prisma } from "@prisma/client";
import prisma from "../../../utils/prisma";
import { petSearchableFields } from "./pet.constants";



// add a pet
const addPet = async (payload: TPet) => {
  const result = await prisma.pet.create({
    data: payload,
  });

  return result;
};



// get all pets
const getAllPets = async (params: any) => {

  const andConditions: Prisma.PetWhereInput[] = [];
  if (params.searchTerm) {
    andConditions.push({
      OR: petSearchableFields.map((field) => ({
        [field]: {
          contains: params.searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  const whereConditions: Prisma.PetWhereInput = { AND: andConditions };

  const result = await prisma.pet.findMany({
    where: whereConditions,
  });


  return result;
};



export const PetServices = {
  addPet,
  getAllPets,
};
