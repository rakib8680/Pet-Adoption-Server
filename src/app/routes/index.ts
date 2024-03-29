import { AuthRoutes } from "../modules/auth/auth.routes";
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
];

applicationRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
