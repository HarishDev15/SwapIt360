import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { StatusBadge } from './StatusBadge';

export function ProductCard({ product }) {
    const { currentUser, wishlists, setWishlists, showToast, reviews } = useContext(AppContext);
    const userWishlist = wishlists.find(w => w.userId === currentUser?.id)?.productIds || [];
    const isWishlisted = userWishlist.includes(product.id);

    const discount = product.originalPrice > product.sellingPrice 
        ? Math.round(((product.originalPrice - product.sellingPrice) / product.originalPrice) * 100)
        : 0;

    const sellerReviews = reviews.filter(r => r.sellerId === product.sellerId);
    const sellerAvgRating = sellerReviews.length > 0 ? (sellerReviews.reduce((sum, r) => sum + r.rating, 0) / sellerReviews.length).toFixed(1) : "4.8";

    const toggleWishlist = (e) => {
        e.preventDefault();
        if (!currentUser) {
            showToast("Please login to manage wishlist.", "warning");
            return;
        }
        let updated;
        const existing = wishlists.find(w => w.userId === currentUser.id);
        if (existing) {
            const newIds = existing.productIds.includes(product.id)
                ? existing.productIds.filter(id => id !== product.id)
                : [...existing.productIds, product.id];
            updated = wishlists.map(w => w.userId === currentUser.id ? { ...w, productIds: newIds } : w);
        } else {
            updated = [...wishlists, { userId: currentUser.id, productIds: [product.id] }];
        }
        setWishlists(updated);
        showToast(isWishlisted ? "Removed from wishlist" : "Wishlist updated");
    };

    return (
        <div className="bg-white rounded-2xl border border-slate-200 card-hover overflow-hidden flex flex-col justify-between relative shadow-sm">
            {product.status === "Sold" && (
                <div className="absolute inset-0 bg-slate-900/40 z-10 flex items-center justify-center backdrop-blur-[1px]">
                    <span className="bg-slate-900 text-white font-bold text-xs px-3 py-1.5 rounded-lg shadow-lg uppercase tracking-wider">Sold Out</span>
                </div>
            )}
            <div>
                <div className="relative h-48 bg-slate-100">
                    <img 
                        src={product.images[0] || "https://placehold.co/400x300/e2e8f0/64748b?text=SwapIt360"} 
                        alt={product.name} 
                        className="w-full h-full object-cover" 
                        onError={(e)=>{e.target.src='https://placehold.co/400x300/e2e8f0/64748b?text=SwapIt360'}} 
                    />
                    <div className="absolute top-2 left-2 flex gap-1 flex-wrap">
                        <StatusBadge status={product.transactionType} type="tx" />
                        {product.featured && <span className="bg-blue-600 text-white text-[10px] px-2 py-0.5 rounded-full font-semibold">Featured</span>}
                        {discount > 0 && <span className="bg-emerald-600 text-white text-[10px] px-2 py-0.5 rounded-full font-semibold">{discount}% OFF</span>}
                    </div>
                    <button 
                        onClick={toggleWishlist}
                        className="absolute top-2 right-2 bg-white/90 p-2 rounded-full shadow hover:bg-white transition text-rose-500 z-20">
                        <svg className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500' : 'fill-none'}`} stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                        </svg>
                    </button>
                </div>
                <div className="p-4 space-y-1.5">
                    <div className="flex justify-between items-center text-[11px] text-slate-500 font-semibold">
                        <span className="uppercase tracking-wider">{product.category}</span>
                        <span>⭐ {sellerAvgRating}</span>
                    </div>
                    <h3 className="font-bold text-slate-900 text-sm line-clamp-1">{product.name}</h3>
                    <div className="flex items-center justify-between pt-1">
                        <div>
                            <span className="text-base font-extrabold text-blue-600">₹{product.sellingPrice}</span>
                            {product.originalPrice > product.sellingPrice && (
                                <span className="text-xs text-slate-400 line-through ml-1.5">₹{product.originalPrice}</span>
                            )}
                        </div>
                        <span className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">{product.condition}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 flex items-center pt-1">
                        <svg className="w-3.5 h-3.5 mr-1 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                        {product.campusLocation}
                    </p>
                </div>
            </div>
            <div className="p-4 pt-0">
                <Link to={`/product/${product.id}`} className="block w-full text-center bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white py-2 rounded-xl text-xs font-bold transition">
                    View Details
                </Link>
            </div>
        </div>
    );
}
