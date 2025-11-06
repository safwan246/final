
import { home } from '../../assets/asset.js'
import img3 from '../../assets/img3.jpg'
import NavBar from '../../NavBar.jsx' 
import React, { useEffect, useState } from 'react'
import api from '../../services/axios.jsx'
import { IoLogoInstagram } from "react-icons/io5";
import { FaFacebookSquare } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import {  useNavigate } from 'react-router-dom'
import MobileHeader from '../../MobileNavbar.jsx';


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




function MainBar() {

    const [product, setproduct] = useState([])
    const [category, setCategory] = useState([])
  
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        
        document.body.style.overflow = isMenuOpen ? 'auto' : 'hidden';
    };


    const navigate = useNavigate()
    const HandleCategory = async () => {
       try{
         
        const fetchData = await api.get('/category')
        setCategory(fetchData.data)

       }catch(err){
        console.log(err);
        
       }

    }

    const HandleProduct = async () => {

        try {

            const response = await api.get("/products")
            setproduct(response.data)


        } catch (err) {
            console.log(err);

        }


    }

    useEffect(() => {
        HandleProduct()
        HandleCategory()
       
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [])

    return (

        <>
         
            <MobileHeader 
                onMenuToggle={toggleMenu} 
                isMenuOpen={isMenuOpen} 
            />

          
            <div className='w-full min-h-screen bg-[#014d40] flex flex-col md:flex-row'>

               
                <div className="hidden md:block md:w-1/6">
                    <NavBar />
                </div>

               
                <div className="w-full md:w-5/6 flex flex-col lg:flex-row">
                    
                    
                    <div className='w-full  lg:w-1/2 flex p-8 sm:p-12 lg:p-20 flex-col justify-center order-2 lg:order-1'>
                        <h1 className='text-white  font-medium text-4xl sm:text-5xl lg:text-6xl lg:pr-10 leading-snug'>
                            Happiness <br className="hidden sm:block" /> blooms from <br className="hidden sm:block" /> within
                        </h1>
                        <p className='text-white font-normal text-base sm:text-xl mt-4 mb-8 max-w-lg'>
                            Our environment, the world in which we live and work, is a mirror of our attitudes and expectations.
                        </p>
                        <div className='flex gap-4'>
                            <button className='bg-white font-medium text-[#014d40] px-6 py-3 rounded-md hover:cursor-pointer hover:scale-[1.02] transition duration-300'>
                                Shop now
                            </button>
                            <button className='text-white px-6 py-3 border border-white rounded-md hover:bg-white hover:text-[#014d40] transition duration-300'>
                                Explore plant
                            </button>
                        </div>
                    </div>

                  
                    <div className="w-full lg:w-1/2 h-full flex flex-col justify-center p-8 sm:p-12 order-1 lg:order-2">
                      
                        <div className='flex gap-4 mb-4'>
                            {home.slice(0, 2).map((h) => (
                                <div
                                    key={h.id}
                                    className="rounded-xl w-1/2 aspect-square transform transition duration-300 hover:scale-[1.03] overflow-hidden"
                                >
                                    <img
                                        src={h.image}
                                        alt=""
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            ))}
                        </div>

                  
                        <div className='flex'>
                            <img 
                                src={img3} 
                                alt=""
                                className='w-full h-40 sm:h-64 object-cover transform transition duration-400 rounded-xl hover:scale-[1.02]' 
                            />
                        </div>
                    </div>
                </div>

            </div>

    
            <p className='text-2xl sm:text-3xl font-semibold p-8 sm:p-10 text-[#014d40]'>
                Featured Products
            </p>
            <div className='flex p-8 gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory'>
                {product.map((pro) => (
                    <div 
                        key={pro._id ?? pro.id} 
                        className='flex-none w-64 snap-center bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300'
                    >
                        <div className='w-full'>
                            {pro.image ? (
                                <img
                                    src={`http://localhost:3033/uploads/${pro.image}`}
                                    alt={pro.name}
                                    className="w-full h-48 object-cover rounded-t-xl"
                                />
                            ) : (
                                <div className="w-full h-48 flex items-center justify-center bg-gray-200 rounded-t-xl text-gray-500">No Image</div>
                            )}
                        </div>

                        <div className='p-4'>
                            <div className='flex justify-between items-start mb-2'>
                                <p className='text-lg font-semibold text-gray-800'>
                                    {pro.name}
                                </p>
                                <p className='text-lg font-bold text-green-900'>
                                    ₹{pro.price}
                                </p>
                            </div>
                            <button 
                                onClick={()=> navigate(`/user/product/buy/${pro._id}`)} 
                                className='w-full mt-2 py-2 border border-green-900 text-green-900 rounded-md hover:bg-green-900 hover:text-white transition duration-300'
                            >
                                Buy Now
                            </button>
                        </div>
                    </div>
                ))
                }
            </div>

          
            <div className="bg-green-50/70 py-16 px-4"> 
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-green-900 mb-2">
                        Discover Your Home's Potential
                    </h1>
                    <p className="text-base sm:text-lg text-gray-700 mb-8">
                        Find the perfect pieces to transform your space
                    </p>
                  
                    <div className="flex w-full max-w-2xl mx-auto mb-6">
                        <input
                            type="text"
                            placeholder="Search sofas, lighting, decor..."
                            className="flex-grow p-3 sm:p-4 text-sm sm:text-lg border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                        />
                        <button className="px-4 sm:px-6 bg-green-900 text-white rounded-r-lg hover:bg-green-800 transition duration-300">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 sm:h-6 sm:w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </button>
                    </div>

                   
                    <div   className="flex justify-center flex-wrap gap-3">
                        {['Sofas', 'Lighting', 'Shelf', 'Chair', 'Clock', ].map((category) => (
                            <button
                                key={category}
                                className={`
                                    px-4 py-2 text-sm font-medium rounded-full border border-green-700 text-green-700 bg-white hover:bg-green-100
                                    transition duration-200 whitespace-nowrap
                                `}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

         
            <div className="bg-pink-100/80 h-auto sm:h-72 w-full py-8 sm:py-0">
                <div className="z-10 max-w-6xl mx-auto h-full flex items-center px-4 sm:px-8">
                    <div className="text-gray-900 bg-white bg-opacity-80 p-6 sm:p-8 rounded-lg shadow-xl">
                        <h2 className="text-2xl sm:text-3xl font-semibold mb-2 text-pink-800">
                            Free Shipping Services
                        </h2>
                        <p className="text-sm text-gray-700 mb-4">
                            *only for the same region
                        </p>
                        <div className="space-y-2">
                            <p className="flex items-center text-sm font-medium">
                                <svg 
                                    className="w-4 h-4 mr-2 text-pink-600" 
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24" 
                                    xmlns="http://www.w3.org/2000/svg"
                                ><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                                +91 9846516578
                            </p>
                            <p className="flex items-center text-sm font-medium">
                                <svg 
                                    className="w-4 h-4 mr-2 text-pink-600" 
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24" 
                                    xmlns="http://www.w3.org/2000/svg"
                                ><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                                woodspire@gmail.com
                            </p>
                        </div>
                    </div>
                </div>
            </div>

           
            <div className='w-full py-16 px-4 flex flex-col justify-center items-center'>
                <p className='text-3xl sm:text-4xl lg:text-5xl font-bold text-[#014d40] mb-2'>
                    Inspiration Collection
                </p>
                <p className='text-base font-normal text-gray-500 mb-8'>
                    Discover beautiful home decor ideas
                </p>
                
                <div className='flex w-full overflow-x-auto scroll-smooth snap-x snap-mandatory p-4 gap-8'>
                    {category.map((cat) => (
                        <div 
                            onClick={()=>navigate(`/user/category/${cat._id}`)}
                            key={cat._id ?? cat.id} 
                            className='flex-none w-64 md:w-80 snap-center rounded-xl hover:cursor-pointer p-2'
                        >
                            <div className='w-full'>
                                {cat.image ? (
                                    <img
                                        src={`http://localhost:3033/uploads/${cat.image}`}
                                        alt={cat.name}
                                        className="w-full h-72 md:h-96 object-cover rounded-2xl transform transition duration-300 hover:scale-[1.03]"
                                    />
                                ) : (
                                    <div className="w-full h-72 md:h-96 flex items-center justify-center bg-gray-200 rounded-2xl text-gray-500">No Image</div>
                                )}
                            </div>

                            <div className='text-center pt-4'>
                                <p className='text-lg font-semibold text-gray-800'>
                                    {cat.name}
                                </p>
                            </div>
                        </div>
                    ))
                    }
                    
                </div>
            </div>


            <div className="bg-[#141d2f] text-white">
    
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 border-b border-gray-700">
        
   
        <div className="space-y-6">
          <div className="flex items-center space-x-2">
           
            <span className="text-2xl font-bold text-[#00a896]">Woodspire</span> 
          </div>
          <p className="text-sm text-gray-300">
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

 
        <div className="grid grid-cols-2 col-span-1 md:col-span-2 gap-8">
            
         
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

     
        <div className="space-y-6 lg:col-span-1">
          <h4 className="font-semibold text-lg uppercase tracking-wider">Newsletter</h4>
          <p className="text-sm text-gray-300">
            Subscribe to get special offers, free giveaways, and new product launches.
          </p>
          <form className="flex">
            <input
              type="email"
              placeholder="Your email address"
              className="p-3 w-full rounded-l bg-[#2d3748] text-sm focus:outline-none placeholder-gray-400 text-white"
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


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 border-b border-gray-700">
        
     
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
        
          </div>
          <div>
            <p className="font-semibold text-white">Quality Guarantee</p>
            <p className="text-sm text-gray-300">5-year warranty</p>
          </div>
        </div>
      </div>

      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
        <p className='text-center md:text-left'>© 2025 FurniCraft. All rights reserved.</p>
        
        {<div className="flex space-x-4 mt-4 md:mt-0"> 
          <a href="#" aria-label="Instagram" className="hover:text-[#00a896] transition-colors"><IoLogoInstagram  size={20} /></a>
          <a href="#" aria-label="Facebook" className="hover:text-[#00a896] transition-colors"><FaFacebookSquare  size={20} /></a>
          <a href="#" aria-label="Twitter" className="hover:text-[#00a896] transition-colors"><FaXTwitter  size={20} /></a>
          <a href="#" aria-label="LinkedIn" className="hover:text-[#00a896] transition-colors"><FaLinkedin size={20} /></a>
          <a href="#" aria-label="YouTube" className="hover:text-[#00a896] transition-colors"><FaYoutube  size={20} /></a>
        </div> }
      </div>
    </div>
        </>
    )
}
export default MainBar

