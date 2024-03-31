import { Request } from "express";
import config from "../../config";
import catchAsync from "../../utils/catchAsync"
import jwt, { Secret } from "jsonwebtoken"
import AppError from "../errors/AppError";
import httpStatus from "http-status";



 const auth  = ()=>{
     
    return catchAsync(async(req :  Request & {user?:any},res,next)=>{

        // get the token from client
        const token = req.headers.authorization;
        if(!token) throw new AppError(httpStatus.UNAUTHORIZED,"Unauthorized Access");


        // verify the token
        const decodedData = jwt.verify(token, config.jwtAccessSecret as Secret);
        if(!decodedData) throw new AppError(httpStatus.UNAUTHORIZED,"Unauthorized Access");




        // set the user data to request object
        req.user = decodedData;



        next();


    })
 };


 export default auth;