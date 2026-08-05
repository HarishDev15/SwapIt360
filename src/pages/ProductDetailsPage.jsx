import React, { useContext, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { StatusBadge } from '../components/StatusBadge';

export function ProductDetailsPage() {
    const { id } = useParams();
    const { products, users, currentUser, wishlists, setWishlists, requests, setRequests, reports, setReports, reviews, addNotification, showToast } = useContext(AppContext);
    
    const [requestType, setRequestType] = useState("Buy");
    const [requestMessage, setRequestMessage] = useState("");
    const [reportModalOpen, setReportModalOpen] = useState(false);
    const [reportReason, setReportReason] = useState("Wrong information");
    const [reportDesc, setReportDesc] = useState("");
    const [activeImageIdx, setActiveImageIdx] = useState(0);

    const product = products.find(p => p.id === parseInt(id));
    if (!product) return <div className="text-center py-20 text-slate-600">Product not found.</div>;

    const seller = users.find(u => u.id === product.sellerId) || { fullName: "Unknown Student", department: "General", academicYear: "N/A" };
    const userWishlist = wishlists.find(w => w.userId === currentUser?.id)?.productIds || [];
    const isWishlisted = userWishlist.includes(product.id);

    const sellerReviews = reviews.filter(r => r.sellerId === seller.id);
    const sellerAvgRating = sellerReviews.length > 0 ? (sellerReviews.reduce((sum, r) => sum + r.rating, 0) / sellerReviews.length).toFixed(1) : "4.8";

    const existingRequest = requests.find(r => r.productId === product.id && r.buyerId === currentUser?.id && r.status !== 'Cancelled' && r.status !== 'Rejected');

    const handleSendRequest = (e) => {
        e.preventDefault();
        if (!currentUser) {
            showToast("Please login to send requests.", "warning");
            return;
        }
        if (currentUser.id === product.sellerId) {
            showToast("You cannot request your own product.", "error");
            return;
        }
        if (currentUser.status === "Inactive") {
            showToast("Your account is inactive. Action not allowed.", "error");
            return;
        }
        if (product.status === "Sold") {
            showToast("This product is already sold.", "error");
            return;
        }
        if (existingRequest) {
            showToast("You already have an active request for this product.", "warning");
            return;
        }

        const newReq = {
            id: Date.now(),
            productId: product.id,
            buyerId: currentUser.id,
            sellerId: product.sellerId,
            type: requestType,
            message: requestMessage,
            status: "Pending",
            createdAt: new Date().toISOString().split('T')[0],
            updatedAt: new Date().toISOString().split('T')[0]
        };

        setRequests([newReq, ...requests]);
        addNotification(product.sellerId, "request", `${currentUser.fullName} sent a request for your ${product.name}.`);
        showToast("Request sent successfully!");
        setRequestMessage("");
    };

    const handleReportSubmit = (e) => {
        e.preventDefault();
        if (!currentUser) {
            showToast("Please login to report products.", "warning");
            return;
        }
        if (currentUser.id === product.sellerId) {
            showToast("You cannot report your own product.", "error");
            return;
        }

        const duplicateOpen = reports.some(r => r.productId === product.id && r.reportedBy === currentUser.id && r.status === 'Open');
        if (duplicateOpen) {
            showToast("You already have an open report for this product.", "warning");
            setReportModalOpen(false);
            return;
        }

        const newRep = {
            id: Date.now(),
            productId: product.id,
            reportedBy: currentUser.id,
            reason: reportReason,
            description: reportDesc,
            status: "Open",
            createdAt: new Date().toISOString().split('T')[0]
        };

        setReports([newRep, ...reports]);
        setReportModalOpen(false);
        setReportDesc("");
        showToast("Report submitted to moderators.");
    };

    const toggleWishlist = () => {
        if (!currentUser) {
            showToast("Please login to manage wishlist.", "warning");
            return;
        }
        let updated;
        const existing = wishlists.find(w => w.userId === currentUser.id);
        if (existing) {
            const newIds = existing.productIds.includes(product.id)
                ? existing.productIds.filter(pid => pid !== product.id)
                : [...existing.productIds, product.id];
            updated = wishlists.map(w => w.userId === currentUser.id ? { ...w, productIds: newIds } : w);
        } else {
            updated = [...wishlists, { userId: currentUser.id, productIds: [product.id] }];
        }
        setWishlists(updated);
        showToast(isWishlisted ? "Removed from wishlist" : "Added to wishlist");
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 sm:p-8">
                {/* Images */}
                <div className="space-y-4">
                    <div className="h-80 bg-slate-100 rounded-2xl overflow-hidden border">
                        <img src={product.images[activeImageIdx] || product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                    </div>
                    {product.images.length > 1 && (
                        <div className="flex space-x-2">
                            {product.images.map((img, i) => (
                                <button key={i} onClick={() => setActiveImageIdx(i)} className={`w-16 h-16 rounded-xl border overflow-hidden ${activeImageIdx === i ? 'border-blue-600 ring-2 ring-blue-100' : 'border-slate-200'}`}>
                                    <img src={img} className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Product Info */}
                <div className="flex flex-col justify-between space-y-6">
                    <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                            <span className="text-xs uppercase bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-bold">{product.category}</span>
                            <StatusBadge status={product.transactionType} type="tx" />
                            <StatusBadge status={product.status} type="general" />
                        </div>
                        <h1 className="text-2xl font-extrabold text-slate-900">{product.name}</h1>
                        <div className="flex items-baseline space-x-3">
                            <span className="text-2xl font-extrabold text-blue-600">₹{product.sellingPrice}</span>
                            {product.originalPrice > product.sellingPrice && (
                                <span className="text-sm text-slate-400 line-through">₹{product.originalPrice}</span>
                            )}
                        </div>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{product.description}</p>
                        
                        <div className="grid grid-cols-2 gap-3 pt-2 text-xs text-slate-600 border-t border-b py-3">
                            <div><span className="font-bold">Condition:</span> {product.condition}</div>
                            <div><span className="font-bold">Age:</span> {product.productAge}</div>
                            <div><span className="font-bold">Location:</span> {product.campusLocation}</div>
                            <div><span className="font-bold">Posted:</span> {product.createdAt}</div>
                        </div>
                    </div>

                    {/* Seller Card & Actions */}
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex justify-between items-center">
                        <div>
                            <div className="flex items-center space-x-1.5">
                                <h4 className="font-bold text-slate-900 text-xs">{seller.fullName}</h4>
                                <span className="bg-emerald-100 text-emerald-800 text-[9px] px-1.5 py-0.5 rounded font-bold">Verified</span>
                            </div>
                            <p className="text-[11px] text-slate-500">{seller.department} • Member since {seller.joinedAt} • ⭐ {sellerAvgRating}</p>
                        </div>
                        <Link to={`/seller/${seller.id}`} className="text-xs font-bold text-blue-600 hover:underline">View Profile →</Link>
                    </div>

                    <div className="flex space-x-3">
                        <button 
                            onClick={toggleWishlist}
                            className={`flex-1 py-3 rounded-2xl text-xs font-bold border transition flex items-center justify-center space-x-2 ${
                                isWishlisted ? 'bg-rose-50 text-rose-600 border-rose-200' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                            }`}>
                            <span>{isWishlisted ? 'Saved in Wishlist' : 'Add to Wishlist'}</span>
                        </button>
                        <button 
                            onClick={() => setReportModalOpen(true)}
                            className="px-4 py-3 bg-white text-red-600 border border-red-200 hover:bg-red-50 rounded-2xl text-xs font-bold transition">
                            Report Listing
                        </button>
                    </div>

                    {/* Request Form */}
                    <div>
                        {!currentUser ? (
                            <Link to="/login" className="block w-full text-center bg-blue-600 text-white py-3 rounded-2xl text-xs font-bold">Login to Send Request</Link>
                        ) : currentUser.id === product.sellerId ? (
                            <Link to="/my-listings" className="block w-full text-center bg-slate-800 text-white py-3 rounded-2xl text-xs font-bold">Manage Your Listing</Link>
                        ) : product.status === "Sold" ? (
                            <div className="bg-slate-100 text-slate-600 text-center py-3 rounded-2xl text-xs font-bold">Product Sold</div>
                        ) : existingRequest ? (
                            <div className="bg-amber-50 text-amber-800 text-center py-3 rounded-2xl text-xs font-bold border border-amber-200">Request Already Sent ({existingRequest.status})</div>
                        ) : (
                            <form onSubmit={handleSendRequest} className="space-y-3 pt-2 border-t">
                                <div className="flex space-x-3">
                                    <select value={requestType} onChange={e => setRequestType(e.target.value)} className="bg-slate-50 border p-2.5 rounded-xl text-xs font-bold outline-none">
                                        <option value="Buy">Buy</option>
                                        <option value="Rent">Rent</option>
                                        <option value="Exchange">Exchange</option>
                                    </select>
                                    <input 
                                        type="text" 
                                        placeholder="Message to seller..." 
                                        value={requestMessage} 
                                        onChange={e => setRequestMessage(e.target.value)} 
                                        required 
                                        className="flex-grow bg-slate-50 border p-2.5 rounded-xl text-xs outline-none" 
                                    />
                                </div>
                                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-2xl text-xs font-bold transition">Send Request</button>
                            </form>
                        )}
                    </div>
                </div>
            </div>

            {/* Report Modal */}
            {reportModalOpen && (
                <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
                        <h3 className="text-base font-bold text-slate-900">Report Product</h3>
                        <form onSubmit={handleReportSubmit} className="space-y-3">
                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1">Reason</label>
                                <select value={reportReason} onChange={e => setReportReason(e.target.value)} className="w-full bg-slate-50 border p-2.5 rounded-xl text-xs outline-none">
                                    <option value="Fake product">Fake product</option>
                                    <option value="Incorrect information">Incorrect information</option>
                                    <option value="Suspicious seller">Suspicious seller</option>
                                    <option value="Duplicate listing">Duplicate listing</option>
                                    <option value="Inappropriate content">Inappropriate content</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1">Description</label>
                                <textarea rows="3" value={reportDesc} onChange={e => setReportDesc(e.target.value)} placeholder="Provide details..." required className="w-full bg-slate-50 border p-2.5 rounded-xl text-xs outline-none" />
                            </div>
                            <div className="flex space-x-3 pt-2">
                                <button type="button" onClick={() => setReportModalOpen(false)} className="flex-1 bg-slate-100 py-2.5 rounded-xl text-xs font-bold">Cancel</button>
                                <button type="submit" className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2.5 rounded-xl text-xs font-bold">Submit Report</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
