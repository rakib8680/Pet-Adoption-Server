import express from "express";
import { PetControllers } from "./pet.controller";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { petValidations } from "./pet.validation";
import { USER_ROLE } from "@prisma/client";

const router = express.Router();

// routes
router.post(
  "/pets",
  auth(USER_ROLE.ADMIN),
  validateRequest(petValidations.createPetValidationSchema),
  PetControllers.addPet
);

router.get("/pets", PetControllers.getAllPets);

router.get("/pets/:petId",auth(USER_ROLE.USER, USER_ROLE.ADMIN),PetControllers.getSinglePet)

router.delete("/pets/:petId", auth(USER_ROLE.ADMIN), PetControllers.deletePet);

router.put(
  "/pets/:petId",
  auth(USER_ROLE.ADMIN),
  validateRequest(petValidations.updatePetValidationSchema),
  PetControllers.updatePet
);

export const PetRoutes = router;
