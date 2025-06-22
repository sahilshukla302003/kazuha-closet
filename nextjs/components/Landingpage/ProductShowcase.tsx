import React, { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import Link from 'next/link';

type Product = {
  id: number;
  name: string;
  price: string;
  type: "video" | "image";
  media: string;
  subtitle: string;
  description?: string;
  rating?: number;
};

const products: Product[] = [
  {
    id: 1,
    name: "Naruto Tee",
    subtitle: "Sage Mode Series",
    price: "₹599",
    type: "image",
    media: "Productimage/GIYU/1.png",
    description: "Premium quality t-shirt featuring Naruto in Sage Mode. Made with 100% cotton for maximum comfort.",
    rating: 4.8
  },
  {
    id: 2,
    name: "Luffy Tee",
    subtitle: "Straw Hat Pirates",
    price: "₹649",
    type: "image", 
    media: "Productimage/ITACHI/1.png",
    description: "Join the Straw Hat crew with this awesome Luffy design. High-quality print on soft cotton fabric.",
    rating: 4.9
  },
  {
    id: 3,
    name: "Sasuke Tee",
    subtitle: "Uchiha Legacy",
    price: "₹699",
    type: "image",
    media: "Productimage/RENGOKU/1.png",
    description: "Embrace the power of the Uchiha clan with this premium Sasuke t-shirt. Perfect for anime fans.",
    rating: 4.7
  },
];

const ProductShowcase = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const observerRef = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const videoElement = entry.target as HTMLVideoElement;
            videoElement.load();
          }
        });
      },
      { threshold: 0.1 }
    );

    observerRef.current.forEach((video) => {
      if (video) observer.observe(video);
    });

    return () => observer.disconnect();
  }, []);

  const nextProduct = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length);
  };

  const prevProduct = () => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={12}
        className={`${
          i < Math.floor(rating) 
            ? "fill-yellow-400 text-yellow-400" 
            : "text-gray-400"
        }`}
      />
    ));
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      <div className="absolute top-4 right-4 z-20">
        <Link href="/allproducts">
          <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-3 text-xs sm:text-sm rounded-full shadow-lg transition-transform duration-300 hover:scale-105">
            View All
          </button>
        </Link>
      </div>

      <button
        onClick={prevProduct}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 md:hidden"
      >
        <ChevronLeft size={24} />
      </button>
      
      <button
        onClick={nextProduct}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 md:hidden"
      >
        <ChevronRight size={24} />
      </button>

      <div className="flex items-center justify-center min-h-screen md:min-h-0 md:h-screen">
        <div 
          className="relative w-full h-full"
          style={{
            backgroundImage: "url('/background.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed"
          }}
        >
          <div className="absolute inset-0 bg-black/20"></div>
          
          <div className="relative z-10 px-2 py-8 md:py-4 h-full flex flex-col justify-center">
            
            <div className="text-center mb-8 md:mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                FEATURED PRODUCTS
              </h2>
              <div className="w-16 h-1 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 mx-auto mb-4"></div>
              <p className="text-gray-300 text-sm">
                <span className="md:hidden">Navigate through our collection</span>
                <span className="hidden md:inline">Swipe to explore our collection</span>
              </p>
            </div>

            <div className="md:hidden">
              <div className="flex justify-center">
                <div className="w-56 xs:w-60 sm:w-72 transition-all duration-500 hover:-translate-y-8">
                  <div className="bg-black/40 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all duration-500 overflow-hidden">
                    
                    <div className="relative h-48 sm:h-56 overflow-hidden">
                      {products[currentIndex].type === "video" ? (
                        <video
                          ref={(el) => {
                            if (el && !observerRef.current.includes(el)) {
                              observerRef.current.push(el);
                            }
                          }}
                          src={products[currentIndex].media}
                          muted
                          loop
                          playsInline
                          preload="none"
                          className="w-full h-full object-cover"
                          onMouseEnter={(e) => e.currentTarget.play()}
                          onMouseLeave={(e) => {
                            e.currentTarget.pause();
                            e.currentTarget.currentTime = 0;
                          }}
                        />
                      ) : (
                        <img
                          src={products[currentIndex].media}
                          alt={products[currentIndex].name}
                          className="w-full h-full object-cover"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                      <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-all duration-300"></div>
                      <div className="absolute top-3 left-3 bg-yellow-400 text-black px-2 py-1 rounded-full text-xs font-bold">
                        FEATURED
                      </div>
                      <div className="absolute top-3 right-3 w-3 h-3 bg-white rounded-full"></div>
                    </div>

                    <div className="p-4 sm:p-6">
                      <div className="mb-4">
                        <h3 className="text-white text-lg sm:text-xl font-bold mb-1">
                          {products[currentIndex].name}
                        </h3>
                        <p className="text-gray-300 text-sm mb-2">
                          {products[currentIndex].subtitle}
                        </p>
                      </div>
                      
                      <div className="flex items-center justify-between mb-4">
                        <div className="text-yellow-400 text-xl sm:text-2xl font-bold">
                          {products[currentIndex].price}
                        </div>
                        <div className="flex items-center gap-1">
                          {renderStars(products[currentIndex].rating || 0)}
                          <span className="text-gray-300 text-sm ml-1">
                            {products[currentIndex].rating}
                          </span>
                        </div>
                      </div>

                      <div className="flex justify-center">
                        <button className="px-6 py-2 bg-gradient-to-r from-yellow-300 to-orange-400 hover:from-yellow-400 hover:to-orange-500 text-black font-bold rounded-lg transition-all duration-300 hover:scale-105 shadow-lg">
                          <span className="text-sm">Quick View</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ✅ Desktop View Cards - Larger with more spacing */}
            <div className="hidden md:flex flex-1 items-center justify-center h-full">
              <div className="overflow-x-auto pb-4 scrollbar-hide flex items-center">
                <div className="flex gap-8 px-4 justify-center items-center min-h-full" style={{ minWidth: "max-content" }}>
                  {products.map((product, index) => (
                    <div
                      key={product.id}
                      className="flex-shrink-0 w-80 transition-all duration-500 hover:scale-105"
                    >
                      <div className="bg-black/40 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all duration-500 overflow-hidden">
                        <div className="relative h-60 overflow-hidden">
                          {product.type === "video" ? (
                            <video
                              ref={(el) => {
                                if (el && !observerRef.current.includes(el)) {
                                  observerRef.current.push(el);
                                }
                              }}
                              src={product.media}
                              muted
                              loop
                              playsInline
                              preload="none"
                              className="w-full h-full object-cover"
                              onMouseEnter={(e) => e.currentTarget.play()}
                              onMouseLeave={(e) => {
                                e.currentTarget.pause();
                                e.currentTarget.currentTime = 0;
                              }}
                            />
                          ) : (
                            <img
                              src={product.media}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                          <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-all duration-300"></div>
                          {index === currentIndex && (
                            <div className="absolute top-3 left-3 bg-yellow-400 text-black px-2 py-1 rounded-full text-xs font-bold">
                              FEATURED
                            </div>
                          )}
                          {index === currentIndex && (
                            <div className="absolute top-3 right-3 w-3 h-3 bg-white rounded-full"></div>
                          )}
                        </div>

                        <div className="p-4">
                          <div className="mb-3">
                            <h3 className="text-white text-lg font-bold mb-1">
                              {product.name}
                            </h3>
                            <p className="text-gray-300 text-sm mb-2">
                              {product.subtitle}
                            </p>
                          </div>
                          
                          <div className="flex items-center justify-between mb-3">
                            <div className="text-yellow-400 text-xl font-bold">
                              {product.price}
                            </div>
                            <div className="flex items-center gap-1">
                              {renderStars(product.rating || 0)}
                              <span className="text-gray-300 text-sm ml-1">
                                {product.rating}
                              </span>
                            </div>
                          </div>

                          <div className="flex justify-center">
                            <button className="px-6 py-2 bg-gradient-to-r from-yellow-300 to-orange-400 hover:from-yellow-400 hover:to-orange-500 text-black font-bold rounded-lg transition-all duration-300 hover:scale-105 shadow-lg">
                              <span className="text-sm">Quick View</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-6 md:mt-4 gap-2">
              {products.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? "bg-yellow-400 scale-125" 
                      : "bg-white/30 hover:bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductShowcase;