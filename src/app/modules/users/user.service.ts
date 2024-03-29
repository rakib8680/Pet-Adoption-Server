import prisma from "../../../utils/prisma";
import {TUserPayload } from "./user.interfaces";
import bcrypt from "bcrypt";



// create user
const registerUser = async (payload: TUserPayload) => {

  // hash the password
  const hashedPassword = await bcrypt.hash(payload.password, 12);

  const userPayload = {
    ...payload,
    password: hashedPassword,
  };

  const result = await prisma.user.create({
    data: userPayload,
  });

  // remove the password from the result
  const { password, ...userData } = result;

  return userData;
};


export const UserServices = {
  registerUser,
};
