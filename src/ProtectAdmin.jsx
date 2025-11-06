import React, { useState,useEffect } from 'react'
import api from './services/axios';
import { Navigate } from 'react-router-dom';


export default function ProtectAdmin({children}) {
    const [isAdmin,setIsAdmin] = useState()

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await api.get("/admin");
        if (res.status === 200 && res.data.isAdmin === true) {
          setIsAdmin(true);
        }
      } catch (error) {
        if (error.status === 401) {
          setIsAdmin(false);
        }
      }
    };

    fetch();
  }, [isAdmin]);

  if (isAdmin === true) {
    return children;
    
  } else if (isAdmin === false) {
    console.log(isAdmin);

    return <Navigate to={'/'}></Navigate>;
  }
}


