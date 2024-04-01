import express from "express";
import { PetControllers } from "./pet.controller";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { petValidations } from "./pet.validation";

const router = express.Router();

// routes
router.post(
  "/pets",
  auth(),
  validateRequest(petValidations.createPetValidationSchema),
  PetControllers.addPet
);

router.get("/pets", PetControllers.getAllPets);

router.put("/pets/:petId", auth(), PetControllers.updatePet);

export const PetRoutes = router;
