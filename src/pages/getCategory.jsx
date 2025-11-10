import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/axios'; 


const CATEGORY_API_ENDPOINT = '/admin/categories';

function AddCategory() {
    
    const [categories, setCategories] = useState(null); 
    const [render, setRender] = useState(false);
    const navigate = useNavigate();

   
    const fetchCategories = async () => {
        try {
            const response = await api.get(CATEGORY_API_ENDPOINT);
            console.log(response);
            
            setCategories(response.data); 
        } catch (error) {
            console.error("Error fetching categories:", error);
            setCategories([]);
        }
       
    };

   
    const handleDelete = async (id) => {
        console.log(id);
        
            
        try {
            const dlt = await api.delete(`/admin/categories/${id}`); 
            console.log(dlt);
            
        

            alert(`Category deleted.`);
            fetchCategories()

        } catch (error) {
            console.error("Error deleting category:", error);
            alert(`Failed to delete .`);
        }
    };


    const handleEdit = (id) => {
        navigate(`/admin/EditCategory/${id}`);
    };

   
    useEffect(() => {
        fetchCategories();
    }, [render]); 

    
  
    const CategoryCard = ({ id, name, image }) => {
        const imageUrl = `http://51.21.221.33/api/uploads/${image}`;

    

        return (
            <div className='w-80 h-60 bg-white rounded-2xl p-4 flex flex-col justify-between shadow-xl'>
                <div className="flex items-start">
                    <img 
                        src={imageUrl} 
                        alt={name}
                        className='w-[70%] h-32 rounded-md object-cover mr-4' 
                    />
                    <p className='text-[#02473b] font-semibold text-xl pt-1'>
                        {name}
                    </p>
                </div>
                
                <div className='flex justify-end gap-3 mt-2'>
                    <button 
                       onClick={() => handleDelete(id)}
                        className='w-16 h-8 bg-red-500 text-white text-sm rounded-xl transition duration-500 hover:scale-105'
                    >
                        Delete
                    </button>
                    <button 
                        onClick={() => handleEdit(id)}
                        className='w-16 h-8 bg-green-500 text-white text-sm rounded-xl transition duration-500 hover:scale-105'
                    >
                        Edit
                    </button>
                </div>
            </div>
        );
    };

   
    return (
        <div className='w-full min-h-screen bg-[#0A3C38]'>

            <div className="w-full h-16 bg-[#02473b] flex items-center justify-between px-8 fixed top-0 z-10 shadow-lg shadow-black/50">
                <h3 className="text-white font-sans font-bold text-2xl">Woodspire</h3>
                
                <div className='flex gap-7'>
                    <p onClick={() => navigate('/admin/dashboad')} className='hover:scale-105 duration-300 text-white cursor-pointer'>Dashboard</p>
                    <p className='hover:scale-105 duration-300 text-white cursor-pointer font-bold'>Category</p>
                    <p  onClick={() => navigate('/admin/products')}className='hover:scale-105 duration-300 text-white cursor-pointer'>Product</p>
                    <p className='hover:scale-105 duration-300 text-white cursor-pointer'>Orders</p>
                    <p  onClick={() => navigate('/admin/users')} className='hover:scale-105 duration-300 text-white cursor-pointer'>Users</p>
                </div>

                <div className='flex items-center gap-4'>
                    <button 
                        onClick={() => navigate('/createCategory')}
                        className='px-4 py-2 rounded-xl text-md text-white bg-green-600 hover:bg-green-700 shadow-xl hover:scale-105 duration-300 font-semibold'
                    >
                        + Add Category
                    </button>
                    <button className='w-20 h-9 rounded-xl text-md text-white bg-emerald-700 hover:bg-emerald-600 shadow-xl hover:scale-105 duration-300'>
                        LogOut
                    </button>
                </div>
            </div>
           
            <div className="pt-28 p-8 "> 
                <div className="flex flex-wrap gap-9 justify-items-center ">
                    
                  
                    {categories === null ? (
                        <p className='text-white text-xl'>Loading categories...</p> 
                    ) : categories.length === 0 ? (
                        <p className='text-white text-xl'>No categories found or failed to load data.</p> 
                    ) : (
                        categories.map((cat) => (
                            <CategoryCard 
                                key={cat._id} 
                                id={cat._id}
                                name={cat.name}
                                image={cat.image}
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default AddCategory;