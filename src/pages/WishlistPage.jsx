import React, { useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { ProductCard } from '../components/ProductCard';

export function WishlistPage() {
    const { currentUser, wishlists, products } = useContext(AppContext);
    if (!currentUser) return <Navigate to="/login" />;

    const userWishlistIds = wishlists.find(w => w.userId === currentUser.id)?.productIds || [];
    const wishlistedProducts = products.filter(p => userWishlistIds.includes(p.id));

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
            <div>
                <h1 className="text-2xl font-extrabold text-slate-900">My Wishlist</h1>
                <p className="text-xs text-slate-500 mt-1">{wishlistedProducts.length} saved campus items</p>
            </div>
            {wishlistedProducts.length === 0 ? (
                <div className="bg-white p-12 rounded-2xl border text-center space-y-3">
                    <p className="text-xs text-slate-500">Your wishlist is currently empty.</p>
                    <Link to="/products" className="inline-block bg-blue-600 text-white px-4 py-2 rounded-xl text-xs font-bold">Browse Marketplace</Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {wishlistedProducts.map(p => <ProductCard key={p.id} product={p} />)}
                </div>
            )}
        </div>
    );
}
