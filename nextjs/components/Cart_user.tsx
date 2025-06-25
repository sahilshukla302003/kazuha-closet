"use client";

import React from "react";
import Navbar from "./Landingpage/Navbar";
import { Poppins } from "next/font/google";
import Image from "next/image";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  size: string;
  frontImage: string;
  backImage: string;
};

export default function CartPage() {
  const cartItems: CartItem[] = [
    {
      id: 1,
      name: "Naruto T-Shirt",
      price: 599,
      quantity: 2,
      size: "L",
      frontImage: "/Productimage/Naruto/front.png",
      backImage: "/Productimage/Naruto/back.png",
    },
  ];

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <main className="bg-gradient-to-br from-[#121212] to-black text-white min-h-screen px-4 py-6 flex flex-col items-center">
      <Navbar />

      <div className={`${poppins.className} w-full max-w-6xl`}>
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center text-center mt-32">
            <div className="relative w-40 h-40">
              <Image
                src="/videos/emptycart.gif"
                alt="Empty Cart"
                layout="fill"
                objectFit="contain"
                className="rounded-xl shadow-xl"
                priority
              />
            </div>
            <h1 className="text-2xl font-bold mt-6 drop-shadow">
              Your Cart is Feeling Lonely
            </h1>
            <p className="text-gray-400 text-base mt-2 max-w-sm">
              Looks like you haven’t added anything yet. Start shopping and let
              the magic begin!
            </p>
          </div>
        ) : (
          <div className="mt-10 space-y-8">
            <h1 className="text-3xl md:text-5xl font-bold text-center drop-shadow-md">
              YOUR CART
            </h1>

            {cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-4 md:p-6 shadow-xl flex flex-row items-center gap-4 transition transform hover:-translate-y-1 hover:shadow-2xl border border-white/10"
              >
                {/* Images */}
                <div className="flex gap-2 md:gap-4 shrink-0">
                  <div className="w-[100px] h-[100px] sm:w-[200px] sm:h-[200px] md:w-[250px] md:h-[300px] bg-gray-300 rounded-xl overflow-hidden relative shadow-md">
                    <Image
                      src={item.frontImage}
                      alt="Front"
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <div className="w-[100px] h-[100px] sm:w-[200px] sm:h-[200px] md:w-[250px] md:h-[300px] bg-gray-300 rounded-xl overflow-hidden relative shadow-md">
                    <Image
                      src={item.backImage}
                      alt="Back"
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                </div>

                {/* Product Details */}
                <div className="flex-1 min-w-0 text-left px-1 sm:px-2 md:px-4">
                  <h2 className="text-sm sm:text-base md:text-2xl font-bold text-white">
                    {item.name}
                  </h2>
                  <p className="text-xs sm:text-sm md:text-lg text-gray-300">
                    <span className="font-semibold text-white">Price:</span> ₹{item.price}
                  </p>
                  <p className="text-xs sm:text-sm md:text-lg text-gray-300">
                    <span className="font-semibold text-white">Quantity:</span> {item.quantity}
                  </p>
                  <p className="text-xs sm:text-sm md:text-lg text-gray-300">
                    <span className="font-semibold text-white">Size:</span> {item.size}
                  </p>
                </div>
              </div>
            ))}

            {/* Total & Checkout */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 md:p-6 shadow-lg mt-6 flex flex-col md:flex-row items-center justify-between border border-white/10">
              <h3 className="text-lg sm:text-xl md:text-3xl font-bold mb-4 md:mb-0">
                Total:{" "}
                <span className="text-yellow-400 ml-2 text-xl sm:text-2xl md:text-3xl">
                  ₹{total}
                </span>
              </h3>

              <button className="bg-yellow-400 text-black font-bold text-sm sm:text-base md:text-lg px-5 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 rounded-xl hover:bg-yellow-500 transition shadow-md">
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
