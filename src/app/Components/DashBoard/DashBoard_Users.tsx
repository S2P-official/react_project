import React from "react";

interface CustomerOrder {
  id: number;
  name: string;
  email: string;
  phone: string;
  purchasedDate: string;
  deliveryDate: string;
  status: "Pending" | "Shipped" | "Delivered" | "Cancelled";
  total: number;
}

const orders: CustomerOrder[] = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@example.com",
    phone: "+91 9876543210",
    purchasedDate: "2025-04-10",
    deliveryDate: "2025-04-14",
    status: "Delivered",
    total: 2499,
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob@example.com",
    phone: "+91 9123456789",
    purchasedDate: "2025-04-11",
    deliveryDate: "2025-04-16",
    status: "Shipped",
    total: 1799,
  },
  {
    id: 3,
    name: "Charlie Brown",
    email: "charlie@example.com",
    phone: "+91 9988776655",
    purchasedDate: "2025-04-12",
    deliveryDate: "2025-04-17",
    status: "Pending",
    total: 3200,
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Delivered":
      return "bg-green-100 text-green-700";
    case "Shipped":
      return "bg-blue-100 text-blue-700";
    case "Pending":
      return "bg-yellow-100 text-yellow-700";
    case "Cancelled":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

const CustomerOrders = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Customer Orders Monitoring
      </h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-xl overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-6 py-3 text-sm font-semibold text-gray-700">Customer</th>
              <th className="text-left px-6 py-3 text-sm font-semibold text-gray-700">Email</th>
              <th className="text-left px-6 py-3 text-sm font-semibold text-gray-700">Phone</th>
              <th className="text-left px-6 py-3 text-sm font-semibold text-gray-700">Purchased</th>
              <th className="text-left px-6 py-3 text-sm font-semibold text-gray-700">Delivery</th>
              <th className="text-left px-6 py-3 text-sm font-semibold text-gray-700">Status</th>
              <th className="text-left px-6 py-3 text-sm font-semibold text-gray-700">Total</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b last:border-none hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-800">{order.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{order.email}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{order.phone}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{order.purchasedDate}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{order.deliveryDate}</td>
                <td className="px-6 py-4 text-sm">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm font-semibold text-gray-800">₹{order.total.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerOrders;
