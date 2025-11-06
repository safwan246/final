import React, { useEffect, useState } from 'react'
import api from './services/axios'
import { useFormik } from 'formik'
import { LoginSchema } from './schema'
import { useNavigate } from 'react-router-dom'



const initialValues = {
  
    email: '',
    password: ''
}

const Login = () => {

    
    const navigate = useNavigate();

    const [serverError, setServerError] = useState('');

    const { values, handleBlur, handleChange, handleSubmit, errors } = useFormik({

        initialValues,
        validationSchema: LoginSchema,
       

    onSubmit: async (values, { setSubmitting }) => { 
        
        setServerError(''); 
        
        try {
            
            const res = await api.post('/login', values); 
            
            console.log(res);
           
            if (res.status === 200) { 
                console.log('Login Success:', res.data);
                navigate('/'); 
            }
            
        } catch (error) {
            console.error("Login Error:", error.response);

            const errorMessage = error.response?.data?.message || 'Login failed. Please check your credentials and network.';
            setServerError(errorMessage); 
            
        } finally {
            setSubmitting(false); 
        }
    },
});

    


    



    return (

        <div className="min-h-screen flex items-center justify-center from-green-50 to-green-100">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
                <h1 className="text-3xl font-semibold text-gray-800 mb-2">Login</h1>
                <p className="text-sm text-gray-500 mb-6">Enter your details to continue</p>

                {serverError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                <span className="block sm:inline">{serverError}</span>
            </div>
        )}

                <form className="space-y-4 " onSubmit={handleSubmit}>



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
                  
                  

                    <button
                      
                       
                        
                        type="submit"
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-md transition-colors  hover:cursor-pointer"
                    >
                        Login
                    </button>
                </form>

                <p onClick ={()=> navigate('/signup') } className="text-center text-sm text-gray-500 mt-6 hover:text-blue-500 hover:cursor-pointer">
                    Don't have an account?
                    {/* <lonk href="#" className="text-green-600 hover:underline font-medium">Sign up</a> */}
                </p>
            </div>
        </div>


    )
}

export default Login
