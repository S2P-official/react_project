"use client";
import React, { useState, useEffect } from "react";

// Define the Order type
type Order = {
  id: number;
  productName: string;
  category: "Toy" | "Home Appliance";
  quantity: number;
  orderDate: string;
  deliveryDate?: string;
  status: "Pending" | "Packed" | "Shipped" | "Out for Delivery" | "Delivered";
};

const OrderList = () => {
  const [orders, setOrders] = useState<Order[]>([]); // Typing orders array
  const [editingOrderId, setEditingOrderId] = useState<number | null>(null);
  const [newStatus, setNewStatus] = useState<string>(""); // Status should be a string

  useEffect(() => {
    // Simulated fetch - replace with real API later
    const dummyOrders: Order[] = [
      {
        id: 1,
        productName: "Remote Control Car",
        category: "Toy",
        quantity: 2,
        orderDate: "2025-04-14",
        deliveryDate: "2025-04-18",
        status: "Pending",
      },
      {
        id: 2,
        productName: "Kids Puzzle Set",
        category: "Toy",
        quantity: 1,
        orderDate: "2025-04-10",
        deliveryDate: "2025-04-15",
        status: "Shipped",
      },
      {
        id: 3,
        productName: "Microwave Oven",
        category: "Home Appliance",
        quantity: 1,
        orderDate: "2025-04-12",
        deliveryDate: "2025-04-16",
        status: "Pending",
      },
      {
        id: 4,
        productName: "Vacuum Cleaner",
        category: "Home Appliance",
        quantity: 1,
        orderDate: "2025-04-11",
        deliveryDate: "2025-04-17",
        status: "Delivered",
      },
    ];

    setOrders(dummyOrders); // Set dummy orders as initial data
  }, []);

  const handleStatusChange = (orderId: number, status: string) => {
    // Safely update the order's status with the correct type
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: status as "Packed" | "Shipped" | "Out for Delivery" | "Delivered" | "Pending" } : order
      )
    );
    setEditingOrderId(null); // Close the dropdown after selection
  };

  const statusOptions: ("Packed" | "Shipped" | "Out for Delivery" | "Delivered")[] = [
    "Packed",
    "Shipped",
    "Out for Delivery",
    "Delivered",
  ];

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Open Orders</h2>

      {["Toy", "Home Appliance"].map((category) => (
        <div key={category} className="mb-8">
          <h3 className="text-xl font-semibold text-blue-700 mb-2">
            {category} Orders
          </h3>
          <div className="bg-white shadow-md rounded-xl overflow-hidden">
            <table className="w-full table-auto text-sm text-left">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="p-3">Product</th>
                  <th className="p-3">Quantity</th>
                  <th className="p-3">Order Date</th>
                  <th className="p-3">Delivery Date</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders
                  .filter((order) => order.category === category)
                  .map((order) => (
                    <tr
                      key={order.id}
                      className="border-b hover:bg-gray-50 cursor-pointer"
                      onClick={() => {
                        setEditingOrderId(order.id);
                        setNewStatus(order.status); // Set initial status when clicked
                      }}
                    >
                      <td className="p-3">{order.productName}</td>
                      <td className="p-3">{order.quantity}</td>
                      <td className="p-3">{order.orderDate}</td>
                      <td className="p-3">{order.deliveryDate || "N/A"}</td>
                      <td className="p-3">
                        {editingOrderId === order.id ? (
                          <select
                            value={newStatus || order.status}
                            onChange={(e) => setNewStatus(e.target.value)}
                            className="border border-gray-300 rounded-lg p-1"
                          >
                            <option value="">Select Status</option>
                            {statusOptions.map((status) => (
                              <option key={status} value={status}>
                                {status}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              order.status === "Pending"
                                ? "bg-yellow-200 text-yellow-800"
                                : order.status === "Shipped"
                                ? "bg-blue-200 text-blue-800"
                                : order.status === "Out for Delivery"
                                ? "bg-green-200 text-green-800"
                                : order.status === "Delivered"
                                ? "bg-gray-200 text-gray-800"
                                : "bg-yellow-200 text-yellow-800"
                            }`}
                          >
                            {order.status}
                          </span>
                        )}
                        {editingOrderId === order.id && (
                          <button
                            onClick={() => handleStatusChange(order.id, newStatus || order.status)}
                            className="ml-2 py-1 px-3 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600"
                          >
                            Update
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderList;
