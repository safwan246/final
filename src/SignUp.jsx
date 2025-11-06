import React from "react"
import { Formik, useFormik } from "formik"
import { SignupSchema } from "./schema"
import api from './services/axios'
import { useNavigate } from "react-router-dom"

const initialValues = ({

    username : '',
    email : '',
    password: '',
    confirmPassword: '',
})

function SignUp(){

    const navigate = useNavigate()

    const {values ,handleBlur,handleChange,handleSubmit , errors} = useFormik({
        initialValues,
        validationSchema: SignupSchema,
        onSubmit: (values)=>{
            console.log(values);
            api.post('/signup',values)
            .then((res)=>{
                console.log(res);
                if(res.data === 'successful'){
                  navigate("/")
                }
            })
        }

    })

    return(
<div>
  <div className="min-h-screen flex items-center justify-center from-green-50 to-green-100">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
                <h1 className="text-3xl font-semibold text-gray-800 mb-2">Sign Up</h1>
                <p className="text-sm text-gray-500 mb-6">Enter your details to continue</p>

                <form className="space-y-4 " onSubmit={handleSubmit}>

                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                        <input
                            type="text" value={values?.username} onBlur={handleBlur} onChange={handleChange}
                            id="username"

                            placeholder="Enter username"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-green-400 focus:outline-none"

                        />
                        {/* {errors.username   } */}
                        <p className='text-red-700'>{errors.username}</p>
                    </div>


                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            type="email" value={values?.email} onBlur={handleBlur} onChange={handleChange}
                            id="email"
                            name="email"
                            placeholder="enter your email"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-green-400 focus:outline-none"

                        />
                        <p className='text-red-700'>{errors.email}</p>

                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input
                            type="password" value={values?.password} onBlur={handleBlur} onChange={handleChange}
                            id="password"
                            name="password"
                            placeholder="Enter password"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-green-400 focus:outline-none"

                        />
                        <p className='text-red-700'>{errors.password}</p>

                    </div>
                              <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                        <input
                            type="password" value={values?.confirmPassword} onBlur={handleBlur} onChange={handleChange}
                            name="confirmPassword"
                            placeholder="confirm Password"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-green-400 focus:outline-none"

                        />
                        <p className='text-red-700'>{errors.confirmPassword}</p>

                    </div>


                    <button
                        type="submit"
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-md transition-colors mt-5 hover:cursor-pointer"
                    >
                    Submit
                    </button>
                </form>

             
            
            </div>
        </div>


</div>
    )
}
export default SignUp