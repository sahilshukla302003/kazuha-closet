import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Define a type for your searchable items
interface SearchItem {
  id: string;
  name: string;
  description: string;
  category: 'T-shirt' | 'Wallpaper' | 'Merchandise' | string; // Extend as needed
  imageUrl?: string; // Optional image URL for display
}

// --- MOCK DATA ---
// In a real application, this data would come from your database via an API.
// Adjust this data to accurately represent your actual products and wallpapers.
const allWebsiteItems: SearchItem[] = [
  // Products (from Product Showcase)
  { id: 'prod-naruto-tee', name: 'Naruto T-shirt', description: 'Limited Edition Naruto Tee with unique design, 50% off!', category: 'T-shirt', imageUrl: '/images/products/naruto_tshirt.jpg' },
  { id: 'prod-goku-tee', name: 'Goku T-shirt', description: 'Comfortable Dragon Ball Z themed T-shirt for fans.', category: 'T-shirt', imageUrl: '/images/products/goku_tshirt.jpg' },
  { id: 'prod-sasuke-tee', name: 'Sasuke T-shirt', description: 'Exclusive Sasuke Uchiha T-shirt design.', category: 'T-shirt', imageUrl: '/images/products/sasuke_tshirt.jpg' },
  // Wallpapers
  { id: 'wp-naruto-uzumaki', name: 'Naruto Uzumaki Wallpaper', description: 'High-resolution desktop wallpaper of Naruto Uzumaki.', category: 'Wallpaper', imageUrl: '/images/wallpapers/naruto_wallpaper.jpg' },
  { id: 'wp-my-hero-academia', name: 'My Hero Academia Wallpaper', description: 'Dynamic wallpaper featuring characters from My Hero Academia.', category: 'Wallpaper', imageUrl: '/images/wallpapers/mha_wallpaper.jpg' },
  { id: 'wp-jujutsu-kaisen', name: 'Jujutsu Kaisen Wallpaper', description: 'Intense wallpaper with characters from Jujutsu Kaisen.', category: 'Wallpaper', imageUrl: '/images/wallpapers/jujutsu_kaisen_wallpaper.jpg' },
  { id: 'wp-demon-slayer', name: 'Demon Slayer Wallpaper', description: 'Vibrant wallpaper from Demon Slayer: Kimetsu no Yaiba.', category: 'Wallpaper', imageUrl: '/images/wallpapers/demon_slayer_wallpaper.jpg' },
  // Add other items present on your landing page:
  { id: 'prod-naruto-promo', name: 'Naruto T-shirt Promo', description: 'Special promotion on Naruto T-shirt.', category: 'T-shirt', imageUrl: '/images/products/naruto_tshirt_promo.jpg' }, // Assuming this is from the promo card
  // Add any other products/items you have on your site, matching your 'screen.jpg' content.
];

// Ensure you have these images in your `public/images/products` and `public/images/wallpapers` folders,
// or update the `imageUrl` paths to your actual image locations.

export default function SearchResultsPage() {
  const router = useRouter();
  const { query } = router.query; // Get the 'query' parameter from the URL
  const [searchResults, setSearchResults] = useState<SearchItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // This effect runs only when the component mounts and when `query` changes
    if (query) {
      setLoading(true);
      const searchTerm = (query as string).toLowerCase();

      // --- LOCAL FILTERING (for mock data) ---
      // In a real app, you would make an API call here:
      // fetch(`/api/search?q=${encodeURIComponent(searchTerm)}`)
      //   .then(res => res.json())
      //   .then(data => {
      //     setSearchResults(data);
      //     setLoading(false);
      //   })
      //   .catch(error => {
      //     console.error("Error fetching search results:", error);
      //     setLoading(false);
      //     // Handle error display to user
      //   });

      // Simulating API delay for better UX
      setTimeout(() => {
        const filtered = allWebsiteItems.filter(item =>
          item.name.toLowerCase().includes(searchTerm) ||
          item.description.toLowerCase().includes(searchTerm) ||
          item.category.toLowerCase().includes(searchTerm)
        );
        setSearchResults(filtered);
        setLoading(false);
      }, 300); // Simulate network delay
    } else {
      setSearchResults([]);
      setLoading(false);
    }
  }, [query]); // Dependency array: re-run effect if 'query' changes

  if (!router.isReady || loading) { // isReady ensures router.query is populated
    return (
      <div className="flex justify-center items-center h-screen bg-black text-white">
        Loading search results...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-4 pt-20"> {/* pt-20 to push content below fixed navbar */}
      <h1 className="text-3xl font-bold text-center mb-8">
        Search Results for &quot;{query || ''}&quot;
      </h1>

      {searchResults.length === 0 ? (
        <p className="text-center text-gray-400">No results found for your search.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {searchResults.map((item) => (
            <div key={item.id} className="bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
              {item.imageUrl && (
                <div className="relative w-full h-48">
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-lg"
                  />
                </div>
              )}
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{item.name}</h2>
                <p className="text-gray-300 text-sm mb-2">{item.description}</p>
                <span className="inline-block bg-gray-700 rounded-full px-3 py-1 text-xs font-semibold text-gray-200">
                  {item.category}
                </span>
                {/* Example: Add a link to the detailed product/wallpaper page */}
                {/* You'd replace '/item-details' with your actual dynamic route (e.g., `/products/${item.id}`) */}
                <Link href={`/item-details/${item.id}`} className="block mt-4 text-yellow-400 hover:underline">
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}