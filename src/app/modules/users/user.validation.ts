import { z } from "zod";



const createUserValidationSchema = z.object({
    name:z.string({required_error:"Name is required"}),
    email:z.string({required_error:"Email is required"}).email({message:"Email must be a valid email address."}),
    password:z.string({required_error:"Password is required"}).min(4, {message:"Password must be at least 6 characters long"}),
});




export const userValidations = {
    createUserValidationSchema
}