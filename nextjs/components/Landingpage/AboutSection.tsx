"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

const AboutUs = () => {
  const [customers, setCustomers] = useState(0);
  const [products, setProducts] = useState(0);
  const [salesProducts, setSalesProducts] = useState(0);
  const [cardTransform, setCardTransform] = useState('');

  useEffect(() => {
    let cust = 0;
    let prod = 0;
    let sales = 0;

    const custInterval = setInterval(() => {
      if (cust < 5000) {
        cust += 50;
        setCustomers(cust);
      } else {
        clearInterval(custInterval);
      }
    }, 10);

    const prodInterval = setInterval(() => {
      if (prod < 150) {
        prod += 1;
        setProducts(prod);
      } else {
        clearInterval(prodInterval);
      }
    }, 20);

    const salesInterval = setInterval(() => {
      if (sales < 80) {
        sales += 1;
        setSalesProducts(sales);
      } else {
        clearInterval(salesInterval);
      }
    }, 25);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 15;
    const rotateY = (centerX - x) / 15;

    setCardTransform(
      `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`
    );
  };

  const handleMouseLeave = () => {
    setCardTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
  };

  return (
    <section className="w-full py-24 mb-20 text-white overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center gap-y-12 gap-x-16">
        
        {/* Left Card with Enhanced Effects - Fixed Size */}
        <div className="relative w-full md:w-1/2 group">
          <div 
            className="enhanced-card relative cursor-pointer transform-style-preserve-3d w-[400px] h-[400px] mx-auto"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ 
              transform: cardTransform, 
              transition: cardTransform.includes('scale3d(1, 1, 1)') ? 'transform 0.6s ease-out' : 'none' 
            }}
          >
            {/* Background Layer - Fixed Size */}
            <div className="card-bg absolute inset-0 z-0 w-[400px] h-[400px]">
              <Image
                src="/aboutbg.png"
                alt="Orange Background"
                width={400}
                height={400}
                className="object-cover rounded-xl w-full h-full"
              />
            </div>

            {/* Card Frame */}
            <div className="main-card-frame"></div>
            
            {/* Card Glow */}
            <div className="main-card-glow"></div>

            {/* Characters Image with 3D Effect - Fixed Size */}
            <div className="character-layer relative z-10 rounded-xl overflow-hidden shadow-2xl w-[400px] h-[400px]">
              <Image
                src="/about_us.png"
                alt="Our Team"
                width={400}
                height={400}
                className="rounded-xl object-cover character-image w-full h-full"
              />
            </div>
          </div>
        </div>

        {/* Right Text + Counters */}
        <div className="w-full md:w-1/2 space-y-6 lg:space-y-8">
          <h1 className="text-2xl md:text-4xl font-bold animate-title">About Us</h1>
          <div className="h-1 w-20 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 rounded-full" />
          <p className="text-gray-300 text-sm md:text-lg leading-relaxed">
            We are a passionate team of anime lovers dedicated to bringing the
            spirit of anime to life through fashion. Our designs are crafted
            with care, quality, and creativity to connect fans with what they
            love. From hand-drawn illustrations to premium packaging, we aim to
            deliver a unique and heartfelt experience to each customer.
          </p>

          {/* Enhanced Counters - Added Sales Products */}
          <div className="flex flex-wrap gap-4 mt-6">
            <div className="counter-card bg-white/10 backdrop-blur-sm px-4 md:px-6 py-3 md:py-4 rounded-xl text-center shadow-lg min-w-[120px] md:min-w-[140px] border border-white/20">
              <div className="counter-glow"></div>
              <div className="counter-frame"></div>
              <p className="text-xl md:text-3xl font-extrabold text-white relative z-10">{customers}+</p>
              <p className="text-xs md:text-sm text-gray-300 relative z-10">Happy Customers</p>
            </div>
            <div className="counter-card bg-white/10 backdrop-blur-sm px-4 md:px-6 py-3 md:py-4 rounded-xl text-center shadow-lg min-w-[120px] md:min-w-[140px] border border-white/20">
              <div className="counter-glow"></div>
              <div className="counter-frame"></div>
              <p className="text-xl md:text-3xl font-extrabold text-white relative z-10">{products}+</p>
              <p className="text-xs md:text-sm text-gray-300 relative z-10">Unique Products</p>
            </div>
            <div className="counter-card bg-white/10 backdrop-blur-sm px-4 md:px-6 py-3 md:py-4 rounded-xl text-center shadow-lg min-w-[120px] md:min-w-[140px] border border-white/20">
              <div className="counter-glow"></div>
              <div className="counter-frame"></div>
              <p className="text-xl md:text-3xl font-extrabold text-white relative z-10">{salesProducts}+</p>
              <p className="text-xs md:text-sm text-gray-300 relative z-10">Sales Products</p>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section with Enhanced Cards */}
      <div className="mt-20 px-4">
        <h4 className="text-xl md:text-3xl font-bold mb-6 text-center animate-title">Why Choose Us?</h4>
        <ul className="flex flex-wrap justify-center gap-6 text-gray-300 text-sm md:text-lg">
          {[
            "Anime-Lover Owned",
            "Designed in India",
            "Eco-Friendly Packaging",
            "Responsive Support",
          ].map((item, idx) => (
            <li
              key={idx}
              className="feature-card bg-white/5 backdrop-blur-md px-3 md:px-5 py-2 md:py-3 rounded-xl shadow-md border border-white/10 relative"
            >
              <div className="feature-glow"></div>
              <div className="feature-frame"></div>
              <span className="relative z-10">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <style jsx>{`
        /* Color palette variables */
        :root {
          --white: #FFFFFF;
          --off-white: #F9F9F9;
          --soft-white: #F2F2F2;
          --light-gray: #E5E5E5;
          --gray-100: #D4D4D4;
          --gray-200: #BDBDBD;
          --gray-300: #A3A3A3;
          --gray-400: #8C8C8C;
          --gray-500: #737373;
          --dark-gray: #595959;
          --gray-700: #404040;
          --gray-800: #2C2C2C;
          --black: #000000;
          --soft-black: #1A1A1A;
          --charcoal: #121212;
        }

        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }

        /* Enhanced title animation */
        .animate-title {
          background: linear-gradient(135deg, #ffffff 0%, #bdbdbd 50%, #ffffff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-fill-color: transparent;
          animation: shimmer 4s ease-in-out infinite;
          text-shadow: 
            0 0 8px rgba(255, 255, 255, 0.3),
            0 0 12px rgba(189, 189, 189, 0.15);
          position: relative;
          z-index: 10;
        }

        @keyframes shimmer {
          0%, 100% { 
            opacity: 1; 
            transform: scale(1);
            filter: brightness(1);
          }
          50% { 
            opacity: 0.95; 
            transform: scale(1.02);
            filter: brightness(1.2);
          }
        }

        /* Enhanced Card Styles */
        .enhanced-card {
          position: relative;
          cursor: pointer;
          transform-style: preserve-3d;
          transition: transform 0.1s ease-out;
        }

        .card-bg {
          position: absolute;
          border-radius: 12px;
          transform-style: preserve-3d;
          z-index: 1;
        }

        .main-card-frame {
          position: absolute;
          top: -3px;
          left: -3px;
          right: -3px;
          bottom: -3px;
          border: 4px solid transparent;
          border-radius: 16px;
          background: linear-gradient(135deg, var(--light-gray), var(--gray-300), var(--dark-gray)) border-box;
          -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: destination-out;
          mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
          mask-composite: exclude;
          opacity: 0;
          transition: opacity 0.4s ease;
          z-index: 3;
        }

        .enhanced-card:hover .main-card-frame {
          opacity: 1;
        }

        .main-card-glow {
          position: absolute;
          top: -6px;
          left: -6px;
          right: -6px;
          bottom: -6px;
          border-radius: 18px;
          background: radial-gradient(circle at center, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.2) 40%, transparent 70%);
          opacity: 0;
          transition: opacity 0.4s ease;
          z-index: 2;
          filter: blur(12px);
        }

        .enhanced-card:hover .main-card-glow {
          opacity: 1;
          animation: glow-pulse 2.5s ease-in-out infinite;
        }

        @keyframes glow-pulse {
          0%, 100% {
            opacity: 0.6;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
        }

        .character-layer {
          transform-style: preserve-3d;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          z-index: 10;
        }

        .enhanced-card:hover .character-layer {
          transform: translateZ(30px) scale(1.05);
        }

        .character-image {
          transition: all 0.4s ease;
        }

        .enhanced-card:hover .character-image {
          filter: drop-shadow(0 0 35px rgba(255, 255, 255, 0.6));
        }

        /* Counter Cards Enhancement */
        .counter-card {
          position: relative;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          cursor: default;
          overflow: hidden;
        }

        .counter-card:hover {
          transform: translateY(-8px) scale(1.05);
          z-index: 20;
        }

        .counter-glow {
          position: absolute;
          top: -4px;
          left: -4px;
          right: -4px;
          bottom: -4px;
          border-radius: 16px;
          background: radial-gradient(circle at center, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.1) 50%, transparent 70%);
          opacity: 0;
          transition: opacity 0.4s ease;
          z-index: 1;
          filter: blur(8px);
        }

        .counter-card:hover .counter-glow {
          opacity: 1;
          animation: glow-pulse 2s ease-in-out infinite;
        }

        .counter-frame {
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          border: 3px solid transparent;
          border-radius: 14px;
          background: linear-gradient(135deg, var(--light-gray), var(--gray-300), var(--dark-gray)) border-box;
          -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: destination-out;
          mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
          mask-composite: exclude;
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: 2;
        }

        .counter-card:hover .counter-frame {
          opacity: 1;
        }

        /* Feature Cards Enhancement */
        .feature-card {
          position: relative;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          cursor: default;
          overflow: hidden;
        }

        .feature-card:hover {
          transform: translateY(-6px) scale(1.08);
          z-index: 20;
        }

        .feature-glow {
          position: absolute;
          top: -3px;
          left: -3px;
          right: -3px;
          bottom: -3px;
          border-radius: 15px;
          background: radial-gradient(circle at center, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.08) 50%, transparent 70%);
          opacity: 0;
          transition: opacity 0.4s ease;
          z-index: 1;
          filter: blur(6px);
        }

        .feature-card:hover .feature-glow {
          opacity: 1;
          animation: glow-pulse 1.8s ease-in-out infinite;
        }

        .feature-frame {
          position: absolute;
          top: -1px;
          left: -1px;
          right: -1px;
          bottom: -1px;
          border: 2px solid transparent;
          border-radius: 13px;
          background: linear-gradient(135deg, var(--light-gray), var(--gray-300), var(--dark-gray)) border-box;
          -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: destination-out;
          mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
          mask-composite: exclude;
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: 2;
        }

        .feature-card:hover .feature-frame {
          opacity: 1;
        }

        /* Mobile Responsiveness */
        @media (max-width: 768px) {
          .enhanced-card {
            transform: none !important;
            width: 320px !important;
            height: 320px !important;
          }
          
          .card-bg {
            width: 320px !important;
            height: 320px !important;
          }
          
          .character-layer {
            transform: none !important;
            width: 320px !important;
            height: 320px !important;
          }
          
          .counter-card:hover {
            transform: translateY(-4px) scale(1.02);
          }
          
          .feature-card:hover {
            transform: translateY(-3px) scale(1.05);
          }
        }

        @media (max-width: 360px) {
          .enhanced-card {
            width: 280px !important;
            height: 280px !important;
          }
          
          .card-bg {
            width: 280px !important;
            height: 280px !important;
          }
          
          .character-layer {
            width: 280px !important;
            height: 280px !important;
          }
          
          .counter-card:hover {
            transform: translateY(-2px) scale(1.01);
          }
          
          .feature-card:hover {
            transform: translateY(-2px) scale(1.02);
          }
        }
      `}</style>
    </section>
  );
};

export default AboutUs;