import React from "react";

const PromoCard: React.FC = () => {
  return (
    <div className="mb-44"> {/* Increased space below the PromoCard */}
      <div className="bg-[#888888] rounded-3xl flex justify-between items-center px-[50px] py-8 max-w-[1000px] mx-auto mt-36 relative overflow-visible shadow-xl transition-all duration-300 border border-transparent hover:border-white hover:shadow-[0_0_25px_rgba(255,255,255,0.6)]">
        <div className="text-white font-extrabold space-y-6 z-10">
          <h2 className="text-6xl drop-shadow-2xl glow-text animate-fadeIn">NARUTO</h2>
          <h3 className="text-5xl drop-shadow-2xl ml-[150px] glow-text animate-fadeIn">TSHIRT</h3>
          <p className="text-5xl mt-6 text-black drop-shadow-lg font-extrabold group-hover:text-indigo-600 group-hover:scale-110 transition-all duration-300 ease-in-out animate-fadeIn">
            50% OFF
          </p>
        </div>

        <div className="relative z-20 ml-32 w-[500px] h-[380px] overflow-visible -mt-20">
          <img
            src="/Kurama-Tshirt.png"
            alt="Kurama T-Shirt"
            className="absolute top-[-0px] left-44 z-10 w-[400px] h-[400px] object-contain animate-slideUpFade img-hover-scale"
          />
          <img
            src="/Naruto-Tshirt.png"
            alt="Naruto Uzumaki T-Shirt"
            className="absolute top-[-10px] left-8 z-20 w-[450px] h-[450px] object-contain animate-slideUpFade img-hover-scale"
          />
        </div>
      </div>
    </div>
  );
};

export default PromoCard;
