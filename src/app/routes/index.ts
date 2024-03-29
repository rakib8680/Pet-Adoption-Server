import { UserRoutes } from "../modules/users/user.routes";
import express from "express";

const router = express.Router();

const applicationRoutes = [
  {
    path: "/",
    route: UserRoutes,
  },
];

applicationRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
