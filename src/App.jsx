import React, { useEffect } from 'react';
import api from './services/axios.jsx';
import MainBar from './pages/publics/MainBar.jsx'
import Login from './Login';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import SignUp from './SignUp';
import AdminDashboard from './pages/AdminDashboard.jsx'
import AdminLogin from './AdminLogin'
import AddCategory from './pages/getCategory.jsx';
import CreateCategory from './pages/AddCategory.jsx';
import AddProduct from './pages/AddProduct.jsx';
import UserTable from './pages/UserManage.jsx';
import ProductManage from './pages/ProductManage.jsx';
import EditCategory from './pages/EditCategory.jsx';
import EditProduct from './pages/EditProduct.jsx';
import Usercategory from './pages/user/Usercategory.jsx';
import Shop from './pages/user/Shop.jsx';
import ProductDetails from './pages/user/ProductView.jsx';
import ProtectAdmin from './ProtectAdmin.jsx';
import UserCart from './pages/user/UserCart.jsx';
import OrderPage from './pages/user/OrderPage.jsx';
import AllOrders from './pages/user/AllOrders.jsx';
import OrderManage from './pages/OrderManage.jsx';



function App() {
  


  return (

  <div>
    
   

      <BrowserRouter>
      <Routes>
        <Route path = "/admin/login" element = {<AdminLogin/>} />
        <Route path = "/login" element = {<Login/>} />
        <Route path = "/signup" element = {<SignUp/>} />
        <Route path = "/" element = {<MainBar/>} />
        <Route path = "/admin/dashboad" element = {
<ProtectAdmin>
  <AdminDashboard/>
</ProtectAdmin>

          } 
           />

        <Route path = "/admin/category" element = {<AddCategory/>} />
        <Route path = "/createCategory" element = {<CreateCategory/>} />
        <Route path = "/admin/addproducts" element = {<AddProduct/>} />
        <Route path = "/admin/users" element = {<UserTable/>} />
        <Route path = "/admin/products" element = {<ProductManage/>} />
        <Route path = "/admin/EditCategory/:id" element = {<EditCategory/>} />
        <Route path = "/admin/EditProduct/:id" element = {<EditProduct/>} />
        <Route path = "/user/category/:id" element = {<Usercategory/>} />
        <Route path = "/user/shop" element = {<Shop/>} />
        <Route path = "/user/product/buy/:id" element = {<ProductDetails/>} />
        <Route path = "/user/cart" element = {<UserCart/>} />
        <Route path = "/user/order" element = {<OrderPage/>} />
        <Route path = "/user/orders/list" element = {<AllOrders/>} />
        <Route path = "/admin/orders" element = {<OrderManage/>} />
        
      

        

        
      

      </Routes>

    
      
     
      </BrowserRouter>
    </div>
 


  )
}

export default App


  
    

