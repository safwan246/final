

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/axios";

const ProductManage = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState([]);
    const [refresh, setRefresh] = useState(false)

    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await api.get("/admin/products");

                setProducts(response.data || []);
                // console.log(response.data);
                // console.log(products.category);


                const categoriesRes = await api.get('/admin/categories');
                setCategory(categoriesRes.data || []);

            } catch (error) {
                console.error("Error fetching products:", error);
            }
        }
        fetchProducts();
    }, [refresh]);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this product?")) return;

        try {
            const res = await api.delete(`/admin/products/${id}`);
             alert(res.data.message);
            setRefresh(prev => !prev);

        } catch (error) {
            console.error("Delete error:", error);
        }
    };

    return (
         <>
         <div className="w-full h-16 bg-[#02473b] flex items-center justify-between px-8 fixed top-0 z-10 shadow-lg shadow-black/50">
                <h3 className="text-white font-sans font-bold text-2xl">Woodspire</h3>
                
                <div className='flex gap-7'>
                    <p onClick={() => navigate('/admin/dashboad')} className='hover:scale-105 duration-300 text-white cursor-pointer'>Dashboard</p>
                    <p onClick={() => navigate('/admin/category')} className='hover:scale-105 duration-300 text-white cursor-pointer font-bold'>Category</p>
                    <p className='hover:scale-105 duration-300 text-white cursor-pointer'>Product</p>
                    <p className='hover:scale-105 duration-300 text-white cursor-pointer'>Orders</p>
                    <p onClick={() => navigate('/admin/users')}className='hover:scale-105 duration-300 text-white cursor-pointer'>Users</p>
                </div>

                <div className='flex items-center gap-4'>
                    <button 
                        onClick={() => navigate('/admin/addproducts')}
                        className='px-4 py-2 rounded-xl text-md text-white bg-green-600 hover:bg-green-700 shadow-xl hover:scale-105 duration-300 font-semibold'
                    >
                        + Add Product
                    </button>
                    <button className='w-20 h-9 rounded-xl text-md text-white bg-emerald-700 hover:bg-emerald-600 shadow-xl hover:scale-105 duration-300'>
                        LogOut
                    </button>
                </div>
            </div>
        <div className="p-6 font-sans bg-gray-50 min-h-screen"> 
            <h2 className="text-2xl mb-4 text-gray-800 font-bold text-center pt-10">
                PRODUCTS
            </h2>

            <button
                onClick={() => navigate("/admin/addproducts")}
                
                className="font-bold mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
            >
                + Add Product
            </button>

            <div className="overflow-x-auto bg-white rounded-lg shadow-lg"> 
                <table className="w-full border-collapse border border-gray-200">
                    <thead>
                       
                        <tr className="bg-green-600 text-white">
                            <th className="p-3 border border-green-500">No.</th>
                            <th className="p-3 border border-green-500">Name</th>
                            <th className="p-3 border border-green-500">Price</th>
                            <th className="p-3 border border-green-500">Category</th>
                            <th className="p-3 border border-green-500">Image</th>
                            <th className="p-3 border border-green-500">Action</th>
                        </tr>
                    </thead>
                    <tbody>


                        {products.length > 0 ? (
                            products.map((prod, index) =>  (
                               
                            


                                <tr
                                    key={prod._id}
                                   
                                    className="hover:bg-green-50 transition-colors text-gray-700"
                                >
                                    <td className="p-2 border text-center">{prod._id}</td>
                                    <td className="p-2 border">{prod.name}</td>
                                    <td className="p-2 border font-semibold text-green-700">₹{prod.price}</td>
                                    <td className="p-2 border">{prod.category?.name}</td>
                                    <td className="p-2 border text-center">
                                        {prod.image ? (
                                            <img
                                                src={`http://localhost:3033/uploads/${prod.image}`}

                                                className="w-16 h-16 object-cover rounded"
                                            />
                                        ) : (
                                            "—"
                                        )}
                                    </td>
                                    <td className="p-2 border flex gap-2 justify-center">
                                        <button
                                            onClick={() => navigate(`/admin/EditProduct/${prod._id}`)}
                                            className="px-2 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(prod._id)}
                                            className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-800 transition-colors"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center p-4 text-gray-500">
                                    No products found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div className="text-center font-bold py-6">
                <p
                    className="text-lg cursor-pointer hover:underline text-green-700 transition-transform duration-300 hover:scale-105"
                    onClick={() => { navigate('/admin/dashboad') }}
                >
                    Back to Dashboard
                </p>
            </div>

        </div>
        </>
    );
};

export default ProductManage;

