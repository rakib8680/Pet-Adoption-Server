import httpStatus from "http-status";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { UserServices } from "./user.service";
import { Request } from "express";

// create user
const registerUser = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await UserServices.registerUser(payload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "User registered successfully",
    data: result,
  });
});



// get a single user 
const getSingleUser = catchAsync(async (req :  Request & {user?:any}, res) => {
 
  const user = req.user;
  const result = await UserServices.getSingleUser(user);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User profile retrieved successfully",
    data: result,
  });
});




// update user 
const updateUser = catchAsync(async (req :  Request & {user?:any}, res) => {
 
  const user = req.user;
  const data = req.body;
  const result = await UserServices.updateUser(user, data);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User profile updated successfully",
    data: result,
  });
});




export const UserControllers = {
  registerUser,
  getSingleUser,
  updateUser

};
