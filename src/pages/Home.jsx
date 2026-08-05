import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext, CATEGORIES } from '../context/AppContext';
import { ProductCard } from '../components/ProductCard';

export function Home() {
    const { products } = useContext(AppContext);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    const approvedProducts = products.filter(p => p.approvalStatus === "Approved" && p.status === "Available");
    const under500 = approvedProducts.filter(p => p.sellingPrice <= 500);
    const under1000 = approvedProducts.filter(p => p.sellingPrice <= 1000);
    const electronicDeals = approvedProducts.filter(p => p.category === 'Electronics');
    const bookDeals = approvedProducts.filter(p => p.category === 'Books');
    const hostelDeals = approvedProducts.filter(p => p.category === 'Hostel Essentials');

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
    };

    return (
        <div className="space-y-12 pb-12">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white max-w-[1280px] mx-auto mt-4 shadow-md flex flex-col items-center text-center relative overflow-hidden" style={{ padding: '36px 20px', borderRadius: '24px' }}>
                <div className="absolute -top-10 -left-10 w-48 h-48 bg-blue-600/30 rounded-full blur-2xl"></div>
                <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-indigo-600/30 rounded-full blur-2xl"></div>
                
                <span className="bg-blue-600/60 border border-blue-400/30 text-blue-100 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3">
                    India's Student Marketplace
                </span>
                
                <h1 className="font-extrabold tracking-tight" style={{ fontSize: '32px', lineHeight: '1.15', maxWidth: '780px', marginBottom: '12px' }}>
                    Buy, Sell, Rent & Exchange Everything Students Need.
                </h1>
                <p className="text-blue-100" style={{ fontSize: '14px', lineHeight: '1.4', maxWidth: '620px', marginBottom: '20px' }}>
                    Connect with verified students and save money by giving products a second life.
                </p>
                
                <div className="flex flex-row justify-center" style={{ gap: '12px', marginBottom: '24px' }}>
                    <Link to="/products" className="bg-white text-blue-700 font-semibold shadow hover:bg-blue-50 transition" style={{ padding: '10px 22px', fontSize: '13px', borderRadius: '12px' }}>
                        Explore Marketplace
                    </Link>
                    <Link to="/add-product" className="bg-blue-800 text-white font-semibold shadow hover:bg-blue-900 border border-blue-600 transition" style={{ padding: '10px 22px', fontSize: '13px', borderRadius: '12px' }}>
                        Sell Your Item
                    </Link>
                </div>

                {/* Search Bar */}
                <form onSubmit={handleSearchSubmit} className="flex bg-white shadow-xl w-full" style={{ maxWidth: '620px', height: '48px', borderRadius: '14px', padding: '3px' }}>
                    <input 
                        type="text" 
                        placeholder="Search books, laptops, calculators, hostel essentials..." 
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        className="flex-grow outline-none text-slate-800 bg-transparent" 
                        style={{ padding: '12px 16px', fontSize: '13px' }}
                    />
                    <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold transition flex items-center justify-center shadow" style={{ padding: '8px 24px', fontSize: '13px', borderRadius: '11px' }}>Search</button>
                </form>

                {/* Animated Counters */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8 pt-6 border-t border-blue-600/40 w-full max-w-4xl text-center">
                    <div>
                        <h4 className="text-xl font-extrabold text-white">15K+</h4>
                        <span className="text-xs text-blue-200">Students</span>
                    </div>
                    <div>
                        <h4 className="text-xl font-extrabold text-white">5000+</h4>
                        <span className="text-xs text-blue-200">Products</span>
                    </div>
                    <div>
                        <h4 className="text-xl font-extrabold text-white">250+</h4>
                        <span className="text-xs text-blue-200">Campuses</span>
                    </div>
                    <div>
                        <h4 className="text-xl font-extrabold text-white">99%</h4>
                        <span className="text-xs text-blue-200">Trusted Transactions</span>
                    </div>
                </div>
            </section>

            {/* Popular Categories */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-bold text-slate-900">Popular Categories</h2>
                    <Link to="/products" className="text-blue-600 hover:text-blue-700 text-xs font-bold">View All →</Link>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
                    {CATEGORIES.map((cat, idx) => {
                        const count = approvedProducts.filter(p => p.category === cat.name).length;
                        return (
                            <Link key={idx} to={`/products?category=${cat.name}`} className="bg-white p-4 rounded-2xl border border-slate-200 card-hover text-center group">
                                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:bg-blue-600 group-hover:text-white transition text-xl">
                                    {cat.icon}
                                </div>
                                <span className="font-bold text-slate-800 text-xs block">{cat.name}</span>
                                <span className="text-[10px] text-slate-400 mt-0.5 block">{count} items</span>
                            </Link>
                        );
                    })}
                </div>
            </section>

            {/* Featured Deals & Recently Added */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-bold text-slate-900">Featured Deals</h2>
                    <Link to="/products" className="text-blue-600 hover:text-blue-700 text-xs font-bold">Marketplace →</Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {approvedProducts.slice(0, 4).map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </section>

            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-bold text-slate-900">Recently Added</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {approvedProducts.slice(4, 8).map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </section>

            {/* Products Under ₹500 and ₹1000 */}
            {under500.length > 0 && (
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg font-bold text-slate-900">Products Under ₹500</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {under500.slice(0, 4).map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </section>
            )}

            {under1000.length > 0 && (
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg font-bold text-slate-900">Products Under ₹1000</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {under1000.slice(0, 4).map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </section>
            )}

            {/* Trending Electronics & Best Selling Books */}
            {electronicDeals.length > 0 && (
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg font-bold text-slate-900">Trending Electronics</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {electronicDeals.slice(0, 4).map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </section>
            )}

            {bookDeals.length > 0 && (
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg font-bold text-slate-900">Best Selling Books</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {bookDeals.slice(0, 4).map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </section>
            )}

            {hostelDeals.length > 0 && (
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg font-bold text-slate-900">Hostel Essentials</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {hostelDeals.slice(0, 4).map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}
