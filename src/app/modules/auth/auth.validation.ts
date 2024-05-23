import { z } from "zod";




const loginValidationSchema = z.object({
    email:z.string({required_error:"Email is required"}).email({message:"Email must be a valid email address."}),
    password:z.string({required_error:"Password is required"})
});


const changePasswordValidationSchema = z.object({
    oldPassword:z.string({required_error:"Old password is required"}),
    newPassword:z.string({required_error:"New password is required"}).min(4,{message:"Password must be at least 4 characters long"})
})



export const authValidations = {
    loginValidationSchema,
    changePasswordValidationSchema
}