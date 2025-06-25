// components/All_product.tsx
"use client";
import React, { useState, useMemo, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, Grid, List, Heart, ShoppingCart, Star, Eye, SlidersHorizontal } from "lucide-react";
import Navbar from "./Landingpage/Navbar"; // Assuming Navbar is still here relative to this file

// Export the Product type so it can be used in other files (e.g., search.tsx)
export type Product = {
    id: string;
    name: string;
    price: string;
    originalPrice?: string;
    type: "video" | "image";
    video: string;
    thumbnail?: string;
    description: string;
    category: string;
    rating: number;
    reviews: number;
    inStock: boolean;
    isNew?: boolean;
    isSale?: boolean;
    tags: string[];
};

// Export the products array so it can be used in other files (e.g., search.tsx)
export const products: Product[] = [
  {
    id: "naruto-tee-001",
    name: "Naruto Tee",
    price: "₹599",
    originalPrice: "₹799",
    type: "image",
    video: "",
    thumbnail: "/Productimage/Naruto/front.png",
    description: "High-quality Naruto-themed T-shirt with durable print and premium cotton fabric.",
    category: "Naruto",
    rating: 4.8,
    reviews: 156,
    inStock: true,
    isSale: true,
    tags: ["anime", "naruto", "cotton", "comfortable"]
  },
  {
    id: "giyu-tee-001",
    name: "Giyu Tee",
    price: "₹449",
    originalPrice: "₹649",
    type: "image",
    video: "",
    thumbnail: "/Productimage/GIYU/front.jpg",
    description: "Stylish Giyu Tomioka T-shirt",
    category: "Demon Slayer",
    rating: 4.9,
    reviews: 0,
    inStock: true,
    tags: ["anime", "Demon Slayer", "Giyu", "T-shirt"]
  },
  {
    id: "itachi-tee-001",
    name: "Itachi Tee",
    price: "₹429",
    originalPrice: "₹629",
    type: "image",
    video: "",
    thumbnail: "/Productimage/ITACHI/front.jpg",
    description: "Elegant Itachi Uchiha design tee",
    category: "Naruto",
    rating: 4.7,
    reviews: 0,
    inStock: true,
    tags: ["anime", "Naruto", "Itachi", "Uchiha"]
  },
  {
    id: "rengoku-tee-001",
    name: "Rengoku Tee",
    price: "₹459",
    originalPrice: "₹659",
    type: "image",
    video: "",
    thumbnail: "/Productimage/RENGOKU/back.jpg",
    description: "Fiery Rengoku Flame Hashira tee",
    category: "Demon Slayer",
    rating: 4.9,
    reviews: 0,
    inStock: true,
    tags: ["anime", "Demon Slayer", "Rengoku", "Flame Hashira"]
  },
  {
    id: "jiraiya-tee-001",
    name: "Jiraiya Tee",
    price: "₹419",
    originalPrice: "₹619",
    type: "image",
    video: "",
    thumbnail: "/Productimage/JIRAYA/front.jpg",
    description: "Legendary Sannin Jiraiya T-shirt",
    category: "Naruto",
    rating: 4.6,
    reviews: 0,
    inStock: true,
    tags: ["anime", "Naruto", "Jiraiya", "Sannin"]
  }
];

const categories = ["All", "Naruto", "One Piece", "Dragon Ball", "Jujutsu Kaisen"];
const sortOptions = [
    { value: "default", label: "Default" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "rating", label: "Highest Rated" },
    { value: "name", label: "Name A-Z" }
];

export const All_product = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Initialize state from URL params on first render
    const [searchTerm, setSearchTerm] = useState(() => searchParams.get('search') || "");
    const [selectedCategory, setSelectedCategory] = useState(() => searchParams.get('category') || "All");

    // Other states
    const [sortBy, setSortBy] = useState("default");
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [showFilters, setShowFilters] = useState(false);
    const [priceRange, setPriceRange] = useState([0, 1000]);
    const [wishlist, setWishlist] = useState<string[]>([]);
    const [imageErrors, setImageErrors] = useState<string[]>([]);


    // This useEffect will update internal state when URL params change (e.g., navigating from search)
    useEffect(() => {
        const urlCategory = searchParams.get('category');
        const urlSearch = searchParams.get('search');

        let newCategory = selectedCategory;
        let newSearchTerm = searchTerm;

        // If URL has a category, use it
        if (urlCategory !== null) {
            newCategory = urlCategory;
            newSearchTerm = ""; // Clear search term if category is set from URL
        }
        // If URL has a search term AND no category (or category is "All"), use search term
        else if (urlSearch !== null) {
            newSearchTerm = urlSearch;
            newCategory = "All"; // Set category to All if a search term is active
        } else {
            // Default case: no specific params, reset to "All" and empty search
            newCategory = "All";
            newSearchTerm = "";
        }

        // Only update state if it's different from the new determined values
        if (newCategory !== selectedCategory) {
            setSelectedCategory(newCategory);
        }
        if (newSearchTerm !== searchTerm) {
            setSearchTerm(newSearchTerm);
        }

    }, [searchParams]); // Dependency array: only re-run when searchParams object changes


    // Function to handle changing the category via buttons
    const handleCategoryButtonClick = (category: string) => {
        // Update the URL to reflect the new category.
        // This is crucial because it triggers the useEffect above to re-sync.
        const newUrl = new URL(window.location.href);
        newUrl.searchParams.set('category', category);
        newUrl.searchParams.delete('search'); // Clear search param when selecting a category
        router.push(newUrl.pathname + newUrl.search); // Use push to update the URL

        // Also update the internal state immediately for snappier UI,
        // although useEffect will eventually sync it anyway.
        setSelectedCategory(category);
        setSearchTerm("");
    };

    // Function to handle search input changes (onKeyDown for Enter, or on form submit)
    const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newSearchTerm = e.target.value;
        setSearchTerm(newSearchTerm); // Update internal state immediately

        // Don't update URL on every keystroke, wait for submit or use a debounce.
        // For now, we'll keep the URL update to the handleSearchSubmit for clarity.
        // If you want live URL updates on type, consider debouncing this `router.push`.
    };

    const handleSearchSubmit = () => {
        const newUrl = new URL(window.location.href);
        if (searchTerm.trim() !== "") {
            newUrl.searchParams.set('search', encodeURIComponent(searchTerm.trim()));
            newUrl.searchParams.delete('category'); // Clear category param when searching
        } else {
            newUrl.searchParams.delete('search');
            // If search is cleared, default to "All" category
            newUrl.searchParams.set('category', 'All');
        }
        router.push(newUrl.pathname + newUrl.search);
        // setSelectedCategory("All"); // Ensure category is "All" if a search term is present
    };


    // Other navigation functions (remain unchanged)
    const navigateToProduct = (productId: string) => {
        localStorage.setItem("productid",productId);
        router.push(`/product_page/`);
    };

    const handleQuickView = (e: React.MouseEvent, productId: string) => {
        e.stopPropagation();
        navigateToProduct(productId);
    };

    const handleImageClick = (productId: string) => {
        navigateToProduct(productId);
    };

    // Handle image errors
    const handleImageError = (productId: string) => {
        setImageErrors(prev => [...prev, productId]);
    };

    // Get fallback image or placeholder - improved version
    const getImageSrc = (product: Product) => {
        if (imageErrors.includes(product.id)) {
            // Return a nice placeholder image instead of showing the path
            return `data:image/svg+xml,${encodeURIComponent(`
                <svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
                    <rect width="400" height="400" fill="#1a1a1a"/>
                    <text x="200" y="180" text-anchor="middle" fill="#666" font-family="Arial" font-size="16">${product.name}</text>
                    <text x="200" y="220" text-anchor="middle" fill="#999" font-family="Arial" font-size="14">Image Not Available</text>
                </svg>
            `)}`;
        }
        return product.thumbnail || `data:image/svg+xml,${encodeURIComponent(`
            <svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
                <rect width="400" height="400" fill="#1a1a1a"/>
                <text x="200" y="180" text-anchor="middle" fill="#666" font-family="Arial" font-size="16">${product.name}</text>
                <text x="200" y="220" text-anchor="middle" fill="#999" font-family="Arial" font-size="14">Loading...</text>
            </svg>
        `)}`;
    };


    // Filter and sort products (logic remains unchanged)
    const filteredAndSortedProducts = useMemo(() => {
        const filtered = products.filter(product => {
            // Check if product matches the current search term (if any)
            const matchesSearch = searchTerm === "" ||
                                  product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                  product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                  product.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

            // Check if product matches the selected category
            const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;

            const price = parseInt(product.price.replace("₹", ""));
            const matchesPrice = price >= priceRange[0] && price <= priceRange[1];

            return matchesSearch && matchesCategory && matchesPrice;
        });

        // Sort products
        switch (sortBy) {
            case "price-low":
                filtered.sort((a, b) => parseInt(a.price.replace("₹", "")) - parseInt(b.price.replace("₹", "")));
                break;
            case "price-high":
                filtered.sort((a, b) => parseInt(b.price.replace("₹", "")) - parseInt(a.price.replace("₹", "")));
                break;
            case "rating":
                filtered.sort((a, b) => b.rating - a.rating);
                break;
            case "name":
                filtered.sort((a, b) => a.name.localeCompare(b.name));
                break;
            default:
                break;
        }

        return filtered;
    }, [searchTerm, selectedCategory, sortBy, priceRange]);

    const toggleWishlist = (e: React.MouseEvent, productId: string) => {
        e.stopPropagation(); // Prevent navigating when clicking wishlist
        setWishlist(prev =>
            prev.includes(productId)
                ? prev.filter(id => id !== productId)
                : [...prev, productId]
        );
    };

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, i) => (
            <Star
                key={i}
                className={`w-3 h-3 sm:w-4 sm:h-4 ${i < Math.floor(rating) ? 'fill-white text-white' : 'text-gray-400'}`}
            />
        ));
    };

    return (
        <main className="relative bg-gradient-to-bl from-[#000000] to-[#a3a3a3] min-h-screen scroll-smooth text-white">
            <Navbar/>

            {/* Header Section */}
            <div className="pt-24 pb-8 px-3 sm:px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-6 sm:mb-8">
                        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 text-white">
                            PREMIUM ANIME COLLECTION
                        </h1>
                        <p className="text-gray-400 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto px-2">
                            Discover our exclusive range of high-quality anime T-shirts crafted for true fans
                        </p>
                    </div>

                    {/* Search and Filters */}
                    <div className="bg-black/40 backdrop-blur-xl border border-white/20 rounded-2xl p-3 sm:p-6 mb-6 sm:mb-8 shadow-2xl shadow-white/10 hover:shadow-white/20 transition-all duration-500">
                        <div className="flex flex-col gap-3 sm:gap-4">
                            {/* Search Bar */}
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    value={searchTerm}
                                    onChange={handleSearchInputChange}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            handleSearchSubmit();
                                        }
                                    }}
                                    className="w-full pl-10 pr-4 py-2 sm:py-3 bg-black/60 backdrop-blur-md border border-white/30 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:border-white focus:bg-black/40 focus:shadow-lg focus:shadow-white/20 transition-all text-sm sm:text-base"
                                />
                                {/* Add a search icon button if needed for explicit submit */}
                                {/* <button onClick={handleSearchSubmit} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                    <Search />
                                </button> */}
                            </div>

                            {/* Category Filter */}
                            <div className="flex flex-wrap gap-1.5 sm:gap-2">
                                {categories.map(category => (
                                    <button
                                        key={category}
                                        onClick={() => handleCategoryButtonClick(category)}
                                        className={`px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-full transition-all duration-300 font-medium backdrop-blur-md text-xs sm:text-sm ${
                                            selectedCategory === category
                                                ? 'bg-white/90 text-black shadow-lg shadow-white/30'
                                                : 'bg-black/50 hover:bg-black/30 text-white border border-white/30 hover:border-white/50 hover:shadow-md hover:shadow-white/20'
                                        }`}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>

                            {/* Controls */}
                            <div className="flex items-center justify-between gap-3 sm:gap-4">
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="bg-black/60 backdrop-blur-md border border-white/30 rounded-xl px-2.5 py-2 sm:px-3 text-white focus:outline-none focus:border-white focus:bg-black/40 focus:shadow-lg focus:shadow-white/20 transition-all text-xs sm:text-sm flex-1 sm:flex-none"
                                >
                                    {sortOptions.map(option => (
                                        <option key={option.value} value={option.value} className="bg-black text-white">
                                            {option.label}
                                        </option>
                                    ))}
                                </select>

                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => setShowFilters(!showFilters)}
                                        className="p-2 bg-black/60 hover:bg-black/40 backdrop-blur-md border border-white/30 rounded-xl hover:border-white/50 hover:shadow-md hover:shadow-white/20 transition-all"
                                    >
                                        <SlidersHorizontal className="w-4 h-4 sm:w-5 sm:h-5" />
                                    </button>

                                    <div className="flex bg-black/60 backdrop-blur-md rounded-xl p-1 border border-white/30">
                                        <button
                                            onClick={() => setViewMode("grid")}
                                            className={`p-1.5 sm:p-2 rounded-lg transition-all ${
                                                viewMode === "grid" ? 'bg-white/90 text-black shadow-md shadow-white/30' : 'text-white hover:bg-white/20'
                                            }`}
                                        >
                                            <Grid className="w-4 h-4 sm:w-5 sm:h-5" />
                                        </button>
                                        <button
                                            onClick={() => setViewMode("list")}
                                            className={`p-1.5 sm:p-2 rounded-lg transition-all ${
                                                viewMode === "list" ? 'bg-white/90 text-black shadow-md shadow-white/30' : 'text-white hover:bg-white/20'
                                            }`}
                                        >
                                            <List className="w-4 h-4 sm:w-5 sm:h-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Advanced Filters */}
                        {showFilters && (
                            <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-white/20">
                                <div className="grid grid-cols-1 gap-4 sm:gap-6">
                                    <div>
                                        <label className="block text-white mb-2 font-semibold text-sm sm:text-base">Price Range</label>
                                        <div className="flex items-center gap-3 sm:gap-4">
                                            <input
                                                type="range"
                                                min="0"
                                                max="1000"
                                                value={priceRange[1]}
                                                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                                                className="flex-1 accent-white"
                                            />
                                            <span className="text-white bg-black/60 backdrop-blur-md px-2.5 py-1 sm:px-3 rounded-lg border border-white/30 shadow-md shadow-white/10 text-xs sm:text-sm">
                                                ₹{priceRange[0]} - ₹{priceRange[1]}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Results Count */}
                    <div className="flex justify-between items-center mb-4 sm:mb-6 px-1">
                        <p className="text-gray-400 text-sm sm:text-base">
                            Showing {filteredAndSortedProducts.length} of {products.length} products
                        </p>
                    </div>

                    {/* Products Grid/List */}
                    <div className={viewMode === "grid"
                        ? "grid grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-6 lg:gap-8"
                        : "space-y-4 sm:space-y-6"
                    }>
                        {filteredAndSortedProducts.map((product) => (
                            <div
                                key={product.id}
                                onClick={() => handleImageClick(product.id)}
                                className={`group relative bg-black/30 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden hover:border-white/40 hover:bg-black/20 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-white/30 cursor-pointer ${
                                    viewMode === "list"
                                        ? "flex gap-4 sm:gap-6 p-4 sm:p-8 max-w-full"
                                        : "p-2 sm:p-8 w-full"
                                }`}
                            >
                                {/* Product Image */}
                                <div className={`relative overflow-hidden rounded-lg sm:rounded-xl bg-black/40 backdrop-blur-md border border-white/20 ${
                                    viewMode === "list"
                                        ? "w-24 h-24 sm:w-56 sm:h-56 flex-shrink-0"
                                        : "w-full h-32 sm:h-48 lg:h-80 mb-2 sm:mb-4 lg:mb-6"
                                }`}>
                                    <img
                                        src={getImageSrc(product)}
                                        alt={product.name}
                                        width={500} // Add explicit width and height for Next/Image optimization (if using next/image)
                                        height={500} // Adjust these based on your image aspect ratio and desired display size
                                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                        loading="lazy"
                                        onError={() => handleImageError(product.id)}
                                        onLoad={() => {
                                            // Remove from error list if image loads successfully
                                            setImageErrors(prev => prev.filter(id => id !== product.id));
                                        }}
                                    />

                                    {/* Badges */}
                                    <div className="absolute top-1.5 sm:top-2 left-1.5 sm:left-2 flex flex-col gap-1">
                                        {product.isNew && (
                                            <span className="bg-white/95 backdrop-blur-md text-black px-1.5 py-0.5 sm:px-2 rounded-full text-xs font-bold shadow-lg shadow-white/30">
                                                NEW
                                            </span>
                                        )}
                                        {product.isSale && (
                                            <span className="bg-black/90 backdrop-blur-md text-white px-1.5 py-0.5 sm:px-2 rounded-full text-xs font-bold border border-white/30 shadow-lg shadow-black/50">
                                                25% OFF
                                            </span>
                                        )}
                                        {!product.inStock && (
                                            <span className="bg-gray-500/90 backdrop-blur-md text-white px-1.5 py-0.5 sm:px-2 rounded-full text-xs font-bold shadow-lg">
                                                OUT OF STOCK
                                            </span>
                                        )}
                                    </div>

                                    {/* Wishlist Button */}
                                    <button
                                        onClick={(e) => toggleWishlist(e, product.id)}
                                        className="absolute top-2 sm:top-3 right-2 sm:right-3 p-1.5 sm:p-2 bg-black/70 backdrop-blur-md rounded-full hover:bg-black/50 border border-white/30 hover:border-white/50 hover:shadow-lg hover:shadow-white/20 transition-all"
                                    >
                                        <Heart
                                            className={`w-3 h-3 sm:w-4 sm:h-4 ${
                                                wishlist.includes(product.id)
                                                    ? 'fill-white text-white'
                                                    : 'text-gray-300 hover:text-white'
                                            }`}
                                        />
                                    </button>

                                    {/* Quick View - Hidden on mobile */}
                                    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                        <button
                                            onClick={(e) => handleQuickView(e, product.id)}
                                            className="bg-white/20 backdrop-blur-xl text-white px-3 py-2 sm:px-6 sm:py-3 rounded-full hover:bg-white/30 hover:shadow-lg hover:shadow-white/30 transition-all flex items-center gap-1 sm:gap-2 border border-white/30 text-xs sm:text-sm"
                                        >
                                            <Eye className="w-3 h-3 sm:w-4 h-4" />
                                            <span className="hidden sm:inline">Quick View</span>
                                            <span className="sm:hidden">View</span>
                                        </button>
                                    </div>
                                </div>

                                {/* Product Info */}
                                <div className={viewMode === "list" ? "flex-1" : ""}>
                                    <div className="mb-1.5 sm:mb-3">
                                        <h3 className="text-xs sm:text-lg lg:text-xl font-bold text-white mb-0.5 sm:mb-1 group-hover:text-gray-300 transition-colors line-clamp-1">
                                            {product.name}
                                        </h3>
                                        <p className="text-gray-400 text-xs sm:text-sm mb-1 sm:mb-2 font-medium">{product.category}</p>

                                        {/* Rating */}
                                        <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
                                            <div className="flex">
                                                {renderStars(product.rating)}
                                            </div>
                                            <span className="text-gray-400 text-xs">
                                                {product.rating} ({product.reviews})
                                            </span>
                                        </div>

                                        {/* Price */}
                                        <div className="flex items-center gap-1 sm:gap-2 mb-1.5 sm:mb-3">
                                            <span className="text-sm sm:text-lg lg:text-2xl font-bold text-white">
                                                {product.price}
                                            </span>
                                            {product.originalPrice && (
                                                <span className="text-gray-500 line-through text-xs sm:text-sm">
                                                    {product.originalPrice}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Description - Hidden on mobile grid view */}
                                    <p className={`text-gray-300 text-xs sm:text-sm mb-2 sm:mb-4 line-clamp-2 ${viewMode === "grid" ? "hidden sm:block" : ""}`}>
                                        {product.description}
                                    </p>

                                    {/* Tags - Limited on mobile */}
                                    <div className={`flex flex-wrap gap-1 mb-2 sm:mb-6 ${viewMode === "grid" ? "hidden sm:flex" : ""}`}>
                                        {product.tags.slice(0, viewMode === "grid" ? 2 : 3).map(tag => (
                                            <span
                                                key={tag}
                                                className="bg-black/40 backdrop-blur-md text-gray-200 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full text-xs border border-white/20 shadow-sm"
                                            >
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Action Buttons */}
                                    <div className={`flex gap-1.5 sm:gap-4 ${viewMode === "grid" ? "flex-col sm:flex-row" : ""}`}>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                // Handle add to cart
                                                console.log(`Added ${product.name} to cart`);
                                            }}
                                            disabled={!product.inStock}
                                            className={`flex-1 py-1.5 sm:py-3 px-2 sm:px-6 rounded-lg sm:rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm ${
                                                product.inStock
                                                    ? 'bg-white/95 backdrop-blur-md text-black hover:bg-white hover:scale-105 shadow-lg shadow-white/30 hover:shadow-xl hover:shadow-white/40'
                                                    : 'bg-gray-500/50 backdrop-blur-md text-gray-300 cursor-not-allowed border border-white/20'
                                            }`}
                                        >
                                            <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4" />
                                            {product.inStock ? "Add" : "Out"}
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                navigateToProduct(product.id);
                                            }}
                                            className="px-2 sm:px-6 py-1.5 sm:py-3 bg-black/50 backdrop-blur-md hover:bg-black/30 text-white rounded-lg sm:rounded-xl transition-all border border-white/30 hover:border-white/50 hover:shadow-md hover:shadow-white/20 text-xs sm:text-sm"
                                        >
                                            Details
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* No Results */}
                    {filteredAndSortedProducts.length === 0 && (
                        <div className="text-center py-16">
                            <div className="text-gray-400 mb-4">
                                <Search className="w-16 h-16 mx-auto mb-4 opacity-50" />
                                <h3 className="text-xl font-semibold mb-2 text-white">No products found</h3>
                                <p>Try adjusting your search or filter criteria</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
};