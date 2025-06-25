"use client";

import React, { useEffect, useState } from "react";
import Navbar from "./Landingpage/Navbar";
import { getUserCart, getProductDetails } from "@/utils/api/productUtils";

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
  images: { url: string; alt: string }[];
};

type CartItem = Product & {
  quantity: number;
  size: string;
};

export default function CartPage() {
  const [cartProducts, setCartProducts] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCartData = async () => {
      const userId = localStorage.getItem("userid");
      if (!userId) return;

      try {
        const cartData = await getUserCart(userId);
        const cart = cartData.cart;

        const cartItems = await Promise.all(
          Object.entries(cart).map(async ([productId, value]) => {
            const [quantity, size] = value as [number, string];
            const product = await getProductDetails(productId);
            return {
              ...product,
              quantity,
              size,
            };
          })
        );
        setCartProducts(cartItems);
      } catch (error) {
        console.error("Failed to fetch cart products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCartData();
  }, []);

  const cleanPrice = (price: string) => parseFloat(price.replace(/[^0-9.]/g, ""));

  const total = cartProducts.reduce((acc, item) => {
    const price = cleanPrice(item.price);
    const qty = item.quantity || 0;
    return acc + price * qty;
  }, 0);

  return (
    <main className="bg-black text-white min-h-screen px-4 py-6">
      <Navbar />

      <div className="max-w-5xl mx-auto w-full">
        {loading ? (
          <p className="text-white mt-32 text-center">Loading...</p>
        ) : cartProducts.length === 0 ? (
          <div className="flex flex-col items-center text-center mt-32">
            <div className="w-40 h-40">
              <img
                src="/videos/emptycart.gif"
                alt="Empty Cart"
                className="rounded-xl shadow-xl w-full h-full object-contain"
              />
            </div>
            <h1 className="text-2xl font-bold mt-6">
              Your Cart is Feeling Lonely
            </h1>
            <p className="text-gray-400 text-base mt-2 max-w-sm">
              Looks like you haven’t added anything yet. Start shopping and let
              the magic begin!
            </p>
          </div>
        ) : (
          <>
            <h1 className="text-4xl font-bold text-white mb-10 text-center">YOUR CART</h1>

           {cartProducts.map((item) => (
                                          <div
                                            key={item.id}
                                            className="bg-[#1e1e1e] rounded-xl mb-6 p-4 flex flex-col md:flex-row md:items-center shadow-lg"
                                          >
                                            {/* Image */}
                                            <div className="flex-shrink-0 w-full md:w-1/3 flex justify-center mb-4 md:mb-0">
                                              <img
                                                src={item.images[0]?.url || "/fallback.jpg"}
                                                alt={item.name}
                                                className="rounded-lg object-cover w-52 h-52"
                                              />
                                            </div>

                                            {/* Details */}
                                            <div className="flex-1 text-left md:ml-6 space-y-1">
                                              <h2 className="text-2xl font-semibold">{item.name}</h2>
                                              <p className="text-gray-400 text-sm italic truncate max-w-md">
                                                {item.description || "No description available."}
                                              </p>
                                              <p className="text-gray-300 text-sm">Price: ₹{cleanPrice(item.price)}</p>
                                              <p className="text-gray-300 text-sm">Quantity: {item.quantity}</p>
                                              <p className="text-gray-300 text-sm">Size: {item.size}</p>
                                              <p className="text-white font-semibold">
                                                Subtotal: ₹{cleanPrice(item.price) * item.quantity}
                                              </p>
                                              <button className="mt-2 bg-white text-black font-semibold px-4 py-1 rounded hover:bg-gray-200">
                                                Buy Now
                                              </button>
                                            </div>
                                          </div>
                                        ))}


            <div className="bg-[#1e1e1e] mt-10 p-6 rounded-xl flex flex-col md:flex-row justify-between items-center shadow-inner">
              <h3 className="text-2xl font-bold text-white mb-4 md:mb-0">
                Total: <span className="text-yellow-400">₹{total}</span>
              </h3>
              <button className="bg-yellow-400 text-black font-bold px-6 py-3 rounded-xl hover:bg-yellow-500 transition">
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
