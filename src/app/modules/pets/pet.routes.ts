
import express from 'express';
import { PetControllers } from './pet.controller';
import auth from '../../middlewares/auth';


const router = express.Router();


router.post('/pets',auth(), PetControllers.addPet);




export const PetRoutes = router;