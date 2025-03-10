import { Pet, Prisma } from "@prisma/client";
import prisma from "../../../utils/prisma";
import { petSearchableFields } from "./pet.constants";
import { calculatePagination } from "../../../utils/calculatePagination";
import { TPet } from "./pet.interface";

// add a pet
const addPet = async (payload: TPet) => {
  const result = await prisma.pet.create({
    data: payload,
  });

  return result;
};

// delete a pet
const deletePet = async (id: string) => {
  // check if pet exists
  await prisma.pet.findUniqueOrThrow({
    where: {
      id,
    },
  });

  await prisma.pet.delete({
    where: {
      id,
    },
  });

  return { message: "Pet deleted successfully" };
};

// get all pets
const getAllPets = async (params: any, options: any) => {
  const { page, limit, skip, sortBy, sortOrder } = calculatePagination(options);

  const { searchTerm, age, ...filterableData } = params;

  //Convert age to integer if it exists in filterableData
  if (filterableData.hasOwnProperty("age")) {
    filterableData["age"] = parseInt(filterableData["age"]);
  }

  const andConditions: Prisma.PetWhereInput[] = [];

  // search filtering
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

  //Solid filtering
  if (age) {
    andConditions.push({
      age: {
        equals: parseInt(age),
      },
    });
  }

  if (Object.keys(filterableData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterableData).map((field) => ({
        [field]: {
          equals: filterableData[field],
        },
      })),
    });
  }

  const whereConditions: Prisma.PetWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  // console.log(whereConditions.AND[0].OR);

  //   final result
  const result = await prisma.pet.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder as Prisma.SortOrder,
    },
  });

  const total = result.length;

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

// get single get
const getSinglePet = async (id: string) => {
  const result = await prisma.pet.findUniqueOrThrow({
    where: {
      id,
    },
  });

  return result;
};

// update pet
const updatePet = async (id: string, payload: Partial<Pet>): Promise<Pet> => {
  // check if pet exists
  await prisma.pet.findUniqueOrThrow({
    where: {
      id,
    },
  });

  // update the pet
  const result = await prisma.pet.update({
    where: {
      id,
    },
    data: payload,
  });

  return result;
};

export const PetServices = {
  addPet,
  getAllPets,
  updatePet,
  getSinglePet,
  deletePet,
};
