import React, { useEffect, useState } from "react";
import api from "../../services/axios.jsx";
import { useNavigate } from "react-router-dom";

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get("/orders", { withCredentials: true });
        setOrders(res.data);
        console.log(res.data);
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };

    fetchOrders();
  }, []);

  return (
    <>
      
     
      <div className="min-h-screen bg-green-50 px-6 md:px-20 py-10">
        <div className="inline-block font-bold w-full ">
          
      
          <h1 className="text-4xl font-extrabold text-green-900 mb-8 pt-5">My Orders </h1>
        
        </div>
        {orders.length === 0 ? (
          <div className="text-center text-green-700 text-lg **p-10 border-2 border-dashed border-green-300 bg-white rounded-xl**">
            You haven't placed any orders yet.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {orders.map((order) => (
              <div
                key={order._id}
               
                className="bg-white **shadow-xl** rounded-2xl p-6 **border border-green-200** hover:shadow-2xl transition duration-300 **scale-[1.01]** cursor-pointer"
                onClick={() => navigate(`/user/order/${order._id}`)}
              >
                <div className="flex justify-between mb-3">
             
                  <p className="text-green-800 font-semibold">
                    Order ID: <span className="text-sm font-normal text-gray-600">{order._id.substring(0, 8)}...</span>
                  </p>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-bold ${
                     
                      order.status === "pending"
                        ? "bg-yellow-200 text-yellow-800"
                        : order.status === "completed"
                        ? "bg-green-200 text-green-800"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {order.Status}
                  </span>
                </div>

                <hr className="my-3 **border-green-100**" />

                <div className="text-gray-700">
               
                  <p className="mb-2 text-xl font-extrabold text-green-900">
                    Total: ₹{order.totalAmount}
                  </p>
                  <p className="text-sm text-gray-500">
                    {order.items.length} items
                  </p>
                </div>

                <div className="mt-4 flex gap-3 overflow-x-auto">
                  {order.items.map((item) => (
                    <img
                      key={item._id}
                      src={`http://localhost:3033/uploads/${item.productId?.image}`}
                      alt={item.productId?.name}
                      
                      className="w-16 h-16 object-cover rounded-xl border border-green-300"
                    />
                  ))}
                
                  
                </div>
              </div>
            ))}
          </div>
        )}
      
        <div className="text-center py-10 text-xl font-bold">
            <h2 className="hover:cursor-pointer text-green-700 hover:text-green-900 transition underline underline-offset-4" onClick={()=>{navigate('/')}}>
                ← Back to Home
            </h2>
        </div>
      </div>
    </>
  );
};

export default AllOrders;