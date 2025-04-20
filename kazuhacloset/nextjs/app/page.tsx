'use client';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import PromoCard from './components/PromoCard';
import ProductShowcase from './components/ProductShowcase';
import AboutSection from './components/AboutSection';

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
      <AboutSection />

      {/* Contact Section */}
      <section id="contact" className="h-screen p-10 text-white">
        <h2 className="text-3xl font-bold mb-4">Contact</h2>
        <p>This is the Contact section. You can add a form or contact info here.</p>
      </section>
    </main>
  );
}