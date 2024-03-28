import express, { Application, Request, Response } from "express";
import cors from "cors";

const app: Application = express();

// middlewares
app.use(cors());

// application routes
app.get("/", (req: Request, res: Response) => {
  res.send({
    message: "Pet Adoption 🐾",
  });
});

export default app;
