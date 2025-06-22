"use client";
import React, { useState, useEffect } from "react";
import {
  ShoppingCart,
  Star,
  Plus,
  Minus,
  CreditCard,
} from "lucide-react";
import { getProductDetails } from "@/utils/api/productUtils";
import Navbar from "./Landingpage/Navbar";

type Product = {
  id: string;
  name: string;
  price: string;
  originalPrice: string;
  description: string;
  detailedDescription: string;
  category: string;
  rating: number;
  tags: string[];
  sizes: string[];
  features: string[];
  specifications: { [key: string]: string };
};

export default function ProductPage() {
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const productId = localStorage.getItem("productid");

      if (productId) {
        try {
          const data = await getProductDetails(productId);
          if (data) setCurrentProduct(data);
        } catch (error) {
          console.error("Error fetching product data:", error);
        }
      }
    };
    fetchData();
  }, []);

  const renderStars = (rating: number) =>
    Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating) ? "fill-white text-white" : "text-gray-400"
        }`}
      />
    ));

  const handleQuantityChange = (type: "increase" | "decrease") => {
    if (type === "increase") setQuantity((prev) => prev + 1);
    else if (type === "decrease" && quantity > 1) setQuantity((prev) => prev - 1);
  };

  const handleBuyNow = () => {
    console.log("Proceeding to Buy Now", { product: currentProduct, quantity });
  };

  if (!currentProduct) return null;

  const discountPercentage = Math.round(
    ((parseInt(currentProduct.originalPrice) - parseInt(currentProduct.price)) /
      parseInt(currentProduct.originalPrice)) *
      100
  );

  return (
    <main className="relative bg-gradient-to-bl from-[#000000] to-[#a3a3a3] min-h-screen text-white">
      <Navbar/>

      <div className="pt-20 pb-8 px-3 sm:px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Image */}
          <div>
            <div className="rounded-2xl overflow-hidden border border-white/20 bg-black/40 backdrop-blur-md">
              <img
                src="/static-placeholder.jpg"
                alt={currentProduct.name}
                className="w-full h-80 sm:h-[500px] object-cover rounded-2xl"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">{currentProduct.name}</h1>
            <p className="text-gray-400 text-sm sm:text-base">{currentProduct.category}</p>

            <div className="flex items-center gap-2">
              <div className="flex">{renderStars(currentProduct.rating)}</div>
              <span className="text-white font-semibold text-sm sm:text-base">
                {currentProduct.rating}
              </span>
            </div>

            {/* Price */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-2xl sm:text-3xl font-bold text-white">
                ₹{currentProduct.price}
              </span>
              <span className="text-base sm:text-lg text-gray-400 line-through">
                ₹{currentProduct.originalPrice}
              </span>
              <span className="text-green-400 font-semibold text-sm sm:text-base">
                {discountPercentage}% OFF
              </span>
            </div>

            {/* Description */}
            <p className="text-gray-300 text-sm sm:text-base">{currentProduct.description}</p>

            {/* Size Selector */}
            <div>
              <h3 className="text-white font-semibold mb-2 text-sm sm:text-base">Select Size</h3>
              <div className="flex gap-2">
                {["S", "M", "L", "XL"].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-xl border transition ${
                      selectedSize === size
                        ? "bg-white text-black font-bold"
                        : "border-white/30 text-white hover:bg-white/10"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div>
              <h3 className="text-white font-semibold mb-2 text-sm sm:text-base">Quantity</h3>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleQuantityChange("decrease")}
                  disabled={quantity <= 1}
                  className="p-2 bg-black/40 rounded-l-xl border border-white/20"
                >
                  <Minus />
                </button>
                <span className="px-4">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange("increase")}
                  className="p-2 bg-black/40 rounded-r-xl border border-white/20"
                >
                  <Plus />
                </button>
              </div>    
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 w-full">
              <button className="w-full sm:w-1/2 bg-white text-black font-bold py-3 rounded-xl hover:scale-105 transition-all shadow-md">
                <ShoppingCart className="w-5 h-5 inline mr-2" />
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                className="w-full sm:w-1/2 bg-purple-600 text-white font-bold py-3 rounded-xl hover:scale-105 transition-all shadow-md"
              >
                <CreditCard className="w-5 h-5 inline mr-2" />
                Buy Now
              </button>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-4">
              {currentProduct.tags.map((tag, i) => (
                <span
                  key={i}
                  className="text-sm bg-white/10 border border-white/20 px-3 py-1 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Detailed Description */}
        <div className="mt-12 bg-black/30 backdrop-blur-md p-6 rounded-2xl border border-white/20">
          <h2 className="text-xl font-bold mb-2">Detailed Description</h2>
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
            {currentProduct.detailedDescription}
          </p>
        </div>
      </div>
    </main>
  );
}
