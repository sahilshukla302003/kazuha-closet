"use client";
import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

type Product = {
  id: number;
  name: string;
  price: string;
  type: "video" | "image";
  video: string;
  description: string;
};

const products: Product[] = [
  {
    id: 1,
    name: "Naruto Tee",
    price: "₹599",
    type: "video",
    video: "/videos/goku.mp4",
    description: "High-quality Naruto-themed T-shirt with durable print.",
  },
  {
    id: 2,
    name: "Luffy Tee",
    price: "₹649",
    type: "video",
    video: "/videos/naruto.mp4",
    description: "One Piece Luffy T-shirt made of soft, breathable fabric.",
  },
  {
    id: 3,
    name: "Sasuke Tee",
    price: "₹699",
    type: "video",
    video: "/videos/toji.mp4",
    description: "Cool and stylish Sasuke Tee with a bold ninja design.",
  },
];

const ProductShowcase = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const observerRef = useRef<(HTMLVideoElement | null)[]>([]);
  const router = useRouter();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const videoElement = entry.target as HTMLVideoElement;
            videoElement.load();
          }
        });
      },
      { threshold: 0.1 }
    );

    observerRef.current.forEach((video) => {
      if (video) observer.observe(video);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="relative w-full h-[90vh] flex items-center justify-center"
      style={{
        backgroundImage: `url('/background.jpg')`,
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="overflow-x-auto flex gap-10 px-16 py-20 snap-x snap-mandatory">
        {products.map((product, index) => (
          <div
            key={product.id}
            className={`snap-center flex-shrink-0 w-[280px] md:w-[360px] rounded-xl cursor-pointer 
              ${index === 1 ? "scale-110 z-10" : "scale-90"} 
              opacity-100 transition-all duration-500`}
            onClick={() => setSelectedProduct(product)}
          >
            <div className="bg-black/20 backdrop-blur-md border border-white/20 p-4 rounded-2xl shadow-2xl hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] transition-all duration-500 ease-in-out transform hover:scale-105 relative">
              {product.type === "video" ? (
                <video
                  ref={(el) => {
                    if (el && !observerRef.current.includes(el)) {
                      observerRef.current.push(el);
                    }
                  }}
                  src={product.video}
                  muted
                  loop
                  playsInline
                  preload="none"
                  className="w-full h-[320px] object-contain rounded-lg"
                  onMouseEnter={(e) => {
                    const playPromise = e.currentTarget.play();
                    if (playPromise !== undefined) {
                      playPromise.catch((error) =>
                        console.warn("Video play interrupted", error)
                      );
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.pause();
                    e.currentTarget.currentTime = 0;
                  }}
                />
              ) : (
                <img
                  className="rounded-xl w-full h-[320px] object-cover mb-4"
                  src={product.video}
                  alt={product.name}
                />
              )}
              <div className="text-center mt-2">
                <h2 className="text-white text-xl font-bold mb-1">
                  {product.name}
                </h2>
                <p className="text-yellow-400 text-lg font-semibold">
                  {product.price}
                </p>
              </div>
              <button className="w-full mt-4 px-4 py-2 bg-gray-300 hover:bg-gray-400 text-black text-lg font-semibold rounded-full transition-transform duration-300 hover:scale-105 shadow-md">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Navigate to all products */}
      <div className="absolute top-10 right-10">
        <button
          onClick={() => router.push("/All_Products_page")}
          className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-6 rounded-full shadow-lg transition-transform duration-300 hover:scale-105"
        >
          View All Products
        </button>
      </div>

      {/* Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white w-[90%] md:w-[500px] p-8 rounded-2xl shadow-2xl relative border border-yellow-400">
            <button
              className="absolute top-2 right-3 text-black text-2xl font-bold"
              onClick={() => setSelectedProduct(null)}
            >
              &times;
            </button>
            <h2 className="text-3xl font-extrabold mb-4 text-center text-black border-b pb-2">
              {selectedProduct.name}
            </h2>
            <p className="text-black text-lg mb-4 text-center">
              {selectedProduct.description}
            </p>
            <p className="text-yellow-600 text-2xl font-bold mb-6 text-center">
              {selectedProduct.price}
            </p>
            {selectedProduct.type === "video" ? (
              <video
                src={selectedProduct.video}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-auto object-contain rounded-xl shadow-md"
              />
            ) : (
              <img
                className="rounded-xl w-full object-cover shadow-md mb-4"
                src={selectedProduct.video}
                alt={selectedProduct.name}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductShowcase;





// "use client";
// import React, { useState, useRef, useEffect } from "react";

// type Product = {
//   id: number;
//   name: string;
//   price: string;
//   type: "video" | "image";
//   video: string;
//   description: string;
// };

// const products: Product[] = [
//   {
//     id: 1,
//     name: "Naruto Tee",
//     price: "₹599",
//     type: "video",
//     video: "/videos/goku.mp4",
//     description: "High-quality Naruto-themed T-shirt with durable print.",
//   },
//   {
//     id: 2,
//     name: "Luffy Tee",
//     price: "₹649",
//     type: "video",
//     video: "/videos/naruto.mp4",
//     description: "One Piece Luffy T-shirt made of soft, breathable fabric.",
//   },
//   {
//     id: 3,
//     name: "Sasuke Tee",
//     price: "₹699",
//     type: "video",
//     video: "/videos/toji.mp4",
//     description: "Cool and stylish Sasuke Tee with a bold ninja design.",
//   },
// ];

// const ProductShowcase = () => {
//   const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
//   const observerRef = useRef<(HTMLVideoElement | null)[]>([]);

//   // Optional: use IntersectionObserver to preload
//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             const videoElement = entry.target as HTMLVideoElement;
//             videoElement.load(); // Preload when visible
//           }
//         });
//       },
//       { threshold: 0.1 }
//     );

//     observerRef.current.forEach((video) => {
//       if (video) {
//         observer.observe(video);
//       }
//     });

//     return () => observer.disconnect();
//   }, []);

//   return (
//     <div
//       className="relative w-full h-[90vh] flex items-center justify-center"
//       style={{
//         backgroundImage: `url('/background.jpg')`,
//         backgroundAttachment: "fixed",
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//       }}
//     >
//       <div className="overflow-x-auto flex gap-10 px-16 py-20 snap-x snap-mandatory">
//         {products.map((product, index) => (
//           <div
//             key={product.id}
//             className={`snap-center flex-shrink-0 w-[280px] md:w-[360px] rounded-xl cursor-pointer 
//               ${index === 1 ? "scale-110 z-10" : "scale-90"} 
//               opacity-100 transition-all duration-500`}
//             onClick={() => setSelectedProduct(product)}
//           >
//             <div className="bg-black/20 backdrop-blur-md border border-white/20 p-4 rounded-2xl shadow-2xl hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] transition-all duration-500 ease-in-out transform hover:scale-105 relative">
//               {product.type === "video" ? (
//                 <video
//                   ref={(el) => {
//                     if (el && !observerRef.current.includes(el)) {
//                       observerRef.current.push(el);
//                     }
//                   }}
//                   src={product.video}
//                   muted
//                   loop
//                   playsInline
//                   preload="none"
//                   className="w-full h-[320px] object-contain rounded-lg"
//                   onMouseEnter={(e) => {
//                     const playPromise = e.currentTarget.play();
//                     if (playPromise !== undefined) {
//                       playPromise.catch((error) => {
//                         console.warn("Video play interrupted", error);
//                       });
//                     }
//                   }}
//                   onMouseLeave={(e) => {
//                     e.currentTarget.pause();
//                     e.currentTarget.currentTime = 0;
//                   }}
                  
//                 />
//               ) : (
//                 <img
//                   className="rounded-xl w-full h-[320px] object-cover mb-4"
//                   src={product.video}
//                   alt={product.name}
//                 />
//               )}

//               <div className="text-center mt-2">
//                 <h2 className="text-white text-xl font-bold mb-1">
//                   {product.name}
//                 </h2>
//                 <p className="text-yellow-400 text-lg font-semibold">
//                   {product.price}
//                 </p>
//               </div>
//               <button className="w-full mt-4 px-4 py-2 bg-gray-300 hover:bg-gray-400 text-black text-lg font-semibold rounded-full transition-transform duration-300 hover:scale-105 shadow-md">
//                 Add to Cart
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Quick View Modal */}
//       {selectedProduct && (
//         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
//           <div className="bg-white w-[90%] md:w-[500px] p-8 rounded-2xl shadow-2xl relative border border-yellow-400">
//             <button
//               className="absolute top-2 right-3 text-black text-2xl font-bold"
//               onClick={() => setSelectedProduct(null)}
//             >
//               &times;
//             </button>
//             <h2 className="text-3xl font-extrabold mb-4 text-center text-black border-b pb-2">
//               {selectedProduct.name}
//             </h2>
//             <p className="text-black text-lg mb-4 text-center">
//               {selectedProduct.description}
//             </p>
//             <p className="text-yellow-600 text-2xl font-bold mb-6 text-center">
//               {selectedProduct.price}
//             </p>
//             {selectedProduct.type === "video" ? (
//               <video
//                 src={selectedProduct.video}
//                 autoPlay
//                 muted
//                 loop
//                 playsInline
//                 className="w-full h-auto object-contain rounded-xl shadow-md"
//               />
//             ) : (
//               <img
//                 className="rounded-xl w-full object-cover shadow-md mb-4"
//                 src={selectedProduct.video}
//                 alt={selectedProduct.name}
//               />
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProductShowcase;
