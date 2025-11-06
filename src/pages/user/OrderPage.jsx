import React, { useEffect, useState } from "react";
import api from "../../services/axios.jsx";
import { useNavigate } from "react-router-dom";

const OrderPage = () => {
  const [cart, setCart] = useState(null);
  const [placingOrder, setPlacingOrder] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await api.get("/cart", { withCredentials: true });
        setCart(res.data);
      } catch (err) {
        console.error("Error fetching cart:", err);
      }
    };
    fetchCart();
  }, []);


  const handlePlaceOrder = async () => {
    try {
      setPlacingOrder(true);
      const res = await api.post(
        "/orders",
        { orderStatus: "pending" },
        { withCredentials: true }
      );

      alert("Order placed successfully!");
      console.log(res.data);
      navigate("/user/orders/list"); 
    } catch (err) {
      console.error("Error creating order:", err);
      alert("Failed to place order");
    } finally {
      setPlacingOrder(false);
    }
  };

  return (
    <>
     
      <div className="min-h-screen bg-green-50 px-6 md:px-20 py-10"> 
       
        <h1 className="text-4xl font-extrabold text-green-900 mb-8 pt-8"> 
          Review & Place Your Order 
        </h1>

        {!cart || !cart.items?.length ? (
          <div className="flex items-center justify-center text-green-700 text-lg h-64 border-2 border-dashed border-green-300 rounded-xl p-8 bg-white shadow-lg">
            Your cart is empty. Please add items to proceed.
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-10">
       
            <div className="lg:col-span-2 bg-white **shadow-xl** rounded-2xl p-8"> 
              <h2 className="text-2xl font-semibold text-green-700 mb-6 border-b border-green-100 pb-3">
                Items in Your Cart
              </h2>
              {cart.items.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center justify-between border-b border-gray-100 py-4 last:border-b-0"
                >
                  <div className="flex items-start gap-4">
                    <img
                      src={`http://localhost:3033/uploads/${item.productId.image}`}
                      alt={item.productId.name}
                      className="w-24 h-24 object-cover rounded-xl **ring-2 ring-green-100**"
                    />
                    <div>
                      <h3 className="font-bold text-lg text-green-800"> 
                        {item.productId.name}
                      </h3>
                      <p className="text-md text-gray-600">
                        Quantity: **{item.quantity}**
                      </p>
                    </div>
                  </div>
                
                  <div className="text-right ml-4 flex-shrink-0"> 
                    <p className="text-xl text-green-700 font-extrabold"> 
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </p>
                    <p className="text-gray-500 text-sm">@ ₹{item.price} each</p>
                  </div>
                </div>
              ))}
            </div>

            
        
            <div className="bg-white **shadow-xl** rounded-2xl p-8 **border-2 border-green-400**">
              <h2 className="text-2xl font-bold text-green-900 mb-6 border-b border-green-200 pb-3"> 
                Order Summary
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between text-lg text-gray-700">
                  <span>Subtotal</span>
                  <span className="font-semibold">₹{cart.totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg text-green-600 font-medium"> 
                  <span>Delivery</span>
                  <span>Free</span>
                </div>
                <hr className="border-green-200 mt-4 mb-4" />
                <div className="flex justify-between font-extrabold text-2xl text-green-900"> 
                  <span>Order Total</span>
                  <span>₹{cart.totalAmount.toFixed(2)}</span>
                </div>
              </div>

             
              <button
                onClick={handlePlaceOrder}
                disabled={placingOrder}
                className="mt-8 w-full bg-green-600 text-white **py-4** rounded-xl font-bold text-xl hover:bg-green-700 transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed transform hover:scale-[1.01]"
              >
                {placingOrder ? "Placing Order..." : "Place Order Now"}
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default OrderPage;