import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { JsonWebTokenError } from "jsonwebtoken";


const globalErrorHandler = (err:any, req:Request, res:Response, next:NextFunction)=>{

    let message =err.message ||  'Something went wrong!'  ;

    // console.log(err);


    // check which error is thrown 
    if (err instanceof JsonWebTokenError){
        message = "Unauthorized Access"
    }
    


    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        success:false,
        message: message ,
        errorDetails : err
    })
};


export default globalErrorHandler;