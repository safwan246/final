import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/axios";


const Usercategory = () => {
    const { id } = useParams();
    const navigate = useNavigate();

  
    const [products, setProducts] = useState(null);

   
    const [categoryName, setCategoryName] = useState("Loading Products...");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await api.get(`/category/${id}`);

               
                setCategoryName(res.data.name);
                setProducts(Array.isArray(res.data.products) ? res.data.products : []);

            } catch (err) {
                console.error("Error fetching products:", err);
              
                setCategoryName("Category Not Found or Loading Error");
                setProducts([]); 
            }
        };

        fetchProducts();
    }, [id]);

    
    const isLoading = products === null;

    return (
        <>

            <div className="w-full min-h-screen bg-gray-50 px-6 md:px-12 lg:px-20 py-16">

                <button
                    onClick={() => navigate(-1)}
                    
                    className="mb-8 w-28 rounded-md **bg-gray-200** text-gray-800 font-sans font-extrabold p-2 **hover:bg-gray-300** hover:text-green-600 transition"
                >
                    ← Back
                </button>


                <h2 className="text-4xl font-extrabold text-center mb-10 text-gray-800 uppercase">
                    {categoryName}
                </h2>


                {isLoading ? (
                    
                    <p className="text-center text-gray-600 text-xl">Loading products...</p>
                ) : products.length === 0 ? (
                   
                    <p className="text-center text-gray-600 text-lg">
                        No products available in this category.
                    </p>
                ) : (
                   
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
                        {products.map((p) => (
                            <div
                                key={p._id}
                                onClick={() => { navigate(`/products/${p._id}`) }}
                                className="bg-white rounded-2xl shadow-md hover:shadow-xl 
           transition-transform duration-300 hover:scale-105 p-6 flex flex-col items-center text-center cursor-pointer" // Added cursor-pointer
                            >
                                <img
                                    src={`http://localhost:3033/uploads/${p.image}`}
                                    alt={p.name}
                                    className="w-48 h-48 object-cover rounded-xl mb-4 border border-gray-100" // Added minor styling
                                />
                                <h3 className="text-xl font-semibold text-gray-800">
                                    {p.name}
                                </h3>
                                <p className="text-gray-500 text-sm mt-2 line-clamp-2">{p.description}</p>
                                <div className="mt-4 text-lg font-bold text-green-600">
                                    ₹{p.price}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default Usercategory;