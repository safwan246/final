import React, { useEffect, useState } from "react"
import { CiSearch } from "react-icons/ci";
import { FiShoppingCart } from "react-icons/fi";
import { RiUserSharedLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { RiLogoutBoxRLine } from "react-icons/ri";
import api from "./services/axios";
// import useLogout from "./hooks/useLogout";


function NavBar(){

  const navigate = useNavigate()
//   const {logout} =useLogout()
  const [isLoggedIn, setIsLogdedIn] = useState(false)
 
 async function logout() {
        const res = await api.delete('/logout')
         alert('logout successfull')
         setIsLogdedIn()
       }

useEffect(()=>{
     
    api.get('/isLogin').then((res) =>{

        if(res.data.login === true){

            setIsLogdedIn(true)
           
        }

        else{
            setIsLogdedIn(false)
        }
    })
    .catch((err)=>{
        console.log(err);
    })

},[setIsLogdedIn])
  
   
    return(
<div className="w-full h-[8%] bg-[#02473b] flex items-center justify-between fixed z-10">

<h3 className="text-white font-sans font-semibold text-2xl pl-7 md:text-md ">Woodspire</h3> 
<div className="w-70 gap-8 flex justify-center">
    <button onClick={()=>navigate('/user/shop')} className="text-md text-white font-sans font-semibold hover:cursor-pointer hover:scale-105">shop</button>
    <button className="text-md text-white font-sans font-semibold hover:cursor-pointer hover:scale-105">order</button>
    <button className="text-md text-white font-sans font-semibold hover:cursor-pointer hover:scale-105">category </button>
</div>
<div className= " w-60 flex justify-center gap-4">

<CiSearch className=" text-white  font-semibold w-8 h-5 hover:cursor-pointer hover:scale-105"/>
<FiShoppingCart onClick={()=>navigate('/user/cart')}className=" font-bold text-white w-8 h-5 hover:cursor-pointer hover:scale-105"/>
    {isLoggedIn ? (
    
    <RiLogoutBoxRLine  
        onClick={logout}
        className="font-bold text-white w-8 h-5 hover:cursor-pointer hover:scale-105"
    />
) : (
   
    <RiUserSharedLine 
        onClick={() => navigate('/login')} 
        className="font-bold text-white w-8 h-5 hover:cursor-pointer hover:scale-105"
    />
)}

</div>
</div>
    )
}
export default NavBar