import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const creators = [
  { 
    name: 'Priyanshu', 
    role: 'Frontend Developer', 
    img: '/Giyuu.png',
    skills: ['React', 'Next.js'],
    experience: '3+ Years',
    projects: '15+ Projects',
    description: 'Passionate frontend developer specializing in modern web technologies and user experience design.'
  },
  { 
    name: 'Sahil', 
    role: 'Backend Developer', 
    img: '/Goku.png',
    skills: ['Node.js', 'Python'],
    experience: '4+ Years',
    projects: '14+ Projects',
    description: 'Expert backend developer focused on scalable architecture and database optimization.'
  },
  { 
    name: 'Aman', 
    role: 'Database Administrator', 
    img: '/sabitoo.png',
    skills: ['MySQL', 'PostgreSQL'],
    experience: '3+ Years',
    projects: '12+ Projects',
    description: 'Database specialist ensuring optimal performance and data security across all systems.'
  },
];

export default function AboutSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardTransform, setCardTransform] = useState('');

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? creators.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === creators.length - 1 ? 0 : prev + 1));
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 15;
    const rotateY = (centerX - x) / 15;
    
    setCardTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`);
  };

  const handleMouseLeave = () => {
    setCardTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
  };

  return (
    <section className="py-16 w-full text-white bg-black min-h-screen flex flex-col justify-center relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute w-24 h-24 bg-white/10 rounded-full top-[10%] left-[20%] animate-float delay-0" />
        <div className="absolute w-16 h-16 bg-white/10 rounded-full top-[30%] left-[75%] animate-float delay-1000" />
        <div className="absolute w-20 h-20 bg-white/10 rounded-full top-[60%] left-[40%] animate-float delay-2000" />
        <div className="absolute w-28 h-28 bg-white/10 rounded-full top-[85%] left-[70%] animate-float delay-3000" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10">
        
        {/* Centered Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-wider animate-title">
            About Us
          </h2>
        </div>

        {/* Main Layout - Centered with cards around */}
        <div className="relative flex items-center justify-center min-h-[500px]">
          
          {/* Left Side Cards */}
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 space-y-6">
            {/* Skills Card */}
            <div className="detail-card skills-card" style={{ transform: 'rotate(-8deg)' }}>
              <div className="detail-bg" />
              <div className="card-frame"></div>
              <div className="card-glow"></div>
              <div className="detail-content">
                <h4 className="detail-title">SKILLS</h4>
                <div className="detail-info">
                  {creators[currentIndex].skills.map((skill, idx) => (
                    <span key={idx} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Experience Card */}
            <div className="detail-card experience-card" style={{ transform: 'rotate(8deg)' }}>
              <div className="detail-bg" />
              <div className="card-frame"></div>
              <div className="card-glow"></div>
              <div className="detail-content">
                <h4 className="detail-title">EXPERIENCE</h4>
                <div className="detail-info">
                  <span className="experience-text">{creators[currentIndex].experience}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Center: Profile Card with Navigation */}
          <div className="flex items-center justify-center gap-6">
            {/* Previous Button */}
            <button 
              onClick={handlePrev}
              className="nav-button z-20 p-3 rounded-full transition-all duration-300"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>

            {/* Main Profile Card */}
            <div className="relative w-80 h-96">
              <div 
                className="creator-card w-full h-full relative cursor-pointer" 
                onMouseMove={handleMouseMove} 
                onMouseLeave={handleMouseLeave}
                style={{ 
                  transform: cardTransform, 
                  transition: cardTransform.includes('scale3d(1, 1, 1)') ? 'transform 0.6s ease-out' : 'none' 
                }}
              >
                <div className="bg" />
                <div className="main-card-frame"></div>
                <div className="main-card-glow"></div>
                <div className="card-bg-image" />
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

            {/* Next Button */}
            <button 
              onClick={handleNext}
              className="nav-button z-20 p-3 rounded-full transition-all duration-300"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          </div>

          {/* Right Side Cards */}
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 space-y-6">
            {/* Projects Card */}
            <div className="detail-card projects-card" style={{ transform: 'rotate(8deg)' }}>
              <div className="detail-bg" />
              <div className="card-frame"></div>
              <div className="card-glow"></div>
              <div className="detail-content">
                <h4 className="detail-title">PROJECTS</h4>
                <div className="detail-info">
                  <span className="projects-text">{creators[currentIndex].projects}</span>
                </div>
              </div>
            </div>

            {/* Description Card */}
            <div className="detail-card description-card" style={{ transform: 'rotate(-8deg)' }}>
              <div className="detail-bg" />
              <div className="card-frame"></div>
              <div className="card-glow"></div>
              <div className="detail-content">
                <h4 className="detail-title">ABOUT</h4>
                <div className="detail-info">
                  <p className="description-text">{creators[currentIndex].description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* Color palette variables */
        :root {
        /* White and Off-Whites */
        --white: #FFFFFF;
        --off-white: #F9F9F9;
        --soft-white: #F2F2F2;

        /* Light Greys */
        --light-gray: #E5E5E5;
        --gray-100: #D4D4D4;
        --gray-200: #BDBDBD;

        /* Medium Greys */
        --gray-300: #A3A3A3;
        --gray-400: #8C8C8C;
        --gray-500: #737373;

        /* Dark Greys */
        --dark-gray: #595959;
        --gray-700: #404040;
        --gray-800: #2C2C2C;

        /* Black and Near-Blacks */
        --black: #000000;
        --soft-black: #1A1A1A;
        --charcoal: #121212;
      }


        /* Floating background shapes */
            .floating-shapes {
              position: absolute;
              width: 100%;
              height: 100%;
              top: 0;
              left: 0;
              z-index: 0;
              pointer-events: none;
              overflow: hidden;
            }

            .shape {
              position: absolute;
              background: linear-gradient(45deg, var(--primary-orange), var(--secondary-orange));
              border-radius: 50%;
              opacity: 0.08;
              animation: float 25s infinite linear;
              z-index: 0;
            }

            .shape-1 {
              width: 100px;
              height: 100px;
              top: 20%;
              left: 10%;
              animation-delay: 0s;
            }

            .shape-2 {
              width: 150px;
              height: 150px;
              top: 60%;
              right: 15%;
              animation-delay: -8s;
            }

            .shape-3 {
              width: 80px;
              height: 80px;
              top: 80%;
              left: 20%;
              animation-delay: -16s;
            }

            .shape-4 {
              width: 120px;
              height: 120px;
              top: 10%;
              right: 30%;
              animation-delay: -24s;
            }

            @keyframes float {
              0% {
                transform: translateY(0px) rotate(0deg);
                opacity: 0.08;
              }
              50% {
                transform: translateY(-30px) rotate(180deg);
                opacity: 0.15;
              }
              100% {
                transform: translateY(0px) rotate(360deg);
                opacity: 0.08;
              }
            }

        /* Enhanced title animation with better visibility */
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

        /* Navigation buttons */
        .nav-button {
            background: linear-gradient(135deg, #2c2c2c, #4a4a4a); /* dark to lighter gray */
            backdrop-filter: blur(10px);
            border: 2px solid #6e6e6e; /* medium gray border */
            transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3); /* dark gray/black shadow */
          }

          .nav-button:hover {
            background: linear-gradient(135deg, #6e6e6e, #2c2c2c); /* reverse gradient for hover */
            border-color: #ffffff; /* highlight with white border */
            transform: scale(1.15) rotate(5deg);
            box-shadow: 0 8px 25px rgba(255, 255, 255, 0.2); /* soft white glow */
          }


        /* Detail cards for member information */
        .detail-card {
          width: 280px;
          height: 160px;
          position: relative;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          cursor: default;
          overflow: hidden;
        }

        .detail-card:hover {
          transform: translateY(-8px) scale(1.1) !important;
          z-index: 20;
        }

        /* White radium glow effect for detail cards */
        .card-glow {
          position: absolute;
          top: -4px;
          left: -4px;
          right: -4px;
          bottom: -4px;
          border-radius: 20px;
          background: radial-gradient(circle at center, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.1) 50%, transparent 70%);
          opacity: 0;
          transition: opacity 0.4s ease;
          z-index: 1;
          filter: blur(8px);
        }

        .detail-card:hover .card-glow {
          opacity: 1;
          animation: glow-pulse 2s ease-in-out infinite;
        }

        /* Main card white glow effect */
        .main-card-glow {
          position: absolute;
          top: -6px;
          left: -6px;
          right: -6px;
          bottom: -6px;
          border-radius: 24px;
          background: radial-gradient(circle at center, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.2) 40%, transparent 70%);
          opacity: 0;
          transition: opacity 0.4s ease;
          z-index: 1;
          filter: blur(12px);
        }

        .creator-card:hover .main-card-glow {
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

        /* Card frame effect */
        .card-frame {
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          border: 3px solid transparent;
          border-radius: 16px;
          background: linear-gradient(135deg, var(--primary-orange), var(--secondary-orange), var(--accent-yellow)) border-box;
          -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: destination-out;
          mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
          mask-composite: exclude;
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: 3;
        }

        .detail-card:hover .card-frame {
          opacity: 1;
        }

        /* Main card frame */
        .main-card-frame {
          position: absolute;
          top: -3px;
          left: -3px;
          right: -3px;
          bottom: -3px;
          border: 4px solid transparent;
          border-radius: 20px;
          background: linear-gradient(135deg, var(--primary-orange), var(--secondary-orange), var(--accent-yellow)) border-box;
          -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: destination-out;
          mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
          mask-composite: exclude;
          opacity: 0;
          transition: opacity 0.4s ease;
          z-index: 3;
        }

        .creator-card:hover .main-card-frame {
          opacity: 1;
        }

        /* Card backgrounds with brown theme */
        .detail-bg {
          width: 100%;
          height: 100%;
          position: absolute;
          background: linear-gradient(135deg, 
            rgba(255, 255, 255, 0.9) 0%,     /* White */
            rgba(128, 128, 128, 0.8) 50%,    /* Medium Grey */
            rgba(0, 0, 0, 0.9) 100%          /* Black */
          );
          border-radius: 16px;
          box-shadow: 
            0 8px 32px rgba(0, 0, 0, 0.6),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(0, 0, 0, 0.3);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          z-index: 2;
        }


        .detail-content {
          position: relative;
          z-index: 4;
          padding: 20px;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
        }

        .detail-title {
          font-size: 0.8rem;
          font-weight: 800;
          color: #e0e0e0; /* very light grey */
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-bottom: 16px;
          text-shadow: 0 2px 6px rgba(0, 0, 0, 0.6);
        }


        .detail-info {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          gap: 8px;
        }

        .skill-tag {
            background: linear-gradient(135deg, rgba(230,230,230,0.8), rgba(180,180,180,0.6)); /* light to mid grey */
            padding: 6px 14px;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: 600;
            margin: 2px 0;
            display: inline-block;
            border: 1px solid rgba(150,150,150,0.5); /* subtle grey border */
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
            text-shadow: 0 1px 3px rgba(0, 0, 0, 0.7);
            color: #111; /* near black text for contrast */
            transition: all 0.3s ease;
            box-shadow: 0 2px 8px rgba(0,0,0,0.25);
          }

          .skill-tag:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 15px rgba(100, 100, 100, 0.5); /* subtle grey shadow on hover */
          }

          .experience-text, .projects-text {
            font-size: 1.8rem;
            font-weight: 800;
            color: #ddd; /* very light grey */
            text-align: left;
            text-shadow: 0 3px 10px rgba(0, 0, 0, 0.5);
          }

          .description-text {
            font-size: 0.85rem;
            line-height: 1.5;
            text-align: left;
            color: #e0e0e0; /* light grey */
            text-shadow: 0 1px 3px rgba(0, 0, 0, 0.7);
          }


        /* Main featured card */
        .creator-card {
          position: relative;
          cursor: pointer;
          transform-style: preserve-3d;
          transition: transform 0.1s ease-out;
        }

        .creator-card:hover .naruto::after {
            filter: drop-shadow(0 0 40px rgba(255, 255, 255, 0.8)); /* white glow on hover */
          }

          .bg {
            width: 100%;
            height: 100%;
            position: absolute;
            background: linear-gradient(135deg, 
              var(--dark-gray) 0%, 
              var(--light-gray) 50%, 
              var(--dark-gray) 100%
            );
            border-radius: 16px;
            box-shadow: 
              0 20px 60px rgba(0, 0, 0, 0.8),      /* strong black shadow for depth */
              0 0 0 1px rgba(200, 200, 200, 0.15);  /* subtle light gray border */
            transform-style: preserve-3d;
            z-index: 2;
          }


        .card-bg-image {
          position: absolute;
          width: 100%;
          height: 100%;
          background-image: url('/bgcard.jpg');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          border-radius: 16px;
          opacity: 0.2;
          z-index: 3;
        }

        .naruto {
          position: absolute;
          width: 100%;
          height: 70%;
          background-size: contain;
          background-repeat: no-repeat;
          background-position: center top;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          z-index: 4;
          top: 10%;
          border-radius: 16px 16px 0 0;
          transform-style: preserve-3d;
        }

        .creator-card:hover .naruto {
          transform: translateZ(30px) scale(1.05);
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
          background-position: center top;
          filter: drop-shadow(0 0 35px rgba(255, 255, 255, 0.9));
          z-index: -1;
          border-radius: 16px 16px 0 0;
        }

        .card-info {
          position: absolute;
          bottom: 1rem;
          width: 100%;
          text-align: center;
          z-index: 10;
          padding: 0 1rem;
        }

        .card-info h3 {
          font-size: 1.6rem;
          font-weight: 800;
          color: var(--white);
          text-shadow: 0px 3px 12px rgba(0, 0, 0, 0.9);
          margin-bottom: 0.25rem;
        }

        .card-info p {
          font-size: 1rem;
          font-weight: 500;
          color: var(--light-gray);
          text-shadow: 0px 2px 8px rgba(0, 0, 0, 0.8);
          opacity: 0.9;
        }

        /* Mobile Responsiveness */
        @media (max-width: 1024px) {
          .detail-card {
            width: 240px;
            height: 140px;
          }
          
          .detail-content {
            padding: 16px;
          }
          
          .experience-text, .projects-text {
            font-size: 1.5rem;
          }

          /* Stack cards vertically on tablet */
          .container > div {
            position: relative !important;
          }
          
          .absolute {
            position: relative !important;
            left: auto !important;
            right: auto !important;
            top: auto !important;
            transform: none !important;
          }
        }

        @media (max-width: 768px) {
          .detail-card {
            width: 220px;
            height: 120px;
          }
          
          .detail-content {
            padding: 14px;
          }
          
          .skill-tag {
            font-size: 0.75rem;
            padding: 4px 10px;
          }
          
          .description-text {
            font-size: 0.8rem;
            line-height: 1.4;
          }

          .experience-text, .projects-text {
            font-size: 1.3rem;
          }

          .detail-title {
            font-size: 0.75rem;
            margin-bottom: 12px;
          }

          .card-info h3 {
            font-size: 1.4rem;
          }

          .card-info p {
            font-size: 0.9rem;
          }

          /* Mobile layout adjustments */
          .container {
            max-width: 100%;
          }

          .relative.flex {
            flex-direction: column;
            gap: 2rem;
          }
        }
      `}</style>
    </section>
  );
}