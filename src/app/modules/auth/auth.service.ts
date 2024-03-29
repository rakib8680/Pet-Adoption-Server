import prisma from "../../../utils/prisma";
import { TLoginPayload } from "../users/user.interfaces";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";




// login user 
const loginUser =  async (payload:TLoginPayload)=>{

    // check if the user exists
    const user = await prisma.user.findUniqueOrThrow({
        where:{
            email: payload.email
        }
    })


    // check if the password is correct
    const isPasswordCorrect = await bcrypt.compare(payload.password, user.password);
    if(!isPasswordCorrect){
        throw new Error("Incorrect password");
    };



    // create jwt Access token 
    const jwtPayload = {
        id: user.id,
        email: user.email
    };
    const accessToken = jwt.sign(jwtPayload, )


    return {
        message : "User logged in successfully"
    }
    


};


export const AuthServices = {
    loginUser
};