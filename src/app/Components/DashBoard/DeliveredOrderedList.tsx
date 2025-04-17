"use client";
import React, { useState, useEffect } from "react";

// Define the Order type
type Order = {
  id: number;
  productName: string;
  category: "Toy" | "Home Appliance";
  quantity: number;
  orderDate: string;   // Assuming ISO string "2025-04-14"
  deliveryDate?: string;
  status: "Pending" | "Packed" | "Shipped" | "Out for Delivery" | "Delivered";
};

const DeliveredOrdersList = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filterType, setFilterType] = useState<'all' | 'lastWeek' | 'custom'>('all');
  const [customStartDate, setCustomStartDate] = useState<string>('');
  const [customEndDate, setCustomEndDate] = useState<string>('');

  useEffect(() => {
    const dummyOrders: Order[] = [
      {
        id: 1,
        productName: "Remote Control Car",
        category: "Toy",
        quantity: 2,
        orderDate: "2025-04-14T10:00:00", // Include time
        deliveryDate: "2025-04-18T12:00:00",
        status: "Delivered",
      },
      {
        id: 2,
        productName: "Kids Puzzle Set",
        category: "Toy",
        quantity: 1,
        orderDate: "2025-04-10T08:30:00",
        deliveryDate: "2025-04-15T09:00:00",
        status: "Shipped",
      },
      {
        id: 3,
        productName: "Microwave Oven",
        category: "Home Appliance",
        quantity: 1,
        orderDate: "2025-04-12T15:00:00",
        deliveryDate: "2025-04-16T16:00:00",
        status: "Delivered",
      },
      {
        id: 4,
        productName: "Vacuum Cleaner",
        category: "Home Appliance",
        quantity: 1,
        orderDate: "2025-04-11T13:00:00",
        deliveryDate: "2025-04-17T17:00:00",
        status: "Delivered",
      },
    ];

    setOrders(dummyOrders);
  }, []);

  const deliveredOrders = orders.filter((order) => order.status === "Delivered");

  const getFilteredOrders = () => {
    if (filterType === 'all') return deliveredOrders;

    const now = new Date();
    if (filterType === 'lastWeek') {
      const lastWeek = new Date();
      lastWeek.setDate(now.getDate() - 7);

      return deliveredOrders.filter((order) => {
        const delivery = new Date(order.deliveryDate || '');
        return delivery >= lastWeek && delivery <= now;
      });
    }

    if (filterType === 'custom' && customStartDate && customEndDate) {
      const start = new Date(customStartDate);
      const end = new Date(customEndDate);

      return deliveredOrders.filter((order) => {
        const delivery = new Date(order.deliveryDate || '');
        return delivery >= start && delivery <= end;
      });
    }

    return deliveredOrders;
  };

  const filteredOrders = getFilteredOrders();

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Delivered Orders</h2>

      {/* Filter Section */}
      <div className="mb-6 flex flex-wrap items-center gap-4">
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value as 'all' | 'lastWeek' | 'custom')}
          className="border rounded-lg px-3 py-2 text-sm"
        >
          <option value="all">All</option>
          <option value="lastWeek">Last Week</option>
          <option value="custom">Custom Date</option>
        </select>

        {filterType === 'custom' && (
          <div className="flex flex-wrap gap-2">
            <input
              type="datetime-local"
              value={customStartDate}
              onChange={(e) => setCustomStartDate(e.target.value)}
              className="border rounded-lg px-3 py-2 text-sm"
            />
            <input
              type="datetime-local"
              value={customEndDate}
              onChange={(e) => setCustomEndDate(e.target.value)}
              className="border rounded-lg px-3 py-2 text-sm"
            />
          </div>
        )}
      </div>

      {/* Table Section */}
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
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center p-3">
                  No delivered orders available.
                </td>
              </tr>
            ) : (
              filteredOrders.map((order) => (
                <tr key={order.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{order.productName}</td>
                  <td className="p-3">{order.quantity}</td>
                  <td className="p-3">{new Date(order.orderDate).toLocaleString()}</td>
                  <td className="p-3">{order.deliveryDate ? new Date(order.deliveryDate).toLocaleString() : "N/A"}</td>
                  <td className="p-3">
                    <span className="px-2 py-1 rounded-full text-xs font-semibold bg-gray-200 text-gray-800">
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DeliveredOrdersList;
