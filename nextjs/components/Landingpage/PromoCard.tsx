"use client";
import React from "react";
import Image from "next/image";

const PromoCard: React.FC = () => {
  return (
    <div className="mb-32 sm:mb-44">
      <div
        className="bg-[#888888] rounded-3xl flex flex-col md:flex-row justify-between items-center px-4 sm:px-6 md:px-[50px] py-2 sm:py-3 md:py-4 max-w-[95%] md:max-w-[1000px] mx-auto mt-12 sm:mt-20 md:mt-36 relative overflow-visible shadow-xl transition-all duration-300 border border-transparent hover:border-white hover:shadow-[0_0_25px_rgba(255,255,255,0.6)]"
      >
        {/* TEXT SECTION */}
        <div className="text-white font-extrabold space-y-4 sm:space-y-6 z-10 text-center md:text-left mt-6 sm:mt-0">
          <h2 className="text-3xl sm:text-4xl md:text-6xl drop-shadow-2xl glow-text animate-fadeIn">
            NARUTO
          </h2>
          <h3 className="text-2xl sm:text-3xl md:text-5xl drop-shadow-2xl md:ml-[150px] glow-text animate-fadeIn">
            TSHIRT
          </h3>
          <p className="text-2xl sm:text-3xl md:text-5xl mt-4 sm:mt-6 text-black drop-shadow-lg font-extrabold transition-all duration-300 ease-in-out animate-fadeIn">
            50% OFF
          </p>
        </div>

        {/* IMAGE SECTION */}
        <div className="relative z-20 mt-10 md:mt-0 md:ml-32 w-full sm:w-[350px] md:w-[500px] h-[240px] sm:h-[320px] md:h-[380px]">
          {/* BACK IMAGE */}
          <div className="absolute -top-4 sm:top-0 left-20 sm:left-28 md:left-36 z-10 w-[220px] sm:w-[260px] md:w-[400px] h-[220px] sm:h-[260px] md:h-[400px] animate-slideUpFade img-hover-scale">
            <Image
              src="/Kurama-Tshirt.png"
              alt="Kurama T-Shirt"
              fill
              className="object-contain"
              priority
            />
          </div>
          {/* FRONT IMAGE */}
          <div className="absolute -top-6 sm:-top-4 md:top-[-10px] left-4 sm:left-6 md:left-8 z-20 w-[270px] sm:w-[300px] md:w-[450px] h-[270px] sm:h-[300px] md:h-[450px] animate-slideUpFade img-hover-scale">
            <Image
              src="/Naruto-Tshirt.png"
              alt="Naruto Uzumaki T-Shirt"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromoCard;
