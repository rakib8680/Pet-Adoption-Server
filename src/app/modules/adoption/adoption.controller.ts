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
      statusCode: httpStatus.OK,
      message: "Adoption request submitted successfully",
      data: result,
    });
  }
);

export const AdoptionControllers = {
  submitAdoptionRequest,
};
