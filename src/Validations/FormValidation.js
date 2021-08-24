// import everything from yup library
import * as yup from "yup";

// define an object that represent our form
export const formSchema = yup.object().shape({
  fullName: yup.string().required(), // check if nill, expecting string
  email: yup.string().email().required(), // check if email and not nill
  description: yup.string().min(20).required(), // check if not nill and min 20 chars
});
