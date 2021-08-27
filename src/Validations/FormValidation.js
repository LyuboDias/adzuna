// import everything from yup library
import * as yup from "yup";

// define an object that represent our form
export const formSchema = yup.object().shape({
  fullName: yup
    .string()
    .required()
    .matches(/^[A-Za-z ]*$/, "Please enter valid name"), // check if nill, allows only A-Z chars
  email: yup.string().email().required(), // check if email and not nill
  description: yup
    .string()
    .min(20)
    .required()
    .matches("^[A-Za-zÀ-ȕ0-9(),-_.+=-`~!£$%&, ]*$", "Non valid character used"), // check if not nill, min 20 chars and emojis not allowed, still few spec chars not allowed
});
