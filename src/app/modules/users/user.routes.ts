
import express from "express";
import { UserControllers } from "./user.controller";
import auth from "../../middlewares/auth";


const router = express.Router();


router.post("/register", UserControllers.registerUser);

router.get('/profile',auth(), UserControllers.getSingleUser);


export const UserRoutes = router;