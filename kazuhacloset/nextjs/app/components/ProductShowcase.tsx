"use client";
import React, { useState, useEffect, useRef } from "react";
import LazyVideo from "./LazyVideo"; // Import LazyVideo component

type Product = {
  id: number;
  name: string;
  price: string;
  type: "video" | "image";
  video: string;
  description: string;
};

const products: Product[] = [
  {
    id: 1,
    name: "Naruto Tee",
    price: "₹599",
    type: "video",
    video: "/videos/goku.mp4",
    description: "High-quality Naruto-themed T-shirt with durable print.",
  },
  {
    id: 2,
    name: "Luffy Tee",
    price: "₹649",
    type: "video",
    video: "/videos/naruto.mp4",
    description: "One Piece Luffy T-shirt made of soft, breathable fabric.",
  },
  {
    id: 3,
    name: "Sasuke Tee",
    price: "₹699",
    type: "video",
    video: "/videos/toji.mp4",
    description: "Cool and stylish Sasuke Tee with a bold ninja design.",
  },
];

const ProductShowcase = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const observerRef = useRef<(HTMLVideoElement | null)[]>([]);

  return (
    <div
      className="relative w-full h-[90vh] flex items-center justify-center"
      style={{
        backgroundImage: `url('/background.jpg')`,
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="overflow-x-auto flex gap-10 px-16 py-20 snap-x snap-mandatory">
        {products.map((product, index) => (
          <div
            key={product.id}
            className={`snap-center flex-shrink-0 w-[280px] md:w-[360px] rounded-xl cursor-pointer 
              ${index === 1 ? "scale-110 z-10" : "scale-90"} 
              opacity-100 transition-all duration-500`}
            onClick={() => setSelectedProduct(product)}
          >
            <div className="bg-black/20 backdrop-blur-md border border-white/20 p-4 rounded-2xl shadow-2xl hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] transition-all duration-500 ease-in-out transform hover:scale-105 relative">
              {product.type === "video" ? (
                <LazyVideo
                  src={product.video}
                  alt={product.name}
                />
              ) : (
                <img
                  className="rounded-xl w-full h-[320px] object-cover mb-4"
                  src={product.video}
                  alt={product.name}
                />
              )}

              <div className="text-center">
                <h2 className="text-white text-xl font-bold mb-1">{product.name}</h2>
                <p className="text-yellow-400 text-lg font-semibold">{product.price}</p>
              </div>
              <button className="w-full mt-4 px-4 py-2 bg-gray-300 hover:bg-gray-400 text-black text-lg font-semibold rounded-full transition-transform duration-300 hover:scale-105 shadow-md">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Quick View Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white w-[90%] md:w-[500px] p-8 rounded-2xl shadow-2xl relative border border-yellow-400">
            <button
              className="absolute top-2 right-3 text-black text-2xl font-bold"
              onClick={() => setSelectedProduct(null)}
            >
              &times;
            </button>
            <h2 className="text-3xl font-extrabold mb-4 text-center text-black border-b pb-2">
              {selectedProduct.name}
            </h2>
            <p className="text-black text-lg mb-4 text-center">
              {selectedProduct.description}
            </p>
            <p className="text-yellow-600 text-2xl font-bold mb-6 text-center">
              {selectedProduct.price}
            </p>
            {selectedProduct.type === "video" ? (
              <LazyVideo
                src={selectedProduct.video}
                alt={selectedProduct.name}
              />
            ) : (
              <img
                className="rounded-xl w-full object-cover shadow-md mb-4"
                src={selectedProduct.video}
                alt={selectedProduct.name}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductShowcase;
