import prisma from "../../../utils/prisma";
import { TUserPayload } from "./user.interfaces";



// create user 
const registerUser  = async (payload:TUserPayload)=>{

    // const result = await prisma.user.create({
    //     data:
    // })
    console.log('user created successfully');

};


export const UserServices = {
registerUser
}

