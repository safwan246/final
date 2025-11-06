import React from 'react'
import { LiaMarkdown } from 'react-icons/lia';
import { MdOutlineHome } from "react-icons/md";
import { MdAddCircle } from "react-icons/md";
import { FaCartShopping } from "react-icons/fa6";
import { HiOutlineClipboardList } from "react-icons/hi";
import { FaRegUserCircle } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import useLogout from '../hooks/useLogout';

const AdminDashboard = () => {

    const {logout} = useLogout()
  const navigate = useNavigate()
    return (
        <div className='h-screen w-full'>
            <div className="w-full h-15 bg-[#02473b] flex items-center justify-between fixed">
                <h3 className="text-white font-sans font-semibold text-2xl pl-7 ">Woodspire</h3>
                <button 
                  onClick={logout}
                  
                 className='w-20 h-9 rounded-xl text-md text-white bg-emerald-700 hover:bg-emerald-600 shadow-xl hover:scale-105 duration-300'>
                        LogOut
                    </button>
            </div>

            <div className='flex'>

                <div className='w-70 h-screen bg-[#02473b] flex justify-center items-center '>
                    <div className='w-60 h-110 bg-[#035a4b] opacity-90 gap-5 flex flex-col items-center text-center justify-center rounded-r-xl border-2 border-[#004e08] shadow-gray-900 shadow-2xl'>

                        {/* <button className='text-white font-medium text-md bg-[#012c25] rounded-xl w-50 h-10 border-[#0fd723] border-2 text-center hover:cursor-pointer hover:scale-105 duration-500 hover:bg-[#00ff1a]' > Dashboard</button> */}



                        <button onClick={()=>navigate('/admin/category')}  className='text-white font-medium text-md bg-[#012c25] border-[#0fd723] border-2 rounded-xl w-50 h-10 hover:cursor-pointer hover:scale-105 duration-500 hover:bg-[#00ff1a]'>manage category</button>
                        <button onClick={()=>navigate('/admin/products')} className='text-white font-medium text-md bg-[#012c25] border-[#0fd723] border-2 rounded-xl w-50 h-10 hover:cursor-pointer hover:scale-105 duration-500 hover:bg-[#00ff1a]'>manage product</button>
                        <button onClick={()=>navigate('/admin/users')}   className='text-white font-medium text-md bg-[#012c25] border-[#0fd723] border-2 rounded-xl w-50 h-10 hover:cursor-pointer hover:scale-105 duration-500 hover:bg-[#00ff1a]'>manage User</button>
                        <button onClick={()=>navigate('/admin/orders')}className='text-white font-medium text-md bg-[#012c25] border-[#0fd723] border-2 rounded-xl w-50 h-10 hover:cursor-pointer hover:scale-105 duration-500 hover:bg-[#00ff1a]'>manage Order</button>
                    </div>


                </div>


                <div className='mt-15 p-10  '>



                    <h1 className='text-2xl font-semibold font-mono pl-10 '>Admin Dashboard   </h1>

                    <div className='flex gap-15'>

                        <div onClick={()=>navigate('/createCategory')} className='w-100 h-55  rounded-xl mt-15 border-2 border-[#e0e5e1] shadow-gray-700 shadow-2xl hover:transform hover:scale-105 duration-500 '>
                            <MdAddCircle size={50} className='text-[#0fbe2f] ' />
                            <p className='text-3xl font-semibold pl-10'>  Create Catogory</p>
                            <p className='pl-10 p-3 text-[#0fbe2f]'>Quickly add new product group.</p>

                            <button className='pl-10 text-[#012c25] p-5 font-semibold hover:cursor-pointer hover:transform hover:scale-105 duration-500'>Start Now</button>

                        </div>
                        <div onClick={()=>navigate('/admin/addproducts')} className='w-100 h-55  rounded-xl mt-15 border-2 border-[#e0e5e1] shadow-gray-700 shadow-2xl hover:transform hover:scale-105 duration-500'>
                            <FaCartShopping  size={45} className='text-cyan-400 p-1' />
                            <p className='text-3xl font-semibold pl-10'> Add product</p>
                            <p className='pl-10 p-3 text-cyan-400'>List new item for sale.</p>

                            <button className='pl-10 text-[#012c25] p-5 font-semibold hover:cursor-pointer hover:transform hover:scale-105 duration-500'>Add New Product</button>

                        </div>
                        
                    </div>

                    <div className='flex gap-15'>
                        <div className='w-100 h-55  rounded-xl mt-15 border-2 border-[#e0e5e1] shadow-gray-700 shadow-2xl hover:transform hover:scale-105 duration-500'>
                            <HiOutlineClipboardList  size={50} className='text-amber-600  ' />
                            <p className='text-3xl font-semibold pl-10'>Orders</p>
                            <p className='text-2xl text-amber-600 font-bold pl-10'>210 <br />Total orders</p>
                            

                            <button className='pl-10 text-[#012c25] p-5 font-semibold hover:cursor-pointer hover:transform hover:scale-105 duration-500'>View All Orders</button>

                        </div>

                         <div onClick={()=>navigate('/admin/users')} className='w-100 h-55  rounded-xl mt-15 border-2 border-[#e0e5e1] shadow-gray-700 shadow-2xl hover:transform hover:scale-105 duration-500'>
                            <FaRegUserCircle size={45} className='text-indigo-600 p-1 ' />
                            <p className='text-3xl font-semibold pl-10'>Users</p>
                            <p className='text-2xl text-indigo-600 font-bold pl-10'> 100 <br />Registed Users</p>
                           

                            <button className='pl-10 text-[#012c25] p-5 font-semibold hover:cursor-pointer hover:transform hover:scale-105 duration-500 '>Manage Users</button>

                        </div>
                    </div>



                </div>
            </div>




        </div>

    )
}

export default AdminDashboard