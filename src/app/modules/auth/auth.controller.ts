
import httpStatus from "http-status";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { AuthServices } from "./auth.service";





// login user
const loginUser = catchAsync(async (req, res) => {
    const payload = req.body;
    const result = await AuthServices.loginUser(payload);
  
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "User logged in successfully",
      data: result,
    });
  });



  export const AuthControllers = {
    loginUser,
  }