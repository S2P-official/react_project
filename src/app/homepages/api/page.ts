// /pages/api/products.ts
import type { NextApiRequest, NextApiResponse } from "next";

type Product = {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  originalPrice: number;
  category: string;
  isSponsored: boolean;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Product[]>
) {
  const products: Product[] = [
    {
      id: 1,
      name: "Fixderma Shadow Sunscreen SPF 50+",
      description: "Broad Spectrum Sunscreen for sensitive skin",
      imageUrl: "/image.png",
      price: 285,
      originalPrice: 350,
      category: "Featured in Beauty",
      isSponsored: true,
    },
    // Add more products as needed
  ];

  res.status(200).json(products);
}
