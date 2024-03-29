import config from "../../../config";
import prisma from "../../../utils/prisma";
import { TLoginPayload } from "../users/user.interfaces";
import bcrypt from "bcrypt";
import jwt, { Secret } from "jsonwebtoken";

// login user
const loginUser = async (payload: TLoginPayload) => {


  // check if the user exists
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
    },
  });



  // check if the password is correct
  const isPasswordCorrect = await bcrypt.compare(
    payload.password,
    user.password
  );
  if (!isPasswordCorrect) {
    throw new Error("Incorrect password");
  }



  // create jwt Access token
  const jwtPayload = {
    id: user.id,
    email: user.email,
  };
  const accessToken = jwt.sign(jwtPayload, config.jwtAccessSecret as Secret, {
    expiresIn: config.jwtAccessExpire,
  });



//remove password from the user object
const {password,createdAt, updatedAt ,...userData} = user;




  return {
    userData,
    accessToken,
  };
};

export const AuthServices = {
  loginUser,
};
