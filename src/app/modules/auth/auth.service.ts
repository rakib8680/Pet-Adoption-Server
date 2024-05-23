import { UserStatus } from "@prisma/client";
import config from "../../../config";
import prisma from "../../../utils/prisma";
import { TLoginPayload } from "../users/user.interfaces";
import bcrypt from "bcrypt";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";




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
    role: user.role,
  };


  const accessToken = jwt.sign(jwtPayload, config.jwtAccessSecret as Secret, {
    expiresIn: config.jwtAccessExpire,
  });



  return {
    accessToken,
  };
};






// change password
const changePassword = async (
  user: JwtPayload,
  payload: { oldPassword: string; newPassword: string }
) => {


  // check if the user exists
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      id: user.id,
      status: UserStatus.ACTIVE,
    },
  });


  // check if the old password is correct
  const isPasswordCorrect = await bcrypt.compare(
    payload.oldPassword,
    userData.password
  );
  if (!isPasswordCorrect) {
    throw new AppError(httpStatus.NOT_ACCEPTABLE, "Incorrect password");
  }



  // check if the new password is same as the old password
  if (payload.oldPassword === payload.newPassword) {
    throw new AppError(
      httpStatus.NOT_ACCEPTABLE,
      "New password can not be same as old password"
    );
  }


  // hash the new password
  const newHashedPassword = await bcrypt.hash(payload.newPassword, 12);


  // update the password
  await prisma.user.update({
    where:{
      id: userData.id
    },
    data:{
      password:newHashedPassword
    }
  });


  return {
    message: "Password changed successfully",
  }


};




export const AuthServices = {
  loginUser,
  changePassword,
};
