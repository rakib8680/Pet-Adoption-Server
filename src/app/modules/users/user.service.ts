import { JwtPayload } from "jsonwebtoken";
import prisma from "../../../utils/prisma";
import { TUserPayload } from "./user.interfaces";
import bcrypt from "bcrypt";
import { Prisma, User, UserStatus } from "@prisma/client";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { calculatePagination } from "../../../utils/calculatePagination";
import { userSearchableFields } from "./user.constants";



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




// get all users 
const getAllUsers = async (params:any, options:any) =>{

  const { page, limit, skip, sortBy, sortOrder} = calculatePagination(options)
  const { searchTerm, age, ...filterableData } = params;
  // convert age to integer if it exists in filterableData
  if(filterableData.hasOwnProperty("age")){
    filterableData["age"] = parseInt(filterableData["age"]);
  };


  const andConditions:Prisma.UserWhereInput[] = [];


  // searching 
  if(params.searchTerm){
    andConditions.push({
      OR:userSearchableFields.map(field=>({
        [field]:{
          contains:params.searchTerm,
          mode:"insensitive"
        }
      }))
    })
  };



  // solid filtering
  if(age){
    andConditions.push({
      age:{
        equals:parseInt(age)
      }
    })
  };

  if(Object.keys(filterableData).length>0){
    andConditions.push({
      AND: Object.keys(filterableData).map(field =>({
        [field]:{
          equals:filterableData[field]
        }
      }))
    })
  };


  const whereConditions:Prisma.UserWhereInput = andConditions.length> 0 ? {AND: andConditions}: {};


  // final result 
  const result = await prisma.user.findMany({
    where:whereConditions,
    skip,
    take:limit,
    orderBy:{
      [sortBy]: sortOrder
    }
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

}




// get a single user
const getSingleUser = async (id:string)=>{
  const user = await prisma.user.findUniqueOrThrow({
    where:{id}
  });


  return user;
};


// update a user 
const updateUser = async(id:string, data:Partial<User>) =>{

  // check if the user exists
  await prisma.user.findUniqueOrThrow({
    where:{id}})
  
    const updatedUser = await prisma.user.update({
      where:{id},
      data
    });


    return updatedUser;

}



// get my profile 
const getMyProfile = async (user: JwtPayload) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      id: user.id,
      status: UserStatus.ACTIVE
    },
  });

  // remove the password from the result
  const { password, ...result } = userData;

  return result;
};


// update my profile
const updateMyProfile = async (payload: JwtPayload, data: Partial<User>) => {
  const updatedUser = await prisma.user.update({
    where: {
      id: payload.id,
      status: UserStatus.ACTIVE
    },
    data,
  });

  // remove the password from the result
  const { password, ...result } = updatedUser;

  return result;
};



export const UserServices = {
  registerUser,
  getMyProfile,
  updateMyProfile,
  getSingleUser,
  updateUser,
  getAllUsers
};
