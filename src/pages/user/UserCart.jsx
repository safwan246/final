import React, { useEffect, useState } from "react";
import api from "../../services/axios";
import { useNavigate } from "react-router-dom";



const UserCart = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const navigate = useNavigate();

  const fetchCart = async () => {
    setLoading(true);
    try {
      const res = await api.get("/cart");
      setCart(res.data);
    } catch (err) {
      console.error("Error fetching cart:", err);
      setCart(null); 
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []); 

  
  const updateQuantity = async (productId, delta) => {

    if (isUpdating || !cart?._id) return;
    
    const action = delta === 1 ? "increase" : "decrease";
    const currentItem = cart.items.find(item => item.productId._id === productId);
    if (!currentItem) return;

    const previousCart = cart; 
    let newItems;
    let newTotal;
    const isRemoval = (currentItem.quantity === 1 && action === "decrease");

    if (isRemoval) {
      
        newItems = cart.items.filter(item => item.productId._id !== productId);
        newTotal = cart.totalAmount - (currentItem.price * currentItem.quantity);
    } else {
        const newQty = Math.max(1, currentItem.quantity + delta);
        newItems = cart.items.map(item => 
            item.productId._id === productId ? { ...item, quantity: newQty } : item
        );
        newTotal = newItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    }
    
    
    setIsUpdating(true);
    setCart({ ...cart, items: newItems, totalAmount: newTotal });

    
    try {
        await api.put(`/cart/${cart._id}`, { 
            productId: productId, 
            action: action 
        });

        if (isRemoval) {
        
            await fetchCart(); 
        }
        
    } catch (err) {
        console.error("Error persisting cart update. Reverting UI.", err);
        alert("Failed to update quantity. Reverting changes.");
        
       
        setCart(previousCart); 
        
        fetchCart(); 
        
    } finally {
        setIsUpdating(false);
    }
  };

 
  if (loading) {
    return (


      <div className="flex justify-center items-center min-h-screen text-gray-500 bg-white">
        Loading cart...
      </div>
    );
  }

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-gray-600 bg-white">
        <h2 className="text-3xl font-semibold mb-4 text-green-700">Your Cart is Empty</h2>
        <p className="text-gray-500 mb-8">Looks like you haven't added anything yet.</p>
        <a
          href="/"
         
          className="bg-green-700 text-white px-6 py-3 rounded-xl hover:bg-green-800 transition shadow-md"
        >
          Continue Shopping
        </a>
      </div>
    );
  }


  return (
     
    <>
   
    
    <div className="min-h-screen bg-white px-6 md:px-16 py-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-10 text-center">
         Your Shopping Cart
      </h1>

      <div className="grid md:grid-cols-3 gap-10">
        <div className="md:col-span-2 space-y-6">
          {cart.items.map((item) => (
            <div
              key={item.productId._id} 
              className="flex flex-col sm:flex-row bg-white rounded-2xl shadow-lg hover:shadow-xl p-5 transition"
            >
              <img
                src={`http://51.21.221.33/api/uploads/${item.productId.image}`}
                alt={item.productId.name}
                className="w-32 h-32 object-cover rounded-xl mb-4 sm:mb-0 sm:mr-6"
              />
                
              <div className="flex flex-col justify-between w-full">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {item.productId.name}
                  </h3>
                  <p className="text-gray-500 mt-1 text-sm">
                    {item.productId.description}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-4">
                    
                    <button
                      onClick={() => updateQuantity(item.productId._id, -1)}
                      className="px-3 py-1 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50 text-gray-700"
                      disabled={isUpdating}
                      >
                      - 
                    </button>
                    <span className="text-lg font-semibold w-8 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.productId._id, 1)}
                      className="px-3 py-1 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50 text-gray-700"
                      disabled={isUpdating}
                      >
                      +
                    </button>
                  </div>

             
                  <p className="text-lg font-bold text-green-700"> 
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

     
        <div className="bg-white shadow-lg rounded-2xl p-6 h-fit">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h2>
          <div className="flex justify-between text-gray-600 mb-3">
            <span>Subtotal</span>
            <span>₹{(cart.totalAmount ?? 0).toFixed(2)}</span> 
          </div>
          <div className="flex justify-between text-gray-600 mb-3">
            <span>Shipping</span>
            <span className="text-green-700 font-medium">Free</span>
          </div>
          <div className="flex justify-between font-bold text-xl text-green-700 border-t pt-4">
            <span>Total</span>
            <span>₹{((cart.totalAmount ?? 0))}</span> 
          </div>
          <div>

          </div>
         
          <button 
          onClick={()=>{navigate('/user/order')}}
          className="w-full mt-6 bg-green-700 text-white py-3 rounded-xl font-semibold hover:bg-green-800 transition shadow-md">
            Order Now
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default UserCart;