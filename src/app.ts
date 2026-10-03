import buffer from "buffer";
if (!(buffer as any).SlowBuffer) {
  (buffer as any).SlowBuffer = buffer.Buffer;
}

import express, { Application, Request, Response } from "express";
import cors from "cors";
import router from "./app/routes";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";

const app: Application = express();

// middlewares and parsers
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:5173",
      "https://pet-adoption-alpha.vercel.app",
      /https:\/\/.*\.vercel\.app$/,
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
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

// api not found handler
app.use(notFound);

export default app;
