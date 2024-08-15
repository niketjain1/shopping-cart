"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Product } from "../types";
import ProductCard from "@/components/ProductCard";

export default function Home() {
  // state to manage product data
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetching data for the page
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get<Product[]>(
          "https://fakestoreapi.com/products?limit=10" 
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Product Listing</h1>
      {isLoading ? (
        <div className="flex min-w-full min-h-full h-full items-center justify-center lg:mt-72">
          <div className="loader" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      )}
    </>
  );
}
