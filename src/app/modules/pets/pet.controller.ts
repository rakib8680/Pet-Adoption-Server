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

  const result = await PetServices.getAllPets(filters);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Pets retrieved successfully",
    data: result,
  });
});

export const PetControllers = {
  addPet,
  getAllPets,
};
