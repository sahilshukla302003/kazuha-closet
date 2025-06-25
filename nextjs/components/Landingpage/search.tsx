// search.tsx
// "use client";
import { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation"; // Import useRouter
import { products } from '../All_product'; // Assuming components is a direct sibling to search.tsx, or adjust to '@/components/All_product' if using aliases
import { wallpapers as rawWallpapers } from '../Wallpaper_details'; // Assuming Wallpaper_details.tsx is still a sibling

// Define a unified interface for items that can be searched across products and wallpapers
interface SearchItem {
  id: string;
  name: string;
  description: string;
  category: string;
  imageUrl: string; // Ensure imageUrl is always present or has a good fallback
  itemType: 'product' | 'wallpaper' | 'product_category'; // Added 'product_category'
  originalProductId?: string; // Only for products, to store the original ID for navigation
}

/**
 * Transforms data from products (from All_product.tsx) and wallpapers (from Wallpaper_details.tsx)
 * into a single, unified array of SearchItem objects.
 * This makes all relevant data searchable from one source.
 */
const transformData = (): SearchItem[] => {
  const transformedItems: SearchItem[] = [];

  // 1. Add a generic "All Products" (e.g., All T-shirts) suggestion
  transformedItems.push({
    id: 'product-all-generic',
    name: 'All T-shirts',
    description: 'Browse the entire collection of anime T-shirts.',
    category: 'All', // Matches the 'All' category in All_product.tsx
    imageUrl: 'https://placehold.co/60x60/888888/FFFFFF?text=Products', // Placeholder
    itemType: 'product_category', // New type
  });

  // 2. Transform Products from All_product.tsx
  const productCategories: Set<string> = new Set(); // To collect unique product categories
  products.forEach(product => {
    transformedItems.push({
      id: product.id,
      name: product.name,
      description: product.description,
      category: product.category,
      imageUrl: product.thumbnail || (product.type === 'video'
                  ? 'https://placehold.co/60x60/333333/FFFFFF?text=Video'
                  : 'https://placehold.co/60x60/555555/FFFFFF?text=Product'),
      itemType: 'product',
      originalProductId: product.id,
    });
    productCategories.add(product.category);
  });

  // 3. Add category-specific "T-shirts" suggestions (e.g., "Naruto T-shirts")
  productCategories.forEach(category => {
    if (category !== 'All') { // Avoid duplicating "All T-shirts"
      transformedItems.push({
        id: `product-category-${category.toLowerCase()}`,
        name: `${category} T-shirts`,
        description: `Explore T-shirts from the ${category} collection.`,
        category: category,
        imageUrl: `https://placehold.co/60x60/999999/FFFFFF?text=${category}`, // Placeholder
        itemType: 'product_category',
      });
    }
  });


  // 4. Add a generic "All Wallpapers" suggestion
  transformedItems.push({
    id: 'wallpaper-all-generic',
    name: 'All Wallpapers',
    description: 'Browse the entire collection of anime wallpapers.',
    category: 'all', // Matches the 'all' category in Wallpaper_details.tsx
    imageUrl: 'https://placehold.co/60x60/888888/FFFFFF?text=Wallpapers', // A generic placeholder image for "All Wallpapers"
    itemType: 'wallpaper', // Keep as wallpaper type for consistency with its page
  });

  // 5. Transform Wallpapers from Wallpaper_details.tsx
  Object.entries(rawWallpapers).forEach(([categoryKey, urls]) => {
    const formattedCategoryLabel = categoryKey.replace(/([a-z])([A-Z])/g, "$1 $2")
                                             .replace(/^\w/, (c) => c.toUpperCase());

    // Add a generic category-specific wallpaper suggestion (e.g., "Naruto Wallpapers")
    if (urls.length > 0) { // Ensure there are images for this category
      transformedItems.push({
        id: `wallpaper-${categoryKey}-generic`,
        name: `${formattedCategoryLabel} Wallpapers`,
        description: `Explore ${formattedCategoryLabel}-themed wallpapers.`,
        category: categoryKey, // Use the raw key for consistency in URL params
        imageUrl: urls[0], // Use the first image of the category as thumbnail
        itemType: 'wallpaper',
      });
    }

    // Add individual wallpaper image entries
    (urls as string[]).forEach((url, index) => {
      transformedItems.push({
        id: `wallpaper-${categoryKey}-${index}`,
        name: `${formattedCategoryLabel} Wallpaper ${index + 1}`,
        description: `High-quality ${formattedCategoryLabel} anime wallpaper.`,
        category: categoryKey, // Use the raw key for consistency in URL params
        imageUrl: url,
        itemType: 'wallpaper',
      });
    });
  });

  return transformedItems;
};

// Define props for the SearchBar component, including optional mobile styling and a close callback
interface SearchBarProps {
  isMobile?: boolean; // Prop to adjust styling for mobile layout
  onClose?: () => void; // Callback function to close the search bar/overlay (e.g., used by Navbar)
}

/**
 * SearchBar component provides a search input with live filtering and navigation
 * to product or wallpaper detail pages.
 */
export default function SearchBar({ isMobile = false, onClose }: SearchBarProps) {
  const [query, setQuery] = useState(""); // State for the current search query
  const router = useRouter(); // Initialize Next.js router for programmatic navigation
  const searchBarRef = useRef<HTMLDivElement>(null); // Ref for the search bar component, used for focus and click-outside logic

  // Memoize the full list of searchable items to avoid re-generating it on every re-render.
  // This is crucial for performance, especially with large datasets.
  const allSearchableItems = useMemo(() => transformData(), []);

  // Filter items based on the current search query.
  const filteredItems = allSearchableItems.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase()) ||
    item.description.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase())
  );

  // Effect to automatically focus the input field when the component (specifically mobile version) becomes visible.
  useEffect(() => {
    if (isMobile && searchBarRef.current) {
      const inputElement = searchBarRef.current.querySelector('input');
      if (inputElement) {
        inputElement.focus(); // Focus the search input for immediate typing
      }
    }
  }, [isMobile]); // Re-run this effect when isMobile changes (e.g., when mobile search opens/closes)

  /**
   * Handles navigation when a search result item is clicked.
   * Differentiates between 'product', 'product_category' and 'wallpaper' item types to navigate correctly.
   * @param {SearchItem} item - The clicked search result item.
   */
  const handleItemClick = (item: SearchItem) => {
    if (item.itemType === 'product' && item.originalProductId) {
      // If it's an individual product, navigate to its details page
      localStorage.setItem('productid', item.originalProductId);
      router.push('/product_page/');
    } else if (item.itemType === 'product_category') {
      // If it's a product category suggestion (e.g., "Naruto T-shirts" or "All T-shirts"),
      // navigate to allproducts (no underscore) with the category filter, but NO search term.
      router.push(`/allproducts?category=${encodeURIComponent(item.category)}`); // Changed from /all_products
    } else if (item.itemType === 'wallpaper') {
      // If it's a wallpaper (either generic or specific image), navigate to wallpapers page
      router.push(`/wallpapers?category=${encodeURIComponent(item.category)}`);
    }
    // If an onClose callback is provided (typically by Navbar), execute it to close the search overlay/modal.
    if (onClose) {
      onClose();
    }
  };

  const handleSearchSubmit = () => {
    if (query.trim()) {
      const lowerCaseQuery = query.toLowerCase();

      // Check if the query *exactly matches* a product category suggestion's name.
      // This is for cases like typing "All T-shirts" and hitting enter.
      const matchedProductCategoryByName = filteredItems.find(item =>
        item.itemType === 'product_category' && item.name.toLowerCase() === lowerCaseQuery
      );

      if (matchedProductCategoryByName) {
        router.push(`/allproducts?category=${encodeURIComponent(matchedProductCategoryByName.category)}`); // Changed from /all_products
      } else if (lowerCaseQuery.includes('wallpaper')) {
        // If it explicitly includes 'wallpaper', treat it as a general wallpaper search
        router.push(`/wallpapers?search=${encodeURIComponent(query.trim())}`);
      } else {
        // For all other cases (including general product terms like "naruto" without matching a category suggestion),
        // redirect to allproducts (no underscore) and pass the query as a 'search' parameter.
        router.push(`/allproducts?search=${encodeURIComponent(query.trim())}`); // Changed from /all_products
      }

      if (onClose) {
        onClose(); // Close the search bar/overlay
      }
    }
  };


  return (
    // Main container for the search bar, dynamically styled based on 'isMobile' prop.
    <div
      ref={searchBarRef} // Attach ref here for external click detection and internal focus
      className={`relative ${isMobile ? 'w-full' : 'w-full max-w-xl'}`} // Adjust width for mobile vs desktop view
    >
      {/* Search input field, icon, and basic styling */}
      <div className={`flex items-center rounded-full px-4 py-2 shadow-inner ${isMobile ? 'bg-white/90' : 'bg-white/80'}`}>
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-600 mr-2" fill="none" stroke="currentColor">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="text"
          value={query} // Controlled component for search input
          onChange={(e) => setQuery(e.target.value)} // Update query state on every input change
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearchSubmit(); // Call the new submit handler on Enter
            }
          }}
          placeholder="Search T-shirts, Wallpapers, etc..." // Informative placeholder text
          className="bg-transparent outline-none text-sm w-full text-black placeholder-gray-500"
        />
      </div>

      {/* Conditional rendering for the search results dropdown.
          Only appears if there's a query. */}
      {query && (
        <div className={`absolute left-0 right-0 mt-2 p-2 rounded-xl shadow-lg bg-white border border-gray-200 z-50 ${
          isMobile ? 'top-full' : 'top-full' // Position results directly below the input for both desktop and mobile
        }`}>
          {filteredItems.length > 0 ? (
            // Container for filtered results. Added max-height and overflow for scrollability.
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {filteredItems.map((item) => (
                // Each individual search result item, styled for clickability.
                <div
                  key={item.id} // Unique key for efficient list rendering
                  onClick={() => handleItemClick(item)} // Handle click event to navigate
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors duration-200"
                  role="button" // Improves accessibility, indicating this div is interactive
                  tabIndex={0} // Makes the div keyboard-focusable
                  onKeyDown={(e) => { // Handles keyboard interactions (Enter/Space) for accessibility
                    if (e.key === 'Enter' || e.key === ' ') {
                      handleItemClick(item);
                    }
                  }}
                >
                  {item.imageUrl && (
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      width={48} // Small, consistent image size for search results
                      height={48}
                      className="rounded-md object-cover flex-shrink-0"
                    />
                  )}
                  <div className="flex-grow">
                    <p className="font-semibold text-gray-800 text-sm">{item.name}</p>
                    <p className="text-xs text-gray-500 line-clamp-1">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Message displayed when no results match the current query
            <p className="p-3 text-red-500 text-sm text-center">No results found for &quot;{query}&quot;.</p>
          )}
        </div>
      )}
    </div>
  );
}