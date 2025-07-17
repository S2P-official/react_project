'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const OrderNow = () => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [address, setAddress] = useState<string>("123, Industrial Area, Belgaum, Karnataka");
  const [editingAddress, setEditingAddress] = useState<boolean>(false);
  const [paymentMethod, setPaymentMethod] = useState<string>("UPI");
  const [loadingLocation, setLoadingLocation] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const cartData = localStorage.getItem("cart");
    if (cartData) {
      setItems(JSON.parse(cartData));
    }
  }, []);

  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // ✅ GPS Location + Reverse Geocoding
  const getCurrentLocation = () => {
    setLoadingLocation(true);
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      setLoadingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
          );
          const data = await res.json();
          const fullAddress = data.display_name || "Location found, but address unavailable.";
          setAddress(fullAddress);
        } catch (error) {
          alert("Unable to fetch address from location.");
          console.error("Reverse geocoding error:", error);
        } finally {
          setLoadingLocation(false);
        }
      },
      (error) => {
        alert("Unable to retrieve your location.");
        console.error("Geolocation error:", error);
        setLoadingLocation(false);
      }
    );
  };

  // ✅ Place Order
  const placeOrder = async () => {
    try {
      const response = await fetch("https://www.fictilecore.com/placeOrder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items,
          total,
          date: new Date(),
          status: "Pending",
          address,
          paymentMethod,
        }),
      });

      if (!response.ok) throw new Error("Order failed");

      localStorage.removeItem("cart");
      alert("Order placed successfully!");
      router.push("/homepages/ordersuccess");
    } catch (error) {
      console.error("Order error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow rounded-xl">
      <h2 className="text-2xl font-bold mb-6">Checkout</h2>

      {/* Cart Items */}
      {items.map((item) => (
        <div key={item.id} className="flex justify-between items-center border-b py-3">
          <div>
            <p className="font-semibold">{item.name}</p>
            <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
          </div>
          <p className="text-right">₹{item.price * item.quantity}</p>
        </div>
      ))}

      {/* Total */}
      <div className="mt-6 flex justify-between text-xl font-semibold">
        <span>Total</span>
        <span>₹{total}</span>
      </div>

      {/* Address Section */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-2">Shipping Address</h3>
        {editingAddress ? (
          <textarea
            className="w-full border rounded p-2 text-sm"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        ) : (
          <p className="text-gray-700">{address}</p>
        )}

        <div className="flex items-center mt-2 gap-4">
          <button
            onClick={() => setEditingAddress(!editingAddress)}
            className="text-sm text-blue-600 hover:underline"
          >
            {editingAddress ? "Save Address" : "Change Address"}
          </button>
          <button
            onClick={getCurrentLocation}
            className="text-sm text-green-600 hover:underline"
            disabled={loadingLocation}
          >
            {loadingLocation ? "Getting location..." : "📍 Use My Location"}
          </button>
        </div>
      </div>

      {/* Payment Section */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-2">Select Payment Method</h3>
        <div className="space-y-2">
          {["UPI", "Cash on Delivery", "Debit/Credit Card", "Net Banking"].map((method) => (
            <label key={method} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="payment"
                value={method}
                checked={paymentMethod === method}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <span>{method}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Confirm Button */}
      <button
        onClick={placeOrder}
        className="mt-10 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg text-lg font-semibold"
      >
        Confirm Order
      </button>
    </div>
  );
};

export default OrderNow;
