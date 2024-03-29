import catchAsync from "../../../utils/catchAsync";
import { UserServices } from "./user.service";



// create user 
const registerUser = catchAsync(
    async(req,res)=>{
        const payload = req.body;
        const result = UserServices.registerUser(payload);

        
    }
)