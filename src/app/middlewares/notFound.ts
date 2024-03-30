import { RequestHandler } from "express";
import httpStatus from "http-status";

const notFound: RequestHandler = (req, res, next) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "API not found!",
    errorDetails: {
      path: req.originalUrl,
      message: "Requested API not found!",
    },
  });
};

export default notFound;
