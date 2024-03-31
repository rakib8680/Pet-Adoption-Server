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

    // console.log(params);

    const {searchTerm ,age, ...filterableData}  = params;

    //Convert age to integer if it exists in filterableData
    if(filterableData.hasOwnProperty("age")){
        filterableData['age'] = parseInt(filterableData['age']);
    }



    // searching 
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
  };



//filtering 
if(age){
    andConditions.push({
        age: {
            equals: parseInt(age),
        }
    })
};
if(Object.keys(filterableData).length > 0){
    andConditions.push({
        AND: Object.keys(filterableData).map(field => ({
            [field]:{
                equals: filterableData[field],
                mode: "insensitive"
            }
        }))
    })
};



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
