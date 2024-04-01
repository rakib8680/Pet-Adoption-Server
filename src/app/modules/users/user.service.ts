import { Jwt, JwtPayload } from "jsonwebtoken";
import prisma from "../../../utils/prisma";
import { TUserPayload } from "./user.interfaces";
import bcrypt from "bcrypt";
import { User } from "@prisma/client";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";



// create user
const registerUser = async (payload: TUserPayload) => {

  // check if the user already exists
  const userExists = await prisma.user.findFirst({
    where: {
      email: payload.email,
    },
  });

  if (userExists) {
    throw new AppError(httpStatus.BAD_REQUEST, "User already exists");
  }


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

// get a single user
const getSingleUser = async (payload: JwtPayload) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      id: payload.id,
    },
  });

  // remove the password from the result
  const { password, ...result } = userData;

  return result;
};


// update user information
const updateUser = async (payload: JwtPayload, data: Partial<User>) => {
  const updatedUser = await prisma.user.update({
    where: {
      id: payload.id,
    },
    data,
  });

  // remove the password from the result
  const { password, ...result } = updatedUser;

  return result;
};



export const UserServices = {
  registerUser,
  getSingleUser,
  updateUser,
};
