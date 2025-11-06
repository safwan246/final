

import React, { useEffect, useState } from "react";
import {  useNavigate, useParams } from "react-router-dom";
import api from "../services/axios";



const AddProduct = () => {
    
    const { id } = useParams();
        const [name,Setname] = useState('')
        const [description,Setdescription] = useState('')
        const [price,Setprice] = useState('')
        const [category,SetCategory] = useState('')
        const [Categories,SetCategories] = useState([])
        const [image ,Setimage] = useState(null)




    const navigate = useNavigate()

       const fetchCategories = async () => {
        try {
            const response = await api.get('/admin/categories');
            SetCategories(response.data); 
        } catch (error) {
            console.error("Error fetching categories:", error);
            SetCategories([]);
        }
       
    };
     useEffect(()=>{
            fetchCategories()
        },[])

    const handleFileChange = (e) => {
        Setimage(e.target.files[0]); 
    };
    

    const handleSubmit = async(e)=>{
        e.preventDefault();

        if(!name.trim()){
            alert("Category name is required")
            return;
        }
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description); 
        formData.append("price",price);
        formData.append("category",category);
        formData.append('image', image); 
        
       
      try{
       const data = await api.put(`/admin/products/${id}`, formData,{
        headers:{"Content-Type":"multipart/form-data"},

      });
      console.log(formData);
      
      alert("category added successfully");
      navigate("/admin/products");
   
      }catch(err){

        console.log(err)
        alert("something error")

      }
    }
return (
    <div className="w-full h-screen flex justify-center items-center bg-gray-900 p-4">

        <form 
            onSubmit={handleSubmit} 
            className="bg-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-xl space-y-6"
        >
            <h2 className="text-white text-4xl font-extrabold text-center mb-6"> Edit Product</h2>

         
            <div>
                <label htmlFor="name" className="block text-white text-lg font-medium mb-2">
                    Product Name
                </label>
                <input
                    type="text"
                    value={name}
                    onChange={(e)=>Setname(e.target.value)}
                    id="name"
                    className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-150"
                    placeholder="e.g., Ergonomic Office Chair"
                />
            </div>
            
         
            <div>
                <label htmlFor="description" className="block text-white text-lg font-medium mb-2">
                    Description
                </label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e)=>Setdescription(e.target.value)}
                    rows="3"
                    className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500 resize-y transition duration-150"
                    placeholder="A detailed description of the product..."
                ></textarea>
            </div>

            <div className="flex gap-4">
            
                <div className="w-1/2">
                    <label htmlFor="price" className="block text-white text-lg font-medium mb-2">
                        Price
                    </label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e)=>Setprice(e.target.value)}
                        id="price"
                        className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500 appearance-none transition duration-150"
                        placeholder="price"
                    />
                </div>

                <div className="w-1/2">
                    <label htmlFor="category" className="block text-white text-lg font-medium mb-2">
                        Category
                    </label>
                    <select
                        value={category}
                        onChange={(e)=>SetCategory(e.target.value)}
                        id="category"
                        className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-150"
                    >


                                          <option value="">Select Category</option>
                  {Categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}

                    </select>
                </div>
            </div>

            <div>
                <label htmlFor="image" className="block text-white text-lg font-medium mb-2">
                    Product Image
                </label>
                <input
                    type="file"
                    id="image"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="block w-full text-sm text-gray-400
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-green-600 file:text-white
                        hover:file:bg-green-700 cursor-pointer transition duration-150"
                />
            </div>

      
            <div className="flex justify-end gap-4 pt-6">
                <button
                    type="button"
                    className="px-6 py-2 rounded-lg bg-gray-600 text-white font-semibold hover:bg-gray-500 transition duration-300 shadow-md"
                >
                    Cancel
                </button>
                
                <button
                    type="submit" 
                    className="px-6 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition duration-300 shadow-lg"
                >
                    Submit Product
                </button>
            </div>
        </form>
    </div>
    )
};

export default AddProduct;