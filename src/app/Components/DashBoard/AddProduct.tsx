"use client";

import { useState } from "react";

const AddToyProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    quantity: "",
    imageUrl: "",
    ageGroup: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://143.244.142.60:8080/addProduct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
          quantity: parseInt(formData.quantity),
        }),
      });

      if (response.ok) {
        alert("Toy product added successfully!");
        setFormData({
          name: "",
          description: "",
          category: "",
          price: "",
          quantity: "",
          imageUrl: "",
          ageGroup: "",
        });
      } else {
        alert("Failed to add toy product.");
      }
    } catch (error) {
      console.error("Error submitting toy product:", error);
      alert("An error occurred while submitting the form.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-10">
      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Add Toy Product</h2>
        <form onSubmit={handleSubmit} className="space-y-4">


           {/* Toy Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Toy Name</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-xl"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              rows={3}
              value={formData.description}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-xl"
            ></textarea>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select
              name="category"
              required
              value={formData.category}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-xl"
            >
              <option value="">Select Category</option>
              <option value="Soft Toy">Soft Toy</option>
              <option value="Puzzle">Puzzle</option>
              <option value="Educational">Educational</option>
              <option value="Remote Controlled">Remote Controlled</option>
            </select>
          </div>

          {/* Price & Quantity */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Price (₹)</label>
              <input
                type="number"
                name="price"
                required
                value={formData.price}
                onChange={handleChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded-xl"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Quantity</label>
              <input
                type="number"
                name="quantity"
                required
                value={formData.quantity}
                onChange={handleChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded-xl"
              />
            </div>
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Image URL</label>
            <input
              type="text"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-xl"
            />
          </div>

          {/* Age Group */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Age Group</label>
            <select
              name="ageGroup"
              required
              value={formData.ageGroup}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-xl"
            >
              <option value="">Select Age Group</option>
              <option value="0-2">0–2 years</option>
              <option value="3-5">3–5 years</option>
              <option value="6-8">6–8 years</option>
              <option value="9+">9+ years</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition"
          >
            Add Toy Product
          </button>
          {/* All your input fields remain unchanged here */}
          {/* Paste your original input and label JSX here */}
          {/* ... */}
        </form>
      </div>
    </div>
  );
};

export default AddToyProduct;




