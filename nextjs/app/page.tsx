'use client';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import PromoCard from './components/PromoCard';
import ProductShowcase from './components/ProductShowcase';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';

export default function Home() {
  return (
    <main className="relative bg-gradient-to-br from-[#0f0f10] to-[#2c2c2e] min-h-screen scroll-smooth">
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
