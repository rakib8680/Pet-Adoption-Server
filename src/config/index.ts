import path from "path";
import dotenv from "dotenv";




dotenv.config({ path: path.join(process.cwd(), ".env") });


export default {
    port: process.env.PORT,
    jwtAccessSecret: process.env.JWT_ACCESS_SECRET,
    jwtAccessExpire: process.env.JWT_ACCESS_EXPIRE,
}