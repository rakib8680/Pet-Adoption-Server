import express from "express";
import { AuthControllers } from "./auth.controller";
import validateRequest from "../../middlewares/validateRequest";
import { userValidations } from "../users/user.validation";

const router = express.Router();

router.post(
  "/login",
  validateRequest(userValidations.loginValidationSchema),
  AuthControllers.loginUser
);

export const AuthRoutes = router;
