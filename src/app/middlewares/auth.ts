import { Request } from "express";
import config from "../../config";
import catchAsync from "../../utils/catchAsync"
import { Secret } from "jsonwebtoken"
import AppError from "../errors/AppError";
import httpStatus from "http-status";
import { verifyToken } from "../../utils/jwtHelpers";



 const auth  = (...roles:string[])=>{
     
    return catchAsync(async(req :  Request & {user?:any},res,next)=>{

        // get the token from client
        const token = req.headers.authorization;
        if(!token) throw new AppError(httpStatus.UNAUTHORIZED,"Unauthorized Access");


        // verify the token
        const decodedData = verifyToken(token, config.jwtAccessSecret as Secret);
        if(!decodedData) throw new AppError(httpStatus.UNAUTHORIZED,"Unauthorized Access");


        // check if the user role is allowed to access the route
        if(roles.length && !roles.includes(decodedData.role)){
            throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized");
        }


        // set the user data to request object
        req.user = decodedData;


        next();


    })
 };


 export default auth;