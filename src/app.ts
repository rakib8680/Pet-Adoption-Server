import express, { Application, Request, Response } from "express";
import cors from "cors";
import { UserRoutes } from "./app/modules/users/user.routes";
import router from "./app/routes";

const app: Application = express();



// middlewares
app.use(cors());



// application routes
app.use("/api", router);

app.get("/", (req: Request, res: Response) => {
  res.send({
    message: "Pet Adoption 🐾",
  });
});



export default app;
