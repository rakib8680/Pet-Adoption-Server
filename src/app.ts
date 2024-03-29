import express, { Application, Request, Response } from "express";
import cors from "cors";
import router from "./app/routes";

const app: Application = express();



// middlewares and parsers
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// application routes
app.use("/api", router);

app.get("/", (req: Request, res: Response) => {
  res.send({
    message: "Pet Adoption 🐾",
  });
});



export default app;
