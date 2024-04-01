import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { JsonWebTokenError } from "jsonwebtoken";
import { ZodError } from "zod";
import handleZodError from "../errors/handleZodError";

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {

  let message = err.message || "Something went wrong!";
  let errorDetails = err;

  // console.log(err);


  // check which error is thrown and customize the message
  if (err instanceof JsonWebTokenError) {
    message = "Unauthorized Access";
  } else if (err instanceof ZodError) {
    const customizedError = handleZodError(err);
    message = customizedError.message;
    errorDetails = { issues: customizedError.issues };
  }


//   final response 
  res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: message,
    errorDetails: errorDetails,
  });

};

export default globalErrorHandler;
