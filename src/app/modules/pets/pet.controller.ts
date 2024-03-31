import httpStatus from "http-status";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { PetServices } from "./pet.service";
import pick from "../../../utils/pick";
import { petFilterableFields } from "./pet.constants";




// add a pet
const addPet = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await PetServices.addPet(payload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Pet added successfully",
    data: result,
  });
});



// get all pets
const getAllPets = catchAsync(async (req, res) => {
  const filters = pick(req.query, petFilterableFields);
  const options = pick(req.query, ["sortBy", "limit", "page", "sortOrder"])

  const result = await PetServices.getAllPets(filters, options);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Pets retrieved successfully",
    meta:result.meta,
    data: result.data,
  });
});



// update pet 
const updatePet = catchAsync(async (req, res) => {

  const id = req.params.petId;
  const payload = req.body;

  const result = await PetServices.updatePet(id, payload);

  
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Pet profile updated successfully",
    data: result,
  });

});



export const PetControllers = {
  addPet,
  getAllPets,
  updatePet
};
