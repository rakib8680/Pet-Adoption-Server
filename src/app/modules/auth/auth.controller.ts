
import httpStatus from "http-status";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { AuthServices } from "./auth.service";
import { Request } from "express";





// login user
const loginUser = catchAsync(async (req, res) => {
    const payload = req.body;
    const result = await AuthServices.loginUser(payload);
  
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User logged in successfully",
      data: {
        token: result.accessToken,
      }
    });
  });


  // change password 
  const changePassword = catchAsync(async(req:Request &{user?:any},res)=>{
    const user = req.user;
    const payload = req.body;


    const result = await AuthServices.changePassword(user,payload);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Password changed successfully",
      data: result,
    });
  })



  export const AuthControllers = {
    loginUser,
    changePassword
  }