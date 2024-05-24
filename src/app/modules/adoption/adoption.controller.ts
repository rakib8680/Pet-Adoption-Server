import { Request } from "express";
import catchAsync from "../../../utils/catchAsync";
import { AdoptionServices } from "./adoption.service";
import sendResponse from "../../../utils/sendResponse";
import httpStatus from "http-status";
import { AdoptionRequestStatus } from "@prisma/client";



// submit an adoption request
const submitAdoptionRequest = catchAsync(
  async (req: Request & { user?: any }, res) => {
    const payload = req.body;
    const user = req.user;

    console.log(payload);

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
});


// get my adopted pet requests
const getMyAdoptedPetRequests = catchAsync(async (req: Request & {user?:any}, res) => {

  const user = req.user;
  const status = req.query.status;

  const result = await AdoptionServices.getMyAdoptedPetRequests(user, status as AdoptionRequestStatus);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "My adopted pet requests retrieved successfully",
    data: result,
  });

})


// update adoption request status
const updateAdoptionStatus = catchAsync(async (req, res) => {
  const id = req.params.requestId;
  const status = req.body.status;

  const result = await AdoptionServices.updateAdoptionStatus(status, id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Adoption request updated successfully",
    data: result,
  });
});


// delete my adoption request
const deleteMyAdoptionRequest = catchAsync(async (req: Request & { user?: any }, res) => {

  const user = req.user;
  const id = req.params.requestId;

  const result = await AdoptionServices.deleteMyAdoptionRequest(user, id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Adoption request deleted successfully",
    data: result,
})

})


export const AdoptionControllers = {
  submitAdoptionRequest,
  getAllRequests,
  updateAdoptionStatus,
  getMyAdoptedPetRequests,
  deleteMyAdoptionRequest
};
