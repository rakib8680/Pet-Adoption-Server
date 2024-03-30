import express, { Application, Request, Response } from "express";
import cors from "cors";
import router from "./app/routes";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";

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



// global error handler
app.use(globalErrorHandler);



export default app;
