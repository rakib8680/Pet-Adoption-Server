import express from "express";
import { AdoptionControllers } from "./adoption.controller";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import {
  submitAdoptionValidationSchema,
  updateAdoptionStatusValidationSchema,
} from "./adoption.validation";


const router = express.Router();


router.post(
  "/adoption-request",
  auth(),
  validateRequest(submitAdoptionValidationSchema),
  AdoptionControllers.submitAdoptionRequest
);

router.get("/adoption-requests", auth(), AdoptionControllers.getAllRequests);

router.put(
  "/adoption-requests/:requestId",
  auth(),
  validateRequest(updateAdoptionStatusValidationSchema),
  AdoptionControllers.updateAdoptionStatus
);


export const AdoptionRoutes = router;
