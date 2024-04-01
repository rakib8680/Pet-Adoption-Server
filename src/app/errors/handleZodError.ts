import { ZodError } from "zod";

const handleZodError = (err: ZodError) => {


  const issues = err.issues.map((issue) => {
    return {
      field: issue?.path[issue.path.length - 1],
      message: issue.message,
    };
  });

  const responseMessage = issues.map((issue) => issue.message).join(". ");

  return {
    message: responseMessage,
    issues,
  };
  
};

export default handleZodError;
