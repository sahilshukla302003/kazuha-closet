"use client";
import React from "react";

const products = [
  {
    id: 1,
    name: "Naruto Tee",
    price: "₹599",
    type: "video",
    video: "/videos/goku.mp4",
  },
  {
    id: 2,
    name: "Luffy Tee",
    price: "₹649",
    type: "video",
    video: "/videos/naruto.mp4",
  },
  {
    id: 3,
    name: "Sasuke Tee",
    price: "₹699",
    type: "video",
    video: "/videos/toji.mp4",
  },
];

const ProductShowcase = () => {
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
      {/* Scrollable Product Cards */}
      <div className="overflow-x-auto flex gap-10 px-16 py-20 snap-x snap-mandatory">
        {products.map((product, index) => (
          <div
            key={product.id}
            className={`snap-center flex-shrink-0 w-[280px] md:w-[360px] rounded-xl 
              ${index === 1 ? "scale-110 z-10" : "scale-90"} 
              opacity-100 transition-all duration-500`}
          >
            <div className="bg-black/20 backdrop-blur-md border border-transparent p-4 rounded-2xl 
                            shadow-xl hover:shadow-[0_0_25px_rgba(255,255,255,0.6)] 
                            hover:border-white transition-all duration-500 ease-in-out transform hover:scale-105 relative">
              {product.type === "video" ? (
                <video
                  className="rounded-xl w-full h-[320px] object-cover mb-4 transition-all duration-500
                            brightness-110 contrast-125 saturate-150 hover:brightness-125 hover:saturate-200"
                  src={product.video}
                  loop
                  muted
                  playsInline
                  onMouseEnter={(e) => e.currentTarget.play()}
                  onMouseLeave={(e) => {
                    e.currentTarget.pause();
                    e.currentTarget.currentTime = 0;
                  }}
                />
              ) : (
                <img
                  className="rounded-xl w-full h-[320px] object-cover mb-4 transition-all duration-500
                            brightness-110 contrast-125 saturate-150 hover:brightness-125 hover:saturate-200"
                  src={product.video}
                  alt={product.name}
                />
              )}

              <div className="text-center">
                <h2 className="text-white text-xl font-bold mb-1">{product.name}</h2>
                <p className="text-yellow-400 text-lg font-semibold">{product.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductShowcase;
