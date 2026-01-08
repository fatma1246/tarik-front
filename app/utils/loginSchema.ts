import * as Yup from 'yup';
export const loginSchema=Yup.object({
    email:Yup.string().email("Pleaze type valid email!").required("Email is required for login"),
    password:Yup.string().required("Password is required for login")
})