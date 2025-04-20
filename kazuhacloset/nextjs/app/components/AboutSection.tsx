import Image from "next/image";

export default function AboutSection() {
  return (
    <section id="about" className="relative bg-[#121212] text-white py-20 px-6 md:px-20 overflow-hidden">
      {/* Decorative Background Image (Naruto Silhouette) */}
      <Image
        src="/kakashi.png"
        alt="Naruto Silhouette"
        width={240}
        height={240}
        className="absolute left-0 top-10 w-40 md:w-60 opacity-10 rotate-[-10deg] animate-float-slow img-glow"
        loading="lazy"
      />

      {/* Konoha Symbol (top right) */}
      <Image
        src="/itachi.png"
        alt="Konoha Symbol"
        width={96}
        height={96}
        className="absolute right-5 top-5 w-16 md:w-24 opacity-20 animate-float"
        loading="lazy"
      />

      {/* Floating sparkles */}
      <div className="sparkle" style={{ top: '25%', left: '15%' }} />
      <div className="sparkle" style={{ top: '40%', left: '80%' }} />
      <div className="sparkle" style={{ top: '60%', left: '30%' }} />

      <div className="max-w-5xl mx-auto text-center z-10 relative">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-wide drop-shadow-[2px_2px_0px_rgba(255,255,255,0.2)] animate-slide-up">
          ABOUT KAZUHA CLOSET
        </h2>
        <p className="text-lg md:text-xl leading-relaxed text-gray-300 animate-fade-in-slow">
          Kazuha Closet isn’t just about apparel — it’s a <span className="text-yellow-400 font-bold">shinobi-style movement</span>. 
          Inspired by legends like Naruto, Sasuke, Luffy, and beyond, our mission is to bring your favorite anime worlds to life 
          through bold, battle-ready streetwear. Each tee is forged from high-quality fabric and designed with precision — perfect 
          for fans who wear their pride like a true ninja wears their headband.
        </p>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[#1e1e1e] p-6 rounded-xl shadow-lg hover:shadow-yellow-400/30 transition animate-slide-up delay-100">
            <h3 className="text-xl font-semibold mb-2 text-yellow-400">Anime Powered</h3>
            <p className="text-gray-400">Every design is infused with chakra from iconic anime — from Konoha to Grand Line.</p>
          </div>
          <div className="bg-[#1e1e1e] p-6 rounded-xl shadow-lg hover:shadow-yellow-400/30 transition animate-slide-up delay-200">
            <h3 className="text-xl font-semibold mb-2 text-yellow-400">Made to Flex</h3>
            <p className="text-gray-400">Not just merch — it’s a fashion statement built for comfort, confidence, and conquests.</p>
          </div>
          <div className="bg-[#1e1e1e] p-6 rounded-xl shadow-lg hover:shadow-yellow-400/30 transition animate-slide-up delay-300">
            <h3 className="text-xl font-semibold mb-2 text-yellow-400">Limited Drops</h3>
            <p className="text-gray-400">You won’t find these anywhere else. Stay tuned for our next exclusive release.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
