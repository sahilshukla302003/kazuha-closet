"use client";

import React from 'react';
import Navbar from './Landingpage/Navbar';
import { Poppins } from 'next/font/google';
import Image from 'next/image';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
});

export default function CartPage() {
  const cartItems: {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }[] = []; // Leave empty to show empty cart animation

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <main className="bg-black text-white min-h-screen px-6 py-8 flex flex-col items-center justify-start">
      <Navbar />

      <div className={`${poppins.className} w-full flex flex-col items-center`}>
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
            <h1 className="text-2xl font-bold mt-6 drop-shadow-[1px_1px_3px_rgba(0,0,0,0.6)]">
              Your Cart is Feeling Lonely
            </h1>
            <p className="text-gray-400 text-base mt-2 max-w-sm">
              Looks like you haven’t added anything yet. Start shopping and let the magic begin!
            </p>
          </div>
        ) : (
          <div className="bg-[#3c3c3c] rounded-2xl p-6 shadow-2xl max-w-4xl w-full mt-16">
            <h1 className="text-4xl font-bold text-white mb-10 drop-shadow-[2px_2px_4px_rgba(0,0,0,0.8)]">
              YOUR CART
            </h1>

            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between mb-6">
                <div className="relative w-32 h-32">
                  <Image
                    src={item.image}
                    alt={item.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-xl shadow-lg"
                  />
                </div>
                <div className="flex-1 ml-6">
                  <h2 className="text-2xl font-bold">{item.name}</h2>
                  <p className="text-gray-300">Qty: {item.quantity}</p>
                  <p className="text-yellow-400 font-semibold mt-2">₹{item.price}</p>
                </div>
              </div>
            ))}

            <div className="flex justify-between items-center mt-10 border-t pt-6 border-gray-600">
              <h3 className="text-2xl font-bold">Total</h3>
              <span className="text-yellow-400 text-2xl font-bold">₹{total}</span>
            </div>

            <button className="mt-6 bg-yellow-400 text-black font-bold px-6 py-3 rounded-xl hover:bg-yellow-500 transition">
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
