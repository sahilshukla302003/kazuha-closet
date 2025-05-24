"use client";
import React from "react";
import Navbar from "../../components/Landingpage/Navbar";

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
    {
        id: 4,
        name: "Sasuke Tee",
        price: "₹699",
        type: "video",
        video: "/videos/toji.mp4",
        description: "Cool and stylish Sasuke Tee with a bold ninja design.",
    },
    {
        id: 5,
        name: "Sasuke Tee",
        price: "₹699",
        type: "video",
        video: "/videos/toji.mp4",
        description: "Cool and stylish Sasuke Tee with a bold ninja design.",
    },
    {
        id: 6,
        name: "Sasuke Tee",
        price: "₹699",
        type: "video",
        video: "/videos/toji.mp4",
        description: "Cool and stylish Sasuke Tee with a bold ninja design.",
    },
];

const AllProductsPage = () => {
    return (
        <div className="min-h-screen bg-gray-950 text-white pt-24 px-6">
            <Navbar />
            <h1 className="text-4xl font-bold text-center mb-10 text-yellow-400">
                All Products
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-15 max-w-6xl mx-auto">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="bg-black/20 backdrop-blur-md border border-white/20 p-4 rounded-2xl shadow-2xl hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] transition-all duration-500 ease-in-out transform hover:scale-105"
                    >
                        {product.type === "video" ? (
                            <video
                                src={product.video}
                                muted
                                loop
                                playsInline
                                // preload="none"
                                className="w-full h-[320px] object-contain rounded-lg"
                                onMouseEnter={(e) => {
                                    const playPromise = e.currentTarget.play();
                                    if (playPromise !== undefined) {
                                        playPromise.catch((error) =>
                                            console.warn("Video play interrupted", error)
                                        );
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.pause();
                                    e.currentTarget.currentTime = 0;
                                }}

                            />
                        ) : (
                            <img
                                className="rounded-xl w-full h-[320px] object-cover mb-4"
                                src={product.video}
                                alt={product.name}
                            />
                        )}
                        <div className="text-center mt-2">
                            <h2 className="text-white text-xl font-bold mb-1">
                                {product.name}
                            </h2>
                            <p className="text-yellow-400 text-lg font-semibold">
                                {product.price}
                            </p>
                        </div>
                        <div className="flex justify-between gap-4 mt-4">
                            <button className="flex-1 px-4 py-2 bg-gray-300 hover:bg-gray-400 text-black text-lg font-semibold rounded-full transition-transform duration-300 hover:scale-105 shadow-md">
                                Add to Cart
                            </button>
                            <button className="flex-1 px-4 py-2 bg-gray-300 hover:bg-gray-400 text-black text-lg font-semibold rounded-full transition-transform duration-300 hover:scale-105 shadow-md">
                                More Details
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllProductsPage;
