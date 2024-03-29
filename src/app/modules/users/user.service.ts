import prisma from "../../../utils/prisma";
import { TUserPayload } from "./user.interfaces";



// create user
const registerUser = async (payload: TUserPayload) => {
  const result = await prisma.user.create({
    data: payload,
  });

  // remove the password from the result
  const { password, ...userData } = result;

  return userData;
};

export const UserServices = {
  registerUser,
};
