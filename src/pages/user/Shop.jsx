import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import api from '../../services/axios'
import { IoLogoInstagram } from "react-icons/io5";
import { FaFacebookSquare } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";

const links = {
  company: [
    { name: 'About Us', href: '#' },
    { name: 'Our Services', href: '#' },
    { name: 'Login', href: '#' },
    { name: 'FAQ', href: '#' },
    { name: 'Blog', href: '#' },
  ],
  support: [
    { name: 'Contact Us', href: '#' },
    { name: 'Order Tracking', href: '#' },
    { name: 'Returns & Refunds', href: '#' },
    { name: 'Shipping Information', href: '#' },
    { name: 'FAQ', href: '#' },
  ],
};


function Shop() {

    const [product,setProduct ] = useState([])
    const navigate = useNavigate()

    // -------------------- ADDED (pagination state) --------------------
    const [page, setPage] = useState(1);
    const ITEMS_PER_PAGE = 8; // tweak per your UI
    const totalPages = Math.max(1, Math.ceil(product.length / ITEMS_PER_PAGE));
    const start = (page - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    // ------------------------------------------------------------------

    const handleProduct = async () =>{

        const response = await api.get('/products')
        console.log(response);
        
        setProduct(response.data)

    } 
      useEffect(() => {
          handleProduct();
      }, []); 


     const ProductCard  = ({ id, name, image, price }) => {
        const imageUrl = `http://51.21.221.33/api/uploads/${image}`;


  return (
    <>
            <div className='w-90 h-80 bg-zinc-100 rounded-xl p-4 flex flex-col justify-between shadow-xl'>
                <div className="flex items-start">
                    <img 
                        src={imageUrl} 
                        alt={name}
                        className='w-90 h-45 rounded-md object-cover mr-4' 
                    />
                    </div>
                    <div>
                    <p className='text-[#02473b] font-semibold text-xl pt-1'>
                        {name}
                    </p>

                    <p className='pt-5'>₹{price}</p>
                    

                    </div>
                
                
                <div className='flex justify-end gap-3 mt-2'>
                   
                    <button
                        onClick={()=>navigate(`/user/product/buy/${id}`)} 
                        
                        className='  text-[#02473b] text-sm rounded-xl transition duration-100 hover:text-md hover:scale-105 hover:cursor-pointer'
                    >
                        Add to cart
                    </button>
                </div>
            </div>
            </>
        );
    };

   
    return (
        <>
        <div className='w-full min-h-screen bg-white'>

            <div className="w-full h-16 bg-[#02473b] flex items-center justify-between px-8 fixed top-0 z-10 shadow-lg shadow-black/50">
                <h3 className="text-white font-sans font-bold text-2xl">Woodspire</h3>
                
                
                <div className='flex items-center gap-4'>
                  
                    <button className='w-20 h-9 rounded-xl text-md text-white bg-emerald-700 hover:bg-emerald-600 shadow-xl hover:scale-105 duration-300'>
                        LogOut
                    </button>
                </div>
            </div>
           
            <div className="pt-28 p-8 "> 
                <div className="flex flex-wrap gap-9 justify-center items-center  ">
                    
                  
                    {product === null ? (
                        <p className='text-white text-xl'>Loading categories...</p> 
                    ) : product.length === 0 ? (
                        <p className='text-white text-xl'>No categories found or failed to load data.</p> 
                    ) : (
                        // -------- CHANGED: added .slice(start, end) only ----------
                        product.slice(start, end).map((pro) => (
                            <ProductCard  
                                key={pro._id} 
                                id={pro._id}
                                price={pro.price}
                                name={pro.name}
                                image={pro.image}
                            />
                        ))
                        // -----------------------------------------------------------
                    )}
                </div>

                {/* -------------------- ADDED: Pagination controls -------------------- */}
                {product && product.length > 0 && (
                  <div className="mt-10 flex items-center justify-center gap-2 select-none">
                    <button
                      onClick={() => setPage(p => Math.max(1, p - 1))}
                      disabled={page === 1}
                      className={`px-3 py-1 rounded-lg text-sm border ${page === 1 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} bg-white text-[#02473b] border-[#02473b] hover:bg-[#02473b]/10`}
                    >
                      ‹ Prev
                    </button>

                    {Array.from({ length: totalPages }).map((_, i) => {
                      const num = i + 1;
                      return (
                        <button
                          key={num}
                          onClick={() => setPage(num)}
                          className={`px-3 py-1 rounded-lg text-sm border ${num === page ? 'bg-[#02473b] text-white border-[#02473b]' : 'bg-white text-[#02473b] border-[#02473b] hover:bg-[#02473b]/10'}`}
                        >
                          {num}
                        </button>
                      );
                    })}

                    <button
                      onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                      disabled={page === totalPages}
                      className={`px-3 py-1 rounded-lg text-sm border ${page === totalPages ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} bg-white text-[#02473b] border-[#02473b] hover:bg-[#02473b]/10`}
                    >
                      Next ›
                    </button>
                  </div>
                )}
                {/* -------------------------------------------------------------------- */}
            </div>
        </div>
              <div className="bg-[#141d2f] text-white">
            
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 border-b border-gray-700">
                
           
                <div className="space-y-6">
                  <div className="flex items-center space-x-2">
                   
                    <span className="text-2xl font-bold text-[#00a896]">Woodspire</span> 
                  </div>
                  <p className="text-sm text-gray-300 pr-8">
                    Transforming homes with premium quality furniture that combines elegance, comfort, and functionality. Crafted with passion for those who appreciate exceptional design.
                  </p>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center space-x-2 text-gray-300">
                     
                      <span>+91 98498738390</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-300">
                      
                      <span>support@furnicraft.com</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-300">
                      
                      <span>123 Design Street, Furniture District, FC 10001</span>
                    </div>
                  </div>
                </div>
        
         
                <div className=" grid grid-cols-1 sm:grid-cols-2 col-span-1 md:col-span-2 gap-12">
                    
                 
                    <div className='space-y-4'>
                        <h4 className="font-semibold text-lg uppercase tracking-wider">Company</h4>
                        <ul className="space-y-2 text-sm">
                            {links.company.map((link) => (
                                <li key={link.name} className="flex items-center">
                                    <span className="mr-2 text-gray-400">&rarr;</span>
                                    <a href={link.href} className="text-gray-300 hover:text-[#00a896] transition-colors">
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
        
                 
                    <div className='space-y-4'>
                        <h4 className="font-semibold text-lg uppercase tracking-wider">Support</h4>
                        <ul className="space-y-2 text-sm">
                            {links.support.map((link) => (
                                <li key={link.name} className="flex items-center">
                                    <span className="mr-2 text-gray-400">&rarr;</span>
                                    <a href={link.href} className="text-gray-300 hover:text-[#00a896] transition-colors">
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
        
                </div>
        
             
                <div className="space-y-6">
                  <h4 className="font-semibold text-lg uppercase tracking-wider">Newsletter</h4>
                  <p className="text-sm text-gray-300">
                    Subscribe to get special offers, free giveaways, and new product launches.
                  </p>
                  <form className="flex">
                    <input
                      type="email"
                      placeholder="Your email address"
                      className="p-3 w-full rounded-l bg-[#2d3748] text-sm focus:outline-none placeholder-gray-400"
                    />
                    <button
                      type="submit"
                      className="bg-[#00a896] text-white p-3 rounded-r hover:bg-[#008f7d] transition-colors"
                    >
                      &rarr;
                    </button>
                  </form>
                  <p className="text-xs text-gray-400 pt-2">
                    By subscribing, you agree to our Privacy Policy.
                  </p>
                </div>
              </div>
        
        
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 md:grid-cols-3 gap-8 border-b border-gray-700">
                
             
                <div className="flex items-center space-x-4">
                  <div className="bg-[#00a896] p-3 rounded-lg text-white">
                   
                  </div>
                  <div>
                    <p className="font-semibold text-white">Free Shipping</p>
                    <p className="text-sm text-gray-300">On orders over $999</p>
                  </div>
                </div>
        
               
                <div className="flex items-center space-x-4">
                  <div className="bg-[#00a896] p-3 rounded-lg text-white">
                  
                  </div>
                  <div>
                    <p className="font-semibold text-white">Secure Payment</p>
                    <p className="text-sm text-gray-300">Safe & encrypted</p>
                  </div>
                </div>
        
                <div className="flex items-center space-x-4">
                  <div className="bg-[#00a896] p-3 rounded-lg text-white">
                    {/* <ShieldCheck size={24} /> */}
                  </div>
                  <div>
                    <p className="font-semibold text-white">Quality Guarantee</p>
                    <p className="text-sm text-gray-300">5-year warranty</p>
                  </div>
                </div>
              </div>
        
              
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
                <p>© 2025 FurniCraft. All rights reserved.</p>
                
                {<div className="flex space-x-4 mt-4 md:mt-0"> 
                  <a href="#" className="hover:text-[#00a896] transition-colors"><IoLogoInstagram  size={20} /></a>
                  <a href="#" className="hover:text-[#00a896] transition-colors"><FaFacebookSquare  size={20} /></a>
                  <a href="#" className="hover:text-[#00a896] transition-colors"><FaXTwitter  size={20} /></a>
                  <a href="#" className="hover:text-[#00a896] transition-colors"><FaLinkedin size={20} /></a>
                  <a href="#" className="hover:text-[#00a896] transition-colors"><FaYoutube  size={20} /></a>
                </div> }
              </div>
            </div>
</>
        
    );
}
    
export default Shop
