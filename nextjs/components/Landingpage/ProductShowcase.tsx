import React, { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type Product = {
  id: string; // Changed from number to string to match your product system
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
    id: "giyu-tee-001", // Using the same IDs as in All_product.tsx
    name: "Giyu Tee",
    subtitle: "Water Hashira",
    price: "₹449",
    type: "image",
    media: "Productimage/GIYU/1.png",
    description: "Stylish Giyu Tomioka T-shirt",
    rating: 4.8
  },
  {
    id: "itachi-tee-001", // Using the same IDs as in All_product.tsx
    name: "Itachi Tee",
    subtitle: "You are already under my Genjutsu",
    price: "₹429",
    type: "image", 
    media: "Productimage/ITACHI/1.png",
    description: "Elegant Itachi Uchiha design tee",
    rating: 4.9
  },
  {
    id: "rengoku-tee-001", // Using the same IDs as in All_product.tsx
    name: "Rengoku Tee",
    subtitle: "Flame Hashira",
    price: "₹459",
    type: "image",
    media: "Productimage/RENGOKU/1.png",
    description: "Fiery Rengoku Flame Hashira tee",
    rating: 4.7
  },
];

const ProductShowcase = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const observerRef = useRef<(HTMLVideoElement | null)[]>([]);
  const router = useRouter(); // Added router for navigation

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

  // Navigation function - same as in All_product.tsx
  const navigateToProduct = (productId: string) => {
    localStorage.setItem("productid", productId);
    router.push(`/product_page/`);
  };

  // Handle card click
  const handleCardClick = (productId: string) => {
    navigateToProduct(productId);
  };

  // Handle quick view click
  const handleQuickView = (e: React.MouseEvent, productId: string) => {
    e.stopPropagation(); // Prevent event bubbling if needed
    navigateToProduct(productId);
  };

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

            {/* Mobile View */}
            <div className="md:hidden">
              <div className="flex justify-center">
                <div 
                  className="w-56 xs:w-60 sm:w-72 transition-all duration-500 hover:-translate-y-8 cursor-pointer"
                  onClick={() => handleCardClick(products[currentIndex].id)}
                >
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
                        <button 
                          onClick={(e) => handleQuickView(e, products[currentIndex].id)}
                          className="px-6 py-2 bg-gradient-to-r from-yellow-300 to-orange-400 hover:from-yellow-400 hover:to-orange-500 text-black font-bold rounded-lg transition-all duration-300 hover:scale-105 shadow-lg"
                        >
                          <span className="text-sm">Quick View</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop View Cards */}
            <div className="hidden md:flex flex-1 items-center justify-center h-full">
              <div className="overflow-x-auto pb-4 scrollbar-hide flex items-center">
                <div className="flex gap-8 px-4 justify-center items-center min-h-full" style={{ minWidth: "max-content" }}>
                  {products.map((product, index) => (
                    <div
                      key={product.id}
                      className="flex-shrink-0 w-80 transition-all duration-500 hover:scale-105 cursor-pointer"
                      onClick={() => handleCardClick(product.id)}
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
                            <button 
                              onClick={(e) => handleQuickView(e, product.id)}
                              className="px-6 py-2 bg-gradient-to-r from-yellow-300 to-orange-400 hover:from-yellow-400 hover:to-orange-500 text-black font-bold rounded-lg transition-all duration-300 hover:scale-105 shadow-lg"
                            >
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

            {/* Rotating Border View All Products button at the bottom */}
            <div className="flex justify-center mt-6 md:mt-6">
              <Link href="/allproducts">
                <button className="border-btn-small relative bg-gradient-to-r from-orange-400 to-orange-600 text-white font-bold py-2 px-4 md:py-3 md:px-6 rounded-full cursor-pointer overflow-hidden transition-all duration-300 hover:scale-105 text-sm md:text-base shadow-lg hover:shadow-xl z-10">
                  <span className="relative z-20">View All Products</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* CSS for Rotating Border Button */}
      <style jsx>{`
        .border-btn-small {
          position: relative;
          background: transparent;
          border: 2px solid transparent;
          background-clip: padding-box;
          color: white;
          padding: 8px 20px;
          border-radius: 30px;
          font-weight: bold;
          cursor: pointer;
          overflow: hidden;
        }
        
        @media (min-width: 768px) {
          .border-btn-small {
            padding: 12px 24px;
          }
        }
        
        .border-btn-small::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(45deg, #ffd700, #ff8c00, #ff4500, #8b0000);
          border-radius: 30px;
          z-index: -1;
          animation: rotateBorder 3s linear infinite;
        }
        
        .border-btn-small::after {
          content: '';
          position: absolute;
          top: 2px;
          left: 2px;
          right: 2px;
          bottom: 2px;
          background: #1a1a1a;
          border-radius: 28px;
          z-index: -1;
        }
        
        @keyframes rotateBorder {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default ProductShowcase;