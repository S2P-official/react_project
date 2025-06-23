"use client";
import React, { useState } from "react";
import { Store, User, Mail, Phone, PhoneCall, Landmark, MapPin, Globe, FileText, Image as ImageIcon, Home } from "lucide-react";

type ShopData = {
  ownerName: string;
  email: string;
  contact: string;
  Alternate_number: string;
  gstNumber: string;
  address: string;
  city: string;
  state: string;
  country: string;
  pinCode: string;
  shopName: string;
  shopImage: File | null;
};

const AddShopForm = () => {
  const [shop, setShop] = useState<ShopData>({
    ownerName: "",
    email: "",
    contact: "",
    Alternate_number: "",
    gstNumber: "",
    address: "",
    city: "",
    state: "",
    country: "",
    pinCode: "",
    shopName: "",
    shopImage: null,
  });

  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setShop((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setShop((prev) => ({ ...prev, shopImage: file }));

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Shop Data:", shop);
    alert("Shop added successfully!");

    setShop({
      ownerName: "",
      email: "",
      contact: "",
      Alternate_number: "",
      gstNumber: "",
      address: "",
      city: "",
      state: "",
      country: "",
      pinCode: "",
      shopName: "",
      shopImage: null,
    });
    setPreviewImage(null);
  };

  return (
    <div className="p-6 min-h-screen bg-white">
      <h2 className="text-3xl font-bold text-center text-black mb-8">Add New Shop</h2>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-xl max-w-4xl mx-auto grid gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Shop Name */}
          <div className="md:col-span-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-1">
              <Store size={18} /> Shop Name
            </label>
            <input
              type="text"
              name="shopName"
              value={shop.shopName}
              onChange={handleInputChange}
              required
              className="border p-3 rounded-lg w-full"
            />
          </div>

          {/* Owner Name */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-1">
              <User size={18} /> Owner Name
            </label>
            <input
              type="text"
              name="ownerName"
              value={shop.ownerName}
              onChange={handleInputChange}
              required
              className="border p-3 rounded-lg w-full"
            />
          </div>

          {/* Email */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-1">
              <Mail size={18} /> Email
            </label>
            <input
              type="email"
              name="email"
              value={shop.email}
              onChange={handleInputChange}
              required
              className="border p-3 rounded-lg w-full"
            />
          </div>

          {/* Contact */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-1">
              <Phone size={18} /> Contact
            </label>
            <input
              type="text"
              name="contact"
              value={shop.contact}
              onChange={handleInputChange}
              required
              className="border p-3 rounded-lg w-full"
            />
          </div>

          {/* Alternate Number */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-1">
              <PhoneCall size={18} /> Alternate Number
            </label>
            <input
              type="text"
              name="Alternate_number"
              value={shop.Alternate_number}
              onChange={handleInputChange}
              required
              className="border p-3 rounded-lg w-full"
            />
          </div>

          {/* GST Number */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-1">
              <FileText size={18} /> GST Number
            </label>
            <input
              type="text"
              name="gstNumber"
              value={shop.gstNumber}
              onChange={handleInputChange}
              required
              className="border p-3 rounded-lg w-full"
            />
          </div>

          {/* City */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-1">
              <Landmark size={18} /> City
            </label>
            <input
              type="text"
              name="city"
              value={shop.city}
              onChange={handleInputChange}
              required
              className="border p-3 rounded-lg w-full"
            />
          </div>

          {/* State */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-1">
              <Landmark size={18} /> State
            </label>
            <input
              type="text"
              name="state"
              value={shop.state}
              onChange={handleInputChange}
              required
              className="border p-3 rounded-lg w-full"
            />
          </div>

          {/* Country */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-1">
              <Globe size={18} /> Country
            </label>
            <input
              type="text"
              name="country"
              value={shop.country}
              onChange={handleInputChange}
              required
              className="border p-3 rounded-lg w-full"
            />
          </div>

          {/* Pin Code */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-1">
              <MapPin size={18} /> PIN Code
            </label>
            <input
              type="text"
              name="pinCode"
              value={shop.pinCode}
              onChange={handleInputChange}
              required
              className="border p-3 rounded-lg w-full"
            />
          </div>

          {/* Address */}
          <div className="md:col-span-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-1">
              <Home size={18} /> Address
            </label>
            <textarea
              name="address"
              value={shop.address}
              onChange={handleInputChange}
              required
              rows={3}
              className="border p-3 rounded-lg w-full"
            />
          </div>

        </div>

        {/* Shop Image Upload */}
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-1">
            <ImageIcon size={18} /> Shop Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="border p-3 rounded-lg w-full"
          />
          {previewImage && (
            <img src={previewImage} alt="Shop Preview" className="mt-4 w-40 h-40 object-cover rounded-lg" />
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-gradient-to-r from-orange-500 to-green-500 hover:from-orange-600 hover:to-green-600 text-white font-bold py-3 rounded-lg w-full"
        >
          Add Shop
        </button>

      </form>
    </div>
  );
};

export default AddShopForm;
