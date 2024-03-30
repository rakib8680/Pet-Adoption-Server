import httpStatus from "http-status";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { PetServices } from "./pet.service";




// add a pet 
const addPet = catchAsync(async (req, res) => {
    const payload = req.body;
    const result = await  PetServices.addPet(payload);
  
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Pet added successfully",
      data: result,
    });
  });



  export const PetControllers = {
    addPet
  }
  