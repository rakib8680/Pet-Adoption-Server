import express from "express";
import { PetControllers } from "./pet.controller";
import auth from "../../middlewares/auth";


const router = express.Router();


// routes 
router.post("/pets", auth(), PetControllers.addPet);

router.get("/pets", PetControllers.getAllPets);

router.put("/pets/:petId", auth(), PetControllers.updatePet);




export const PetRoutes = router;
