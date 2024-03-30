
import express from 'express';
import { PetControllers } from './pet.controller';


const router = express.Router();


router.post('/pets', PetControllers.addPet);




export const PetRoutes = router;