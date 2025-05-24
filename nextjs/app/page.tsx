'use client';

import Sidebar from '../components/Landingpage/Sidebar';
import Navbar from '../components/Landingpage/Navbar';
import PromoCard from '../components/Landingpage/PromoCard';
import ProductShowcase from '../components/Landingpage/ProductShowcase';
import AboutSection from '../components/Landingpage/AboutSection';
import ContactSection from '../components/Landingpage/ContactSection';

export default function Home() {
  return (
    <main className="relative bg-gradient-to-bl from-[#000000] to-[#a3a3a3] min-h-screen scroll-smooth">
      <Sidebar />

      {/* Home Section */}
      <section id="home" className="p-10 transition-all duration-300">
        <Navbar />
        <PromoCard />
      </section>

      {/* Products Section */}
      <section id="products">
        <ProductShowcase />
      </section>

      {/* About Section */}
      <section id="about" className="flex justify-center items-center h-screen">
        <AboutSection />
      </section>

      {/* Contact Section */}
      <ContactSection />
    </main>
  );
}
