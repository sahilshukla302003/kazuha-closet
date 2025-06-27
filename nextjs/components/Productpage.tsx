"use client";
import React, { useState, useEffect } from "react";
import {
  ShoppingCart,
  Star,
  Plus,
  Minus,
  CreditCard,
  Shirt,
  Sparkles,
  Scale3D,
  Ruler,
} from "lucide-react";
import { getProductDetails, addProducttoCart } from "@/utils/api/productUtils";
import Navbar from "./Landingpage/Navbar";
import toast from 'react-hot-toast';

type ProductImage = {
  url: string;
  alt: string;
};

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
  images: ProductImage[];
};

export default function ProductPage() {
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [mainImage, setMainImage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const productId = localStorage.getItem("productid");
      if (productId) {
        try {
          const data = await getProductDetails(productId);
          if (data) {
            setCurrentProduct(data);
            if (data.images && data.images.length > 0) {
              setMainImage(data.images[0].url);
            }
          }
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

  const handleAddToCart = async () => {
    if (!selectedSize) {
      toast.error("Please select a size before adding to cart.");
      return;
    }

    const productId = currentProduct?.id;

    if (!productId) {
      toast.error("User or product data missing.");
      return;
    }

    try {
      const payload = {
        product_id: productId,
        quantity,
        size: selectedSize,
      };

      const res = await addProducttoCart(payload);
      toast.success("Product added to cart!");
      console.log("Cart updated:", res);
    } catch (error) {
      console.error("Failed to add product to cart", error);
      toast.error("Something went wrong while adding to cart.");
    }
  };

  if (!currentProduct) return null;

  const discountPercentage = Math.round(
    ((parseInt(currentProduct.originalPrice) - parseInt(currentProduct.price)) /
      parseInt(currentProduct.originalPrice)) *
      100
  );

  return (
    <main className="relative bg-gradient-to-bl from-black to-neutral-500 min-h-screen text-white">
      <Navbar />
      <div className="pt-[100px] pb-10 px-3 sm:px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Image Section */}
          <div>
            <div className="mx-auto sm:mx-0 w-full sm:w-[550px] h-[500px] border border-white/20 bg-black/40 rounded-2xl overflow-hidden flex items-center justify-center">
              <img
                src={mainImage}
                alt={currentProduct.name}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Thumbnails */}
            <div className="flex flex-wrap gap-x-6 gap-y-4 mt-6 justify-center sm:justify-start">
              {currentProduct.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setMainImage(img.url)}
                  className={`rounded-xl overflow-hidden border transition-all duration-200
                    w-[120px] h-[160px] sm:w-[180px] sm:h-[220px]
                    ${
                      mainImage === img.url
                        ? "border-white scale-105"
                        : "border-white/20 hover:border-white"
                    }`}
                >
                  <img
                    src={img.url}
                    alt={img.alt || `Image ${idx + 1}`}
                    className="w-full h-full object-cover rounded-xl"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Info Section */}
          <div className="space-y-5 text-sm sm:text-base">
            <h1 className="text-xl sm:text-3xl lg:text-4xl font-bold">
              {currentProduct.name}
            </h1>
            <p className="text-gray-400 text-xs sm:text-sm">
              {currentProduct.category}
            </p>

            <div className="flex items-center gap-2">
              <div className="flex">{renderStars(currentProduct.rating)}</div>
              <span className="text-white font-semibold text-xs sm:text-sm">
                {currentProduct.rating}
              </span>
            </div>

            {/* Price Section */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xl sm:text-3xl font-bold text-white">
                ₹{currentProduct.price}
              </span>
              <span className="text-sm sm:text-lg text-gray-400 line-through">
                ₹{currentProduct.originalPrice}
              </span>
              <span className="text-green-400 font-semibold text-xs sm:text-base">
                {discountPercentage}% OFF
              </span>
            </div>

            <p className="text-gray-300 text-xs sm:text-base">
              {currentProduct.description}
            </p>

            {/* Size Selector */}
            <div>
              <h3 className="text-white font-semibold mb-2 text-sm">Select Size</h3>
              <div className="flex gap-2">
                {["S", "M", "L", "XL"].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-xl border transition text-xs sm:text-sm ${
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
              <h3 className="text-white font-semibold mb-2 text-sm">Quantity</h3>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleQuantityChange("decrease")}
                  disabled={quantity <= 1}
                  className="p-2 bg-black/40 rounded-l-xl border border-white/20"
                >
                  <Minus />
                </button>
                <span className="px-4 text-sm">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange("increase")}
                  className="p-2 bg-black/40 rounded-r-xl border border-white/20"
                >
                  <Plus />
                </button>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 w-full">
              <button
                onClick={handleAddToCart}
                className="w-full sm:w-1/2 bg-white text-black font-bold py-2 sm:py-3 rounded-xl hover:scale-105 transition-all shadow-md text-xs sm:text-sm"
              >
                <ShoppingCart className="w-4 h-4 inline mr-2" />
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                className="w-full sm:w-1/2 bg-purple-600 text-white font-bold py-2 sm:py-3 rounded-xl hover:scale-105 transition-all shadow-md text-xs sm:text-sm"
              >
                <CreditCard className="w-4 h-4 inline mr-2" />
                Buy Now
              </button>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-4">
              {currentProduct.tags.map((tag, i) => (
                <span
                  key={i}
                  className="text-xs sm:text-sm bg-white/10 border border-white/20 px-3 py-1 rounded-full hover:bg-white/20 transition"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Feature Icons */}
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-4 rounded-xl flex flex-col items-center text-center">
                <Sparkles className="w-6 h-6 mb-2 text-purple-400" />
                <p className="text-sm font-semibold">Durable Print</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-4 rounded-xl flex flex-col items-center text-center">
                <Shirt className="w-6 h-6 mb-2 text-blue-400" />
                <p className="text-sm font-semibold">Soft Cotton</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-4 rounded-xl flex flex-col items-center text-center">
                <Scale3D className="w-6 h-6 mb-2 text-green-400" />
                <p className="text-sm font-semibold">Unisex Fit</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-4 rounded-xl flex flex-col items-center text-center">
                <Ruler className="w-6 h-6 mb-2 text-yellow-400" />
                <p className="text-sm font-semibold">210 GSM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Description */}
        <div className="mt-12 bg-black/30 backdrop-blur-md p-6 rounded-2xl border border-white/20">
          <h2 className="text-lg sm:text-xl font-bold mb-2">Detailed Description</h2>
          <p className="text-gray-300 text-xs sm:text-base leading-relaxed">
            {currentProduct.detailedDescription}
          </p>
        </div>
      </div>
    </main>
  );
}
