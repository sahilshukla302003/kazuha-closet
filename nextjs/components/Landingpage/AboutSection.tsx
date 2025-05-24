'use client';

import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
});

export default function AboutSection() {
  return (
    <section
      className={`${poppins.className} about-section relative pt-12 pb-28 overflow-hidden w-full text-white bg-black`}
    >
      {/* Heading */}
      <h2 className="text-center text-5xl font-bold tracking-wider mb-24 z-10 relative drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
        About Us
      </h2>

      {/* Creator Cards */}
      <div className="flex justify-center gap-20 flex-wrap z-10 relative">
        {[
          { name: 'Priyanshu', role: 'Frontend Developer', img: '/Giyuu.png' },
          { name: 'Sahil', role: 'Backend Developer', img: '/Goku.png' },
          { name: 'Aman', role: 'Database Administrator', img: '/Sabitoo.png' },
        ].map((member, index) => (
          <div className="creator-card" key={index}>
            <div className="bg" />
            <div className="naruto" style={{ backgroundImage: `url(${member.img})` }} />
            <div className="card-info">
              <h3>{member.name}</h3>
              <p>{member.role}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Styles */}
      <style jsx>{`
        .creator-card {
          position: relative;
          width: 20rem;
          height: 25rem;
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
