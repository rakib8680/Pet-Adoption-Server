import express from "express";
import { AdoptionControllers } from "./adoption.controller";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import {
  submitAdoptionValidationSchema,
  updateAdoptionStatusValidationSchema,
} from "./adoption.validation";
import { USER_ROLE } from "@prisma/client";


const router = express.Router();


router.post(
  "/adoption-request",
  auth(USER_ROLE.USER),
  validateRequest(submitAdoptionValidationSchema),
  AdoptionControllers.submitAdoptionRequest
);

router.get("/adoption-requests", auth(USER_ROLE.ADMIN), AdoptionControllers.getAllRequests);

router.get('/my-adoption-requests', auth(USER_ROLE.USER), AdoptionControllers.getMyAdoptedPetRequests)

router.put(
  "/adoption-requests/:requestId",
  auth(USER_ROLE.ADMIN),
  validateRequest(updateAdoptionStatusValidationSchema),
  AdoptionControllers.updateAdoptionStatus
);


export const AdoptionRoutes = router;
