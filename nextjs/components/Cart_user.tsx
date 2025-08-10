"use client";

import React, { useEffect, useState } from "react";
import Navbar from "./Landingpage/Navbar";
import { useRouter } from "next/navigation";
import {
  getUserCart,
  getProductDetails,
  removeFromCart,
} from "@/utils/api/productUtils";

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
  const router = useRouter();
  const [cartProducts, setCartProducts] = useState<CartItem[]>([]);

  useEffect(() => {
    const fetchCartData = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const cartData = await getUserCart();
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
      }
    };
    fetchCartData();
  }, []);

  const cleanPrice = (price: string) =>
    parseFloat(price.replace(/[^0-9.]/g, ""));

  const total = cartProducts.reduce((acc, item) => {
    const price = cleanPrice(item.price);
    const qty = item.quantity || 0;
    return acc + price * qty;
  }, 0);

  const handleRemoveItem = async (productId: string) => {
    // Optimistic UI update
    setCartProducts((prev) => prev.filter((item) => item.id !== productId));

    try {
      await removeFromCart(productId);
      console.log(`Item ${productId} removed from backend cart`);
    } catch (error) {
      console.error("Failed to remove item from backend cart:", error);
    }

    // Optional localStorage sync (if you're using it somewhere else)
    const updatedCart = JSON.parse(localStorage.getItem("cart") || "{}");
    delete updatedCart[productId];
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <main className="bg-black text-white min-h-screen px-4 py-6">
      <Navbar />

      <div className="max-w-5xl mx-auto w-full">
        {cartProducts.length === 0 ? (
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
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-10 text-center">
              YOUR CART
            </h1>

            {cartProducts.map((item) => (
              <div
                key={item.id}
                className="bg-[#1e1e1e] rounded-xl mb-6 p-3 flex flex-row items-start gap-3 shadow-lg"
              >
                {/* Image */}
                <div className="flex-shrink-0 w-28 h-28 sm:w-40 sm:h-40 md:w-52 md:h-52 flex justify-center items-center">
                  <img
                    src={item.images[0]?.url || "/fallback.jpg"}
                    alt={item.name}
                    className="rounded-lg object-cover w-full h-full"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 space-y-1">
                  <h2 className="text-base sm:text-lg md:text-2xl font-semibold">
                    {item.name}
                  </h2>

                  <p className="hidden sm:block text-gray-400 text-sm italic truncate max-w-[240px]">
                    {item.description || "No description available."}
                  </p>

                  <p className="text-gray-300 text-xs sm:text-sm md:text-base">
                    Price: ₹{cleanPrice(item.price)}
                  </p>
                  <p className="text-gray-300 text-xs sm:text-sm md:text-base">
                    Quantity: {item.quantity}
                  </p>
                  <p className="text-gray-300 text-xs sm:text-sm md:text-base">
                    Size: {item.size}
                  </p>
                  <p className="text-white font-semibold text-sm sm:text-base">
                    Subtotal: ₹{cleanPrice(item.price) * item.quantity}
                  </p>

                  {/* Buttons */}
                  <div className="mt-2 flex gap-2 flex-wrap">
                      <button
                          onClick={() => {
                            const productToBuy = {
                              ...item,
                              quantity: item.quantity,
                              size: item.size,
                            };
                            localStorage.setItem("checkoutItems", JSON.stringify([productToBuy]));
                            // no need to use ?buyNow anymore
                            router.push("/order-summary");
                          }}
                          className="bg-white text-black text-xs sm:text-sm font-semibold px-2 sm:px-3 py-1 rounded hover:bg-gray-200"
                        >
                          Buy Now
                        </button>

                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="bg-red-600 text-white text-xs sm:text-sm font-semibold px-2 sm:px-3 py-1 rounded hover:bg-red-700"
                      >
                        Remove
                      </button>
                    </div>
                </div>
              </div>
            ))}

            <div className="bg-[#1e1e1e] mt-10 p-6 rounded-xl flex flex-col md:flex-row justify-between items-center shadow-inner">
              <h3 className="text-lg sm:text-2xl font-bold text-white mb-4 md:mb-0">
                Total: <span className="text-yellow-400">₹{total}</span>
              </h3>

              <button
                onClick={() => {
                  localStorage.setItem("checkoutItems", JSON.stringify(cartProducts));
                  router.push("/order-summary");
                }}
                className="bg-yellow-400 text-black font-bold px-4 sm:px-6 py-2 sm:py-3 rounded-xl hover:bg-yellow-500 transition text-xs sm:text-base"
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
