import Image from "next/image";

export default function ProductCard() {
  return (
    <div className="max-w-sm rounded-2xl shadow-md p-4 border border-gray-200">
      <p className="text-sm font-semibold text-gray-700 mb-1">Featured in Beauty</p>
      <p className="text-xs text-gray-500 mb-4">Sponsored</p>
      <div className="flex justify-center mb-4">
        <Image
          src="/image.png" // Make sure to save the image in the public folder
          alt="Fixderma Shadow Sunscreen"
          width={150}
          height={150}
          className="rounded"
        />
      </div>
      <h3 className="text-base font-semibold mb-2">
        Fixderma Shadow Sunscreen SPF 50+ PA+++ Gel Broad Spectrum Sunscreen F...
      </h3>
      <div className="mb-2">
        <span className="text-lg font-bold text-green-600">₹285.00</span>{" "}
        <span className="text-sm line-through text-gray-500">₹350.00</span>
      </div>
      <a
        href="#"
        className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition"
      >
        Shop now
      </a>
    </div>
  );
}
