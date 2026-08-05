import React, { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { AppContext, CATEGORIES } from '../context/AppContext';
import { ProductCard } from '../components/ProductCard';

export function ProductsPage() {
    const { products } = useContext(AppContext);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const [searchQuery, setSearchQuery] = useState(queryParams.get('search') || "");
    const [selectedCategory, setSelectedCategory] = useState(queryParams.get('category') || "All");
    const [selectedTxType, setSelectedTxType] = useState(queryParams.get('transactionType') || "All");
    const [selectedCondition, setSelectedCondition] = useState("All");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [showSold, setShowSold] = useState(false);
    const [sortBy, setSortBy] = useState("newest");
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

    const filtered = products.filter(p => {
        if (p.approvalStatus !== "Approved") return false;
        if (!showSold && p.status === "Sold") return false;
        if (searchQuery && !p.name.toLowerCase().includes(searchQuery.toLowerCase()) && !p.description.toLowerCase().includes(searchQuery.toLowerCase()) && !p.campusLocation.toLowerCase().includes(searchQuery.toLowerCase())) return false;
        if (selectedCategory !== "All" && p.category !== selectedCategory) return false;
        if (selectedTxType !== "All" && p.transactionType !== selectedTxType) return false;
        if (selectedCondition !== "All" && p.condition !== selectedCondition) return false;
        if (minPrice && p.sellingPrice < parseFloat(minPrice)) return false;
        if (maxPrice && p.sellingPrice > parseFloat(maxPrice)) return false;
        return true;
    });

    if (sortBy === "price-low") filtered.sort((a,b) => a.sellingPrice - b.sellingPrice);
    if (sortBy === "price-high") filtered.sort((a,b) => b.sellingPrice - a.sellingPrice);
    if (sortBy === "newest") filtered.sort((a,b) => b.id - a.id);
    if (sortBy === "oldest") filtered.sort((a,b) => a.id - b.id);

    const clearAllFilters = () => {
        setSearchQuery("");
        setSelectedCategory("All");
        setSelectedTxType("All");
        setSelectedCondition("All");
        setMinPrice("");
        setMaxPrice("");
        setShowSold(false);
        setSortBy("newest");
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <div>
                    <h1 className="text-2xl font-extrabold text-slate-900">SwapIt360 Marketplace</h1>
                    <p className="text-xs text-slate-500 mt-1">Showing {filtered.length} verified student listings</p>
                </div>
                <div className="flex items-center space-x-3 w-full md:w-auto">
                    <select 
                        value={sortBy} 
                        onChange={e => setSortBy(e.target.value)}
                        className="bg-white border border-slate-200 px-3 py-2 rounded-xl text-xs font-semibold outline-none shadow-sm">
                        <option value="newest">Sort by: Newest</option>
                        <option value="oldest">Sort by: Oldest</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                    </select>
                    <button 
                        onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
                        className="md:hidden bg-blue-600 text-white px-4 py-2 rounded-xl text-xs font-bold">
                        Filters
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Filter Sidebar */}
                <div className={`md:block bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6 h-fit ${mobileFiltersOpen ? 'block' : 'hidden'}`}>
                    <div className="flex justify-between items-center border-b pb-3">
                        <h3 className="font-bold text-slate-900 text-sm">Filters</h3>
                        <button onClick={clearAllFilters} className="text-xs text-blue-600 font-bold hover:underline">Clear All</button>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">Search</label>
                        <input 
                            type="text" 
                            placeholder="Name, location..." 
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-xs outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">Category</label>
                        <select 
                            value={selectedCategory} 
                            onChange={e => setSelectedCategory(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-xs outline-none">
                            <option value="All">All Categories</option>
                            {CATEGORIES.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">Transaction Type</label>
                        <select 
                            value={selectedTxType} 
                            onChange={e => setSelectedTxType(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-xs outline-none">
                            <option value="All">All Types</option>
                            <option value="Buy">Buy</option>
                            <option value="Rent">Rent</option>
                            <option value="Exchange">Exchange</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">Condition</label>
                        <select 
                            value={selectedCondition} 
                            onChange={e => setSelectedCondition(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-xs outline-none">
                            <option value="All">All Conditions</option>
                            <option value="Like New">Like New</option>
                            <option value="Good">Good</option>
                            <option value="Used">Used</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">Price Range (₹)</label>
                        <div className="flex space-x-2">
                            <input type="number" placeholder="Min" value={minPrice} onChange={e => setMinPrice(e.target.value)} className="w-1/2 bg-slate-50 border border-slate-200 p-2 rounded-xl text-xs" />
                            <input type="number" placeholder="Max" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} className="w-1/2 bg-slate-50 border border-slate-200 p-2 rounded-xl text-xs" />
                        </div>
                    </div>

                    <div className="flex items-center space-x-2 pt-2">
                        <input type="checkbox" id="showSold" checked={showSold} onChange={e => setShowSold(e.target.checked)} className="w-4 h-4 text-blue-600 rounded" />
                        <label htmlFor="showSold" className="text-xs font-semibold text-slate-700">Include Sold Items</label>
                    </div>
                </div>

                {/* Product Grid */}
                <div className="md:col-span-3">
                    {filtered.length === 0 ? (
                        <div className="bg-white p-12 rounded-2xl border text-center space-y-3">
                            <p className="text-sm font-bold text-slate-700">No products found matching your filters.</p>
                            <button onClick={clearAllFilters} className="bg-blue-600 text-white px-4 py-2 rounded-xl text-xs font-bold">Clear Filters</button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filtered.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
