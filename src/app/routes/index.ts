import { AuthRoutes } from "../modules/auth/auth.routes";
import { PetRoutes } from "../modules/pets/pet.routes";
import { UserRoutes } from "../modules/users/user.routes";
import express from "express";

const router = express.Router();

const applicationRoutes = [
  {
    path: "",
    route: UserRoutes,
  },
  {
    path: "",
    route: AuthRoutes,
  },
  {
    path: "",
    route: PetRoutes,
  },
];

applicationRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
