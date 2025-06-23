import Navbar from "@/app/Components/homePage_Components/Navbar"
import ProductsPage from "./Components/homePage_Components/ProductPage";

// app/page.tsx (Home Page)
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Fictile Core - Home',
  description: 'The ultimate platform for managing your digital tiles and products.',
  keywords: ['fct','FCT','fct shopping','fictile', 'core', 'tiles', 'dashboard', 'ecommerce'],
  authors: [{ name: 'Your Name' }],
  openGraph: {
    title: 'Fictile Core',
    description: 'Manage your tile-based business with Fictile Core.',
    url: 'https://www.fictilecore.com',
    siteName: 'Fictile Core',
    images: [
      {
        url: '/logo_final1.png',
        width: 1200,
        height: 630,
      },
    ],
        locale: 'en_US',
        type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fictile Core',
    description: 'Powerful tools to manage your tile products.',
    images: ['https://yourdomain.com/twitter-card.jpg'],
  },
};

export default function Home() {
  return (
    <>
      <Navbar />
    <ProductsPage/>
    </>
  );
}
