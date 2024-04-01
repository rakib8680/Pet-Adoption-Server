import express from "express";
import { AdoptionControllers } from "./adoption.controller";
import auth from "../../middlewares/auth";

const router = express.Router();

router.post(
  "/adoption-request",
  auth(),
  AdoptionControllers.submitAdoptionRequest
);

router.get("/adoption-requests", auth(), AdoptionControllers.getAllRequests);

export const AdoptionRoutes = router;
