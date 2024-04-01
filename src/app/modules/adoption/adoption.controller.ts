import { Request } from "express";
import catchAsync from "../../../utils/catchAsync";
import { AdoptionServices } from "./adoption.service";
import sendResponse from "../../../utils/sendResponse";
import httpStatus from "http-status";


// submit an adoption request
const submitAdoptionRequest = catchAsync(
  async (req: Request & { user?: any }, res) => {
    const payload = req.body;
    const user = req.user;

    const result = await AdoptionServices.submitAdoptionRequest(payload, user);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Adoption request submitted successfully",
      data: result,
    });
  }
);



// get all requests 
const getAllRequests = catchAsync(async (req, res) => {

    const result = await AdoptionServices.getAllRequests();

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Adoption requests retrieved successfully",
      data: result,
    });
  }
);

export const AdoptionControllers = {
  submitAdoptionRequest,
    getAllRequests
};
