import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { ProductCard } from '../components/ProductCard';

export function SellerProfilePage() {
    const { id } = useParams();
    const { users, products, reviews } = useContext(AppContext);

    const seller = users.find(u => u.id === parseInt(id));
    if (!seller) return <div className="text-center py-20 text-slate-600">Seller not found.</div>;

    const sellerProducts = products.filter(p => p.sellerId === seller.id && p.approvalStatus === 'Approved' && p.status === 'Available');
    const sellerReviews = reviews.filter(r => r.sellerId === seller.id);
    const avgRating = sellerReviews.length > 0 ? (sellerReviews.reduce((sum, r) => sum + r.rating, 0) / sellerReviews.length).toFixed(1) : "5.0";

    return (
        <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6">
                <div className="w-24 h-24 bg-blue-600 text-white rounded-3xl flex items-center justify-center text-3xl font-extrabold shadow-lg">
                    {seller.fullName[0]}
                </div>
                <div className="flex-grow text-center sm:text-left space-y-1">
                    <h1 className="text-2xl font-extrabold text-slate-900">{seller.fullName}</h1>
                    <p className="text-xs text-slate-500">{seller.department} • {seller.academicYear} • Location: {seller.campusLocation}</p>
                    <p className="text-xs text-slate-400">Member since {seller.joinedAt}</p>
                    <div className="flex items-center space-x-4 pt-2 justify-center sm:justify-start text-xs font-bold text-slate-700">
                        <span>⭐ {avgRating} Rating</span>
                        <span>📦 {sellerReviews.length} Reviews</span>
                        <span>🛒 {sellerProducts.length} Active Listings</span>
                    </div>
                </div>
            </div>

            <div>
                <h2 className="text-lg font-bold text-slate-900 mb-4">Active Listings by {seller.fullName}</h2>
                {sellerProducts.length === 0 ? (
                    <div className="bg-white p-8 rounded-2xl border text-center text-xs text-slate-400">No active products from this seller.</div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {sellerProducts.map(p => <ProductCard key={p.id} product={p} />)}
                    </div>
                )}
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-4">
                <h3 className="text-base font-bold text-slate-900">Reviews ({sellerReviews.length})</h3>
                {sellerReviews.length === 0 ? (
                    <p className="text-xs text-slate-400">No reviews yet.</p>
                ) : (
                    <div className="divide-y divide-slate-100">
                        {sellerReviews.map(rev => (
                            <div key={rev.id} className="py-3 space-y-1">
                                <div className="flex items-center space-x-2">
                                    <span className="text-amber-500">{"⭐".repeat(rev.rating)}</span>
                                    <span className="text-xs text-slate-400">{rev.createdAt}</span>
                                </div>
                                <p className="text-xs text-slate-700">"{rev.comment}"</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
