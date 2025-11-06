
import *as Yup from 'yup'
// const passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
export const LoginSchema = Yup.object().shape({
    
    email: Yup.string().email("please enter your email").required('please enter your email.'),
    password: Yup.string().required("please enter your password")
})

export const SignupSchema = Yup.object().shape({
   username: Yup.string().min(3).required('please enter your name.'),
   email: Yup.string().email("please enter your email").required('please enter your email.'),
   password: Yup.string().required("please enter your password"),
   confirmPassword: Yup.string().required("enter the same password")
})
