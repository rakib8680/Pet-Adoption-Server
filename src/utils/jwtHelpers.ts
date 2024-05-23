import { Secret } from "jsonwebtoken";
import jwt, { JwtPayload } from "jsonwebtoken";




// verify token 
export const verifyToken = (token:string, secret: Secret)=>{
    return jwt.verify(token, secret) as JwtPayload;
}