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
    projects: '20+ Projects',
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

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    setCardTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`);
  };

  const handleMouseLeave = () => {
    setCardTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
  };

  return (
    <section className="pt-20 pb-20 w-full text-white bg-black min-h-screen flex items-center">
      <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Left Side: Title and Details Cards */}
        <div className="lg:w-1/2 flex flex-col justify-start items-center space-y-8 pl-8 pt-8">
          <h2 className="text-5xl font-bold tracking-wider text-center" style={{ marginTop: '-8rem',marginLeft: '14rem' }}>
            About us
          </h2>
          
          {/* Details cards for current member - positioned below title */}
          <div className="grid grid-cols-2 gap-8 w-full max-w-2xl" style={{ marginLeft: '14rem',marginTop: '2rem' }}>
            {/* Skills Card */}
            <div className="detail-card card-rotate-positive">
              <div className="detail-bg" />
              <div className="detail-blur" />
              <div className="detail-content">
                <h4 className="detail-title">Skills</h4>
                <div className="detail-info">
                  {creators[currentIndex].skills.map((skill, idx) => (
                    <span key={idx} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Experience Card */}
            <div className="detail-card card-rotate-negative">
              <div className="detail-bg" />
              <div className="detail-blur" />
              <div className="detail-content">
                <h4 className="detail-title">Experience</h4>
                <div className="detail-info">
                  <span className="experience-text">{creators[currentIndex].experience}</span>
                </div>
              </div>
            </div>

            {/* Projects Card */}
            <div className="detail-card card-rotate-positive">
              <div className="detail-bg" />
              <div className="detail-blur" />
              <div className="detail-content">
                <h4 className="detail-title">Projects</h4>
                <div className="detail-info">
                  <span className="projects-text">{creators[currentIndex].projects}</span>
                </div>
              </div>
            </div>

            {/* Description Card */}
            <div className="detail-card card-rotate-negative">
              <div className="detail-bg" />
              <div className="detail-blur" />
              <div className="detail-content">
                <h4 className="detail-title">About</h4>
                <div className="detail-info">
                  <p className="description-text">{creators[currentIndex].description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Featured Card with Navigation */}
        <div className="lg:w-1/2 flex items-center justify-center gap-6 relative">
          <button 
            onClick={handlePrev}
            className="z-20 hover:scale-110 transition-transform"
          >
            <ChevronLeft className="w-8 h-8 text-white hover:text-gray-300 transition" />
          </button>

          <div className="relative w-80 h-96">
            <div 
              className="creator-card w-full h-full relative cursor-pointer" 
              onMouseMove={handleMouseMove} 
              onMouseLeave={handleMouseLeave}
              style={{ transform: cardTransform, transition: cardTransform.includes('scale3d(1, 1, 1)') ? 'transform 0.5s ease-out' : 'none' }}
            >
              <div className="bg" />
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

          <button 
            onClick={handleNext}
            className="z-20 hover:scale-110 transition-transform"
          >
            <ChevronRight className="w-8 h-8 text-white hover:text-gray-300 transition" />
          </button>
        </div>
      </div>

      <style jsx>{`
        /* Detail cards for member information */
        .detail-card {
          width: 200px;
          height: 180px;
          position: relative;
          transition: all 0.4s ease;
          cursor: default;
          overflow: hidden;
        }

        .card-rotate-positive {
          transform: rotate(10deg);
        }

        .card-rotate-negative {
          transform: rotate(-10deg);
        }

        .detail-card:hover {
          transform: translateY(-8px) scale(1.02);
        }

        .card-rotate-positive:hover {
          transform: translateY(-8px) scale(1.02) rotate(10deg);
        }

        .card-rotate-negative:hover {
          transform: translateY(-8px) scale(1.02) rotate(-10deg);
        }

        .detail-bg {
          width: 100%;
          height: 100%;
          position: absolute;
          background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.1) 100%);
          border-radius: 16px;
          box-shadow: 
            0 8px 32px rgba(0, 0, 0, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }

        .detail-blur {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.2);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border-radius: 16px;
          z-index: 1;
        }

        .detail-content {
          position: relative;
          z-index: 2;
          padding: 20px;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
        }

        .detail-title {
          font-size: 1rem;
          font-weight: 700;
          color: #fff;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 15px;
          text-shadow: 0 2px 4px rgba(0,0,0,0.5);
        }

        .detail-info {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          gap: 6px;
        }

        .skill-tag {
          background: rgba(255, 255, 255, 0.15);
          padding: 6px 10px;
          border-radius: 8px;
          font-size: 0.8rem;
          font-weight: 500;
          margin: 3px 0;
          display: inline-block;
          border: 1px solid rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          text-shadow: 0 1px 2px rgba(0,0,0,0.5);
        }

        .experience-text, .projects-text {
          font-size: 1.6rem;
          font-weight: 700;
          color: #4ade80;
          text-align: left;
          text-shadow: 0 2px 8px rgba(74, 222, 128, 0.3);
        }

        .description-text {
          font-size: 0.8rem;
          line-height: 1.5;
          text-align: left;
          color: #e5e5e5;
          text-shadow: 0 1px 2px rgba(0,0,0,0.5);
        }

        /* Main featured card */
        .creator-card {
          position: relative;
          cursor: pointer;
          transform-style: preserve-3d;
          transition: transform 0.1s ease-out;
        }

        .creator-card:hover .naruto::after {
          filter: drop-shadow(0 0 35px rgba(255, 255, 255, 0.9));
        }

        .bg {
          width: 100%;
          height: 100%;
          position: absolute;
          background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 50%, #1a1a1a 100%);
          border-radius: 12px;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.6);
          transform-style: preserve-3d;
        }

        .card-bg-image {
          position: absolute;
          width: 100%;
          height: 100%;
          background-image: url('/bgcard.jpg');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          border-radius: 12px;
          opacity: 0.4;
          z-index: 1;
        }

        .naruto {
          position: absolute;
          width: 100%;
          height: 75%;
          background-size: contain;
          background-repeat: no-repeat;
          background-position: center top;
          transition: transform 0.3s ease;
          z-index: 2;
          top: 0;
          border-radius: 12px 12px 0 0;
          transform-style: preserve-3d;
        }

        .creator-card:hover .naruto {
          transform: translateZ(20px);
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
          filter: drop-shadow(0 0 25px rgba(254, 254, 254, 0.8));
          z-index: -1;
          border-radius: 12px 12px 0 0;
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
          font-size: 1.5rem;
          font-weight: 700;
          text-shadow: 0px 2px 8px rgba(0, 0, 0, 0.8);
          margin-bottom: 0.25rem;
        }

        .card-info p {
          font-size: 0.9rem;
          font-weight: 400;
          text-shadow: 0px 1px 6px rgba(0, 0, 0, 0.6);
          opacity: 0.9;
        }

        @media (max-width: 1024px) {
          .detail-card {
            width: 160px;
            height: 140px;
          }
          
          .card-rotate-positive {
            transform: rotate(8deg);
          }

          .card-rotate-negative {
            transform: rotate(-8deg);
          }
          
          .card-rotate-positive:hover {
            transform: translateY(-8px) scale(1.02) rotate(8deg);
          }

          .card-rotate-negative:hover {
            transform: translateY(-8px) scale(1.02) rotate(-8deg);
          }
          
          .detail-content {
            padding: 15px;
          }
          
          .skill-tag {
            font-size: 0.7rem;
            padding: 4px 8px;
          }
          
          .description-text {
            font-size: 0.7rem;
          }

          .experience-text, .projects-text {
            font-size: 1.3rem;
          }

          .detail-title {
            font-size: 0.9rem;
          }
        }

        @media (max-width: 768px) {
          .detail-card {
            width: 140px;
            height: 120px;
          }
          
          .card-rotate-positive {
            transform: rotate(6deg);
          }

          .card-rotate-negative {
            transform: rotate(-6deg);
          }
          
          .card-rotate-positive:hover {
            transform: translateY(-6px) scale(1.01) rotate(6deg);
          }

          .card-rotate-negative:hover {
            transform: translateY(-6px) scale(1.01) rotate(-6deg);
          }
        }
      `}</style>
    </section>
  );
}