"use client";
import React, { useState } from "react";
import { ChevronDown, ChevronUp, Store, Box, MapPin, Download } from "lucide-react";

type Material = {
  id: number;
  name: string;
  quantityNumber: number;
  quantityUnit: string;
};

type Shop = {
  id: number;
  name: string;
  state: string;
  city: string;
  materials: Material[];
};

const shopsData: Shop[] = [
  {
    id: 1,
    name: "Krishna General Store",
    state: "Karnataka",
    city: "Belgaum",
    materials: [
      { id: 1, name: "Rice", quantityNumber: 50, quantityUnit: "kg" },
      { id: 2, name: "Wheat", quantityNumber: 30, quantityUnit: "kg" },
    ],
  },
  {
    id: 2,
    name: "Mahadev Electronics",
    state: "Maharashtra",
    city: "Pune",
    materials: [
      { id: 1, name: "TV", quantityNumber: 5, quantityUnit: "units" },
      { id: 2, name: "Washing Machine", quantityNumber: 3, quantityUnit: "units" },
    ],
  },
  {
    id: 3,
    name: "Bharat Medicals",
    state: "Karnataka",
    city: "Hubli",
    materials: [
      { id: 1, name: "Paracetamol", quantityNumber: 200, quantityUnit: "strips" },
      { id: 2, name: "Syrup", quantityNumber: 100, quantityUnit: "bottles" },
    ],
  },
  {
    id: 4,
    name: "Rajesh Traders",
    state: "Maharashtra",
    city: "Mumbai",
    materials: [
      { id: 1, name: "Cement", quantityNumber: 100, quantityUnit: "bags" },
      { id: 2, name: "Sand", quantityNumber: 500, quantityUnit: "kg" },
    ],
  },
];

const ShopList = () => {
  const [expandedShopId, setExpandedShopId] = useState<number | null>(null);
  const [selectedState, setSelectedState] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");

  const uniqueStates = Array.from(new Set(shopsData.map((shop) => shop.state)));
  const citiesForSelectedState = selectedState
    ? Array.from(new Set(shopsData.filter((shop) => shop.state === selectedState).map((shop) => shop.city)))
    : [];

  const filteredShops = shopsData.filter((shop) => {
    if (!selectedState) return true;
    if (selectedState && !selectedCity) return shop.state === selectedState;
    if (selectedState && selectedCity) return shop.state === selectedState && shop.city === selectedCity;
  });

  const toggleShop = (id: number) => {
    setExpandedShopId((prevId) => (prevId === id ? null : id));
  };

  const downloadCSV = (shop: Shop) => {
    let csvContent = "Shop Name,State,City,Material Name,Quantity,Unit\n";
    shop.materials.forEach((material) => {
      csvContent += `${shop.name},${shop.state},${shop.city},${material.name},${material.quantityNumber},${material.quantityUnit}\n`;
    });

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.setAttribute("download", `${shop.name}_materials.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-6 min-h-screen bg-white">
      <h2 className="text-3xl font-bold text-center text-green-700 mb-8">
        Shop List
      </h2>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 justify-center mb-8">
        {/* State Filter */}
        <select
          value={selectedState}
          onChange={(e) => {
            setSelectedState(e.target.value);
            setSelectedCity("");
          }}
          className="border rounded-lg p-3"
        >
          <option value="">-- Select State --</option>
          {uniqueStates.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>

        {/* City Filter */}
        {selectedState && (
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="border rounded-lg p-3"
          >
            <option value="">-- Select City --</option>
            {citiesForSelectedState.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* Shop List */}
      <div className="max-w-3xl mx-auto space-y-6">
        {filteredShops.length === 0 ? (
          <div className="text-center text-gray-500">No shops found for the selected location.</div>
        ) : (
          filteredShops.map((shop) => (
            <div key={shop.id} className="bg-white p-6 border rounded-lg shadow-sm">
              <div
                onClick={() => toggleShop(shop.id)}
                className="flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <Store size={24} className="text-orange-500" />
                  <div>
                    <h3 className="text-lg font-semibold">{shop.name}</h3>
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      <MapPin size={12} /> {shop.city}, {shop.state}
                    </p>
                  </div>
                </div>
                {expandedShopId === shop.id ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
              </div>

              {/* Expanded Section */}
              {expandedShopId === shop.id && (
                <div className="mt-4">
                  <p className="text-gray-600 mb-2">Total Materials: {shop.materials.length}</p>
                  <ul className="space-y-3 mb-4">
                    {shop.materials.map((material) => (
                      <li
                        key={material.id}
                        className="flex items-center justify-between border-b pb-2 text-gray-800"
                      >
                        <div className="flex items-center gap-2">
                          <Box size={20} className="text-blue-500" />
                          <span className="font-medium">{material.name}</span>
                        </div>
                        <span className="text-sm text-gray-600">
                          {material.quantityNumber} {material.quantityUnit}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Download Button always shown */}
                  <button
                    onClick={() => downloadCSV(shop)}
                    className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg"
                  >
                    <Download size={18} />
                    Download Shop CSV
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ShopList;
