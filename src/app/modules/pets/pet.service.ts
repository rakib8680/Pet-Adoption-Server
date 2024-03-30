import prisma from "../../../utils/prisma";


// add a pet 
const addPet = async (payload :TPet) =>{

    const result = await prisma.pet.create({
        data: payload
    });


    return result ;

};




export const PetServices = {
    addPet
}