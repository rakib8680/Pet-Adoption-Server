import httpStatus from "http-status";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { UserServices } from "./user.service";

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


export const UserControllers = {
  registerUser,

};
