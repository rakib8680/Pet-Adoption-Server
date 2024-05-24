import httpStatus from "http-status";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { UserServices } from "./user.service";
import { Request } from "express";
import pick from "../../../utils/pick";
import { userFilterableFields } from "./user.constants";




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


// get all users
const getAllUsers = catchAsync(async (req, res) => {
  const filters = pick(req.query, userFilterableFields);
  const options = pick(req.query, ["sortBy", "limit", "page", "sortOrder"]);

  const result = await UserServices.getAllUsers(filters, options);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Users retrieved successfully",
    meta: result.meta,
    data: result.data,
  });
});



// get a single user
const getSingleUser = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await UserServices.getSingleUser(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User information retrieved successfully",
    data: result,
  });
});



// update a user
const updateUser = catchAsync(async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const result = await UserServices.updateUser(id, data);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User information updated successfully",
    data: result,
  });
});



// get my profile
const getMyProfile = catchAsync(async (req: Request & { user?: any }, res) => {
  const user = req.user;
  const result = await UserServices.getMyProfile(user);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User profile retrieved successfully",
    data: result,
  });
});



// update my profile
const updateMyProfile = catchAsync(
  async (req: Request & { user?: any }, res) => {
    const user = req.user;
    const data = req.body;
    const result = await UserServices.updateMyProfile(user, data);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Profile updated successfully",
      data: result,
    });
  }
);




export const UserControllers = {
  registerUser,
  getMyProfile,
  updateMyProfile,
  getSingleUser,
  updateUser,
  getAllUsers,
};
