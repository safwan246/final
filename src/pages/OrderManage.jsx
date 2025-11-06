import React, { useEffect, useState } from "react";
import api from "../services/axios";
import { useNavigate } from "react-router-dom";

const OrderManage = () => {
  const [orders, setOrders] = useState([]);
  const [updating, setUpdating] = useState(false);
  const navigate = useNavigate();

  const fetchOrders = async () => {
    try {
      const res = await api.get("/admin/orders", { withCredentials: true });
      console.log("Fetched orders:", res.data);
      const data = Array.isArray(res.data) ? res.data : res.data.orders || [];
      setOrders(data);
      console.log(data);
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      setUpdating(true);
      await api.put(`/admin/orders/${orderId}`, { status: newStatus });
      await fetchOrders();
      alert("Order status updated!");
    } catch (err) {
      console.error("Error updating order:", err);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-green-50 px-6 md:px-20 py-10">
        <h1 className="text-3xl font-bold text-green-700 mb-8 text-center">
          Manage Orders
        </h1>

        {orders.length === 0 ? (
          <div className="text-green-700 text-lg text-center">
            No orders found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-xl shadow-md border border-green-200">
              <thead className="bg-green-100 border-b border-green-200">
                <tr>
                  <th className="text-left p-4 text-green-800">User</th>
                  <th className="text-left p-4 text-green-800">Items</th>
                  <th className="text-left p-4 text-green-800">Total</th>
                  <th className="text-left p-4 text-green-800">Status</th>
                  <th className="text-left p-4 text-green-800">Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr
                    key={order._id}
                    className="border-b border-green-100 hover:bg-green-50 transition"
                  >
                    <td className="p-4 text-green-800">
                      {order.userId} <br />
                      <span className="text-sm text-green-600">
                        {order.userId?.email || ""}
                      </span>
                    </td>
                    <td className="p-4 text-green-800">
                      {order.items?.map((item) => (
                        <div key={item._id} className="text-sm">
                          {item.productId?.name} x {item.quantity}
                        </div>
                      ))}
                    </td>
                    <td className="p-4 font-semibold text-green-700">
                      ₹{order.totalAmount}
                    </td>
                    <td className="p-4 capitalize text-green-700">
                      {order.Status}
                    </td>
                    <td className="p-4">
                      <select
                        className="border border-green-300 p-2 rounded text-green-800 bg-white focus:ring-2 focus:ring-green-400"
                        defaultValue={order.Status}
                        onChange={(e) =>
                          handleStatusChange(order._id, e.target.value)
                        }
                        disabled={updating}
                      >
                        <option value="pending">Pending</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="text-center font-bold py-6">
          <p
            className="text-lg text-green-700 cursor-pointer hover:underline transition-transform duration-300 hover:scale-105"
            onClick={() => {
              navigate("/admin");
            }}
          >
            Back to Dashboard
          </p>
        </div>
      </div>
    </>
  );
};

export default OrderManage;
