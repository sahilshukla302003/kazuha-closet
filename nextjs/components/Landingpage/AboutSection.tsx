'use client';

import { useState } from 'react';
import { Poppins } from 'next/font/google';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
});

const creators = [
  { name: 'Priyanshu', role: 'Frontend Developer', img: '/Giyuu.png' },
  { name: 'Sahil', role: 'Backend Developer', img: '/Goku.png' },
  { name: 'Aman', role: 'Database Administrator', img: '/Sabitoo.png' },
];

export default function AboutSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? creators.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === creators.length - 1 ? 0 : prev + 1));
  };

  return (
      <section className={`${poppins.className} pt-78 pb-78 w-full text-white bg-black`}>
      <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Left Side: Heading/Description */}
        <div className="lg:w-1/2 text-center lg:text-left space-y-6">
          <h2 className="text-5xl font-bold tracking-wider drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
            About Us
          </h2>
          <p className="text-lg text-gray-300">
            Meet the passionate team behind this project. We specialize in frontend, backend,
            and database management to bring our ideas to life.
          </p>
        </div>

        {/* Right Side: Slider */}
        <div className="lg:w-1/2 flex items-center justify-center gap-10 relative z-10">
          <button onClick={handlePrev}>
            <ChevronLeft className="w-10 h-10 text-white hover:text-gray-300 transition" />
          </button>

          <div className="relative w-[20rem] h-[25rem] overflow-visible">
            <div className="w-[20rem] h-[25rem]">
              <div className="creator-card w-full h-full relative cursor-pointer">
                <div className="bg" />
                <div
                  className="naruto"
                  style={{ backgroundImage: `url(${creators[currentIndex].img})` }}
                />
                <div className="card-info">
                  <h3>{creators[currentIndex].name}</h3>
                  <p>{creators[currentIndex].role}</p>
                </div>
              </div>
            </div>
          </div>

          <button onClick={handleNext}>
            <ChevronRight className="w-10 h-10 text-white hover:text-gray-300 transition" />
          </button>
        </div>
      </div>

      {/* Card Styles */}
      <style jsx>{`
        .creator-card {
          position: relative;
          cursor: pointer;
        }

        .creator-card:hover .naruto::after {
          filter: drop-shadow(0 0 35px rgba(255, 255, 255, 0.9));
        }

        .bg {
          width: 100%;
          height: 100%;
          position: absolute;
          background-image: url('/bgcard.jpg');
          background-size: cover;
          background-position: center;
          transition: 1s;
          border-radius: 12px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
        }

        .creator-card:hover .bg {
          transform: perspective(20px) rotateX(1deg) translateY(-40px);
        }

        .naruto {
          position: absolute;
          width: 20rem;
          height: 20rem;
          background-size: contain;
          background-repeat: no-repeat;
          background-position: center;
          transition: transform 1s ease;
          z-index: 2;
          top: 0;
        }

        .creator-card:hover .naruto {
          transform: translateY(-100px) translateX(-10px) scale(1.1);
        }

        .creator-card:hover .naruto::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: inherit;
          background-size: contain;
          background-repeat: no-repeat;
          background-position: center;
          filter: drop-shadow(0 0 25px rgba(254, 254, 254, 0.8));
          z-index: -1;
        }

        .card-info {
          position: absolute;
          bottom: 1rem;
          width: 100%;
          text-align: center;
          z-index: 10;
        }

        .card-info h3 {
          font-size: 1.75rem;
          font-weight: 700;
          text-shadow: 0px 2px 8px rgba(0, 0, 0, 0.7);
        }

        .card-info p {
          font-size: 1.1rem;
          font-weight: 400;
          text-shadow: 0px 1px 6px rgba(0, 0, 0, 0.6);
        }
      `}</style>
    </section>
  );
}
