import React, { useEffect, useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import api from '../services/axios';


const UserTable = () => {

    const [users,Setusers] = useState([])
    
    const navigate = useNavigate() 

       const handleEnable = async(id,status)=>{
           try{
            
               const response = await api.put(`/admin/users/${id}`,{status})

                Setusers((user) =>
        user.map((u) => (u._id === id ? { ...u, status: status } : u))
      );
   }
   catch(err){
    console.log(err);
   }
   }

    const handleAddUsers = async () =>{
      
        try{
            
            const response = await api.get('/admin/users')
            console.log(response);
            Setusers(response.data)
        }catch(err){
            console.log(err);
            
        }
        

    }
    useEffect(()=>{
        handleAddUsers()
    },[])

    
    

    return (
        <div className="p-4 sm:p-8 bg-gray-100 min-h-screen ">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">User Details</h2>
                
                <div className="shadow-lg rounded-lg overflow-x-auto">
                    <table className="min-w-full leading-normal">
                        
                     
                        <thead>
                            <tr className="bg-gray-700 text-white uppercase text-sm leading-normal">
                                
                                <th className="py-3 px-6 text-left">User ID</th>
                                <th className="py-3 px-6 text-left">Username</th>
                                <th className="py-3 px-6 text-left">Email</th>
                                <th className="py-3 px-6 text-center">Role</th>
                                  <th className="py-3 px-6 text-center">Stutus</th>
                                <th className="py-3 px-6 text-center">Action</th>
                              
                            </tr>
                        </thead>
                        
                      
                        <tbody className="text-gray-600 text-sm font-light">
                          

                            {users.length > 0 ? (
                            users.map((use) =>  (
                               
                            


                                <tr
                                    key={use._id}
                                   
                                    className="hover:bg-green-50 transition-colors text-gray-700"
                                >
                                    {/* <td className="p-2 border text-center">{use.}</td> */}
                                    <td className="p-2 border">{use._id}</td>
                                    <td className="p-2 border font-semibold">{use.username}</td>
                                    <td className="p-2 border">{use.email}</td>
                                    <td className="p-2 border">{use.role}</td>
                                     <td className="p-2 border">{use.status}</td>
                                     
                                       
                                        
                                
                                        
                                  
                                    <td className="p-2 border flex gap-2 justify-center">
                                        


                                       { use.status === "inactive"? 



                                    <button className='w-15 h-7 bg-green-700 rounded-xl text-white'
                                    onClick={() => handleEnable(use._id,"active")}   
                                    >
                                    
                                Enable
                                      </button>


                                      :

                                       <button className='w-15 h-7 bg-red-700 rounded-xl text-white'
                                    onClick={() => handleEnable(use._id,"inactive")}
                                    >
                                    
                                Disable
                                      </button>

                                       }
                                  
                                    
            
              



                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center p-4 text-gray-500">
                                    No users found
                                </td>
                            </tr>
                        )}

                        </tbody>
                        
                    </table>
                </div>
            </div>
        </div>
    );
};

export default UserTable;