
import express from "express";
import { UserControllers } from "./user.controller";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { userValidations } from "./user.validation";


const router = express.Router();


router.post("/register",validateRequest(userValidations.createUserValidationSchema), UserControllers.registerUser);

router.get('/profile',auth(), UserControllers.getSingleUser);

router.put('/profile', auth(), UserControllers.updateUser)


export const UserRoutes = router;