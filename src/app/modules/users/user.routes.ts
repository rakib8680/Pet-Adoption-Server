import express from "express";
import { UserControllers } from "./user.controller";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { userValidations } from "./user.validation";
import { USER_ROLE } from "@prisma/client";

const router = express.Router();

router.post(
  "/register",
  validateRequest(userValidations.createUserValidationSchema),
  UserControllers.registerUser
);


router.get("/users", auth(USER_ROLE.ADMIN), UserControllers.getAllUsers);

router.get(
  "/profile",
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  UserControllers.getMyProfile
);

router.patch(
  "/profile/update",
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  validateRequest(userValidations.updateUserValidationSchema),
  UserControllers.updateMyProfile
);

router.get("/user/:id", auth(USER_ROLE.ADMIN), UserControllers.getSingleUser);

router.patch(
  "/user/:id",
  auth(USER_ROLE.ADMIN),
  validateRequest(userValidations.updateUserValidationSchema),
  UserControllers.updateUser
);

export const UserRoutes = router;
