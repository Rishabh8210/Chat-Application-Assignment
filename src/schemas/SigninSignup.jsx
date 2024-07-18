import * as Yup from "yup";

export const signUpSchema = Yup.object({
  name: Yup.string().min(2).max(25).required("Please enter your name"),
  email: Yup.string().email().required("Please enter your email"),
  phone: Yup.string().required("Please enter your phone number"),
  password: Yup.string().min(6).required("Please enter your password"),
  role: Yup.string().required("Please choose role")
});
