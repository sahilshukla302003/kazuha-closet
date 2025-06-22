"use client";
import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation"; // For Next.js routing
import { Search, Grid, List, Heart, ShoppingCart, Star, Eye, SlidersHorizontal } from "lucide-react";
import Navbar from "./Landingpage/Navbar";

type Product = {
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

const products: Product[] = [
    {
        id: "naruto-tee-001",
        name: "Naruto Tee",
        price: "₹599",
        originalPrice: "₹799",
        type: "video",
        video: "/videos/goku.mp4",
        description: "High-quality Naruto-themed T-shirt with durable print and premium cotton fabric.",
        category: "Naruto",
        rating: 4.8,
        reviews: 156,
        inStock: true,
        isSale: true,
        tags: ["anime", "naruto", "cotton", "comfortable"]
    },
    {
        id: "luffy-tee-002",
        name: "Luffy Tee",
        price: "₹649",
        type: "video",
        video: "/videos/naruto.mp4",
        description: "One Piece Luffy T-shirt made of soft, breathable fabric with vibrant colors.",
        category: "One Piece",
        rating: 4.7,
        reviews: 203,
        inStock: true,
        isNew: true,
        tags: ["anime", "one piece", "luffy", "breathable"]
    },
    {
        id: "sasuke-tee-003",
        name: "Sasuke Tee",
        price: "₹699",
        type: "video",
        video: "/videos/toji.mp4",
        description: "Cool and stylish Sasuke Tee with a bold ninja design and superior print quality.",
        category: "Naruto",
        rating: 4.9,
        reviews: 89,
        inStock: true,
        tags: ["anime", "sasuke", "ninja", "stylish"]
    },
    {
        id: "goku-tee-004",
        name: "Goku Tee",
        price: "₹499",
        originalPrice: "₹649",
        type: "image",
        video: "",
        thumbnail: "/images/goku.png",
        description: "Classic Goku design printed on premium quality cotton with fade-resistant colors.",
        category: "Dragon Ball",
        rating: 4.6,
        reviews: 324,
        inStock: true,
        isSale: true,
        tags: ["anime", "goku", "dragon ball", "classic"]
    },
    {
        id: "zoro-tee-005",
        name: "Zoro Tee",
        price: "₹549",
        type: "image",
        video: "",
        thumbnail: "/images/zoro.png",
        description: "Green-themed Zoro T-shirt, perfect for anime fans with detailed artwork.",
        category: "One Piece",
        rating: 4.5,
        reviews: 167,
        inStock: false,
        tags: ["anime", "zoro", "one piece", "detailed"]
    },
    {
        id: "gojo-tee-006",
        name: "Gojo Tee",
        price: "₹799",
        type: "image",
        video: "",
        thumbnail: "/images/gojo.png",
        description: "Stylish Gojo Satoru Tee with high-detail artwork and premium finishing.",
        category: "Jujutsu Kaisen",
        rating: 4.9,
        reviews: 112,
        inStock: true,
        isNew: true,
        tags: ["anime", "gojo", "jujutsu kaisen", "premium"]
    },
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
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [sortBy, setSortBy] = useState("default");
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [showFilters, setShowFilters] = useState(false);
    const [priceRange, setPriceRange] = useState([0, 1000]);
    const [wishlist, setWishlist] = useState<string[]>([]);

    // Navigation functions
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

    // Filter and sort products
    const filteredAndSortedProducts = useMemo(() => {
        const filtered = products.filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                product.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
            
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
                className={`w-4 h-4 ${i < Math.floor(rating) ? 'fill-white text-white' : 'text-gray-400'}`}
            />
        ));
    };

    return (
        <main className="relative bg-gradient-to-bl from-[#000000] to-[#a3a3a3] min-h-screen scroll-smooth text-white">
            <Navbar/>
            
            {/* Header Section */}
            <div className="pt-24 pb-8 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-8">
                        <h1 className="text-5xl font-bold mb-4 text-white">
                            PREMIUM ANIME COLLECTION
                        </h1>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                            Discover our exclusive range of high-quality anime T-shirts crafted for true fans
                        </p>
                    </div>

                    {/* Search and Filters */}
                    <div className="bg-black/40 backdrop-blur-xl border border-white/20 rounded-2xl p-6 mb-8 shadow-2xl shadow-white/10 hover:shadow-white/20 transition-all duration-500">
                        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                            {/* Search Bar */}
                            <div className="relative flex-1 max-w-md">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 bg-black/60 backdrop-blur-md border border-white/30 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:border-white focus:bg-black/40 focus:shadow-lg focus:shadow-white/20 transition-all"
                                />
                            </div>

                            {/* Category Filter */}
                            <div className="flex flex-wrap gap-2">
                                {categories.map(category => (
                                    <button
                                        key={category}
                                        onClick={() => setSelectedCategory(category)}
                                        className={`px-4 py-2 rounded-full transition-all duration-300 font-medium backdrop-blur-md ${
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
                            <div className="flex items-center gap-4">
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="bg-black/60 backdrop-blur-md border border-white/30 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-white focus:bg-black/40 focus:shadow-lg focus:shadow-white/20 transition-all"
                                >
                                    {sortOptions.map(option => (
                                        <option key={option.value} value={option.value} className="bg-black text-white">
                                            {option.label}
                                        </option>
                                    ))}
                                </select>

                                <button
                                    onClick={() => setShowFilters(!showFilters)}
                                    className="p-2 bg-black/60 hover:bg-black/40 backdrop-blur-md border border-white/30 rounded-xl hover:border-white/50 hover:shadow-md hover:shadow-white/20 transition-all"
                                >
                                    <SlidersHorizontal className="w-5 h-5" />
                                </button>

                                <div className="flex bg-black/60 backdrop-blur-md rounded-xl p-1 border border-white/30">
                                    <button
                                        onClick={() => setViewMode("grid")}
                                        className={`p-2 rounded-lg transition-all ${
                                            viewMode === "grid" ? 'bg-white/90 text-black shadow-md shadow-white/30' : 'text-white hover:bg-white/20'
                                        }`}
                                    >
                                        <Grid className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={() => setViewMode("list")}
                                        className={`p-2 rounded-lg transition-all ${
                                            viewMode === "list" ? 'bg-white/90 text-black shadow-md shadow-white/30' : 'text-white hover:bg-white/20'
                                        }`}
                                    >
                                        <List className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Advanced Filters */}
                        {showFilters && (
                            <div className="mt-6 pt-6 border-t border-white/20">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-white mb-2 font-semibold">Price Range</label>
                                        <div className="flex items-center gap-4">
                                            <input
                                                type="range"
                                                min="0"
                                                max="1000"
                                                value={priceRange[1]}
                                                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                                                className="flex-1 accent-white"
                                            />
                                            <span className="text-white bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg border border-white/30 shadow-md shadow-white/10">
                                                ₹{priceRange[0]} - ₹{priceRange[1]}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Results Count */}
                    <div className="flex justify-between items-center mb-6">
                        <p className="text-gray-400">
                            Showing {filteredAndSortedProducts.length} of {products.length} products
                        </p>
                    </div>

                    {/* Products Grid/List */}
                    <div className={viewMode === "grid" 
                        ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-none"
                        : "space-y-6 max-w-none"
                    }>
                        {filteredAndSortedProducts.map((product) => (
                            <div
                                key={product.id}
                                onClick={() => handleImageClick(product.id)}
                                className={`group relative bg-black/30 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden hover:border-white/40 hover:bg-black/20 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-white/30 cursor-pointer ${
                                    viewMode === "list" ? "flex gap-6 p-8 max-w-full" : "p-8 w-full max-w-sm mx-auto"
                                }`}
                            >
                                {/* Product Image/Video */}
                                <div className={`relative overflow-hidden rounded-xl bg-black/40 backdrop-blur-md border border-white/20 ${
                                    viewMode === "list" ? "w-56 h-56 flex-shrink-0" : "w-full h-80 mb-6"
                                }`}>
                                    {product.type === "video" ? (
                                        <video
                                            src={product.video}
                                            muted
                                            loop
                                            playsInline
                                            className="w-full h-full object-cover"
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
                                            src={product.thumbnail || "/images/default.png"}
                                            alt={product.name}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                    )}
                                    
                                    {/* Badges */}
                                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                                        {product.isNew && (
                                            <span className="bg-white/95 backdrop-blur-md text-black px-3 py-1 rounded-full text-xs font-bold shadow-lg shadow-white/30">
                                                NEW
                                            </span>
                                        )}
                                        {product.isSale && (
                                            <span className="bg-black/90 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold border border-white/30 shadow-lg shadow-black/50">
                                                50% OFF
                                            </span>
                                        )}
                                        {!product.inStock && (
                                            <span className="bg-gray-500/90 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                                                OUT OF STOCK
                                            </span>
                                        )}
                                    </div>

                                    {/* Wishlist Button */}
                                    <button
                                        onClick={(e) => toggleWishlist(e, product.id)}
                                        className="absolute top-3 right-3 p-2 bg-black/70 backdrop-blur-md rounded-full hover:bg-black/50 border border-white/30 hover:border-white/50 hover:shadow-lg hover:shadow-white/20 transition-all"
                                    >
                                        <Heart
                                            className={`w-5 h-5 ${
                                                wishlist.includes(product.id)
                                                    ? 'fill-white text-white'
                                                    : 'text-gray-300 hover:text-white'
                                            }`}
                                        />
                                    </button>

                                    {/* Quick View */}
                                    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                        <button 
                                            onClick={(e) => handleQuickView(e, product.id)}
                                            className="bg-white/20 backdrop-blur-xl text-white px-6 py-3 rounded-full hover:bg-white/30 hover:shadow-lg hover:shadow-white/30 transition-all flex items-center gap-2 border border-white/30"
                                        >
                                            <Eye className="w-4 h-4" />
                                            Quick View
                                        </button>
                                    </div>
                                </div>

                                {/* Product Info */}
                                <div className={viewMode === "list" ? "flex-1" : ""}>
                                    <div className="mb-3">
                                        <h3 className="text-xl font-bold text-white mb-1 group-hover:text-gray-300 transition-colors">
                                            {product.name}
                                        </h3>
                                        <p className="text-gray-400 text-sm mb-2 font-medium">{product.category}</p>
                                        
                                        {/* Rating */}
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="flex">
                                                {renderStars(product.rating)}
                                            </div>
                                            <span className="text-gray-400 text-sm">
                                                {product.rating} ({product.reviews} reviews)
                                            </span>
                                        </div>

                                        {/* Price */}
                                        <div className="flex items-center gap-2 mb-3">
                                            <span className="text-2xl font-bold text-white">
                                                {product.price}
                                            </span>
                                            {product.originalPrice && (
                                                <span className="text-gray-500 line-through">
                                                    {product.originalPrice}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                                        {product.description}
                                    </p>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-1 mb-6">
                                        {product.tags.slice(0, 3).map(tag => (
                                            <span
                                                key={tag}
                                                className="bg-black/40 backdrop-blur-md text-gray-200 px-2 py-1 rounded-full text-xs border border-white/20 shadow-sm"
                                            >
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex gap-4">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                // Handle add to cart
                                                console.log(`Added ${product.name} to cart`);
                                            }}
                                            disabled={!product.inStock}
                                            className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                                                product.inStock
                                                    ? 'bg-white/95 backdrop-blur-md text-black hover:bg-white hover:scale-105 shadow-lg shadow-white/30 hover:shadow-xl hover:shadow-white/40'
                                                    : 'bg-gray-500/50 backdrop-blur-md text-gray-300 cursor-not-allowed border border-white/20'
                                            }`}
                                        >
                                            <ShoppingCart className="w-4 h-4" />
                                            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                                        </button>
                                        <button 
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                navigateToProduct(product.id);
                                            }}
                                            className="px-6 py-3 bg-black/50 backdrop-blur-md hover:bg-black/30 text-white rounded-xl transition-all border border-white/30 hover:border-white/50 hover:shadow-md hover:shadow-white/20"
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

