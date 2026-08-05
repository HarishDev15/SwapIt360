import React, { useState, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { StatusBadge } from '../components/StatusBadge';

export function RequestsPage() {
    const { currentUser, requests, setRequests, products, setProducts, users, reviews, setReviews, addNotification, showToast, setConfirmModal } = useContext(AppContext);
    const [activeTab, setActiveTab] = useState("sent");
    const [reviewModalReq, setReviewModalReq] = useState(null);
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");

    if (!currentUser) return <Navigate to="/login" />;

    const sentRequests = requests.filter(r => r.buyerId === currentUser.id);
    const receivedRequests = requests.filter(r => r.sellerId === currentUser.id);

    const handleCancel = (id) => {
        setConfirmModal({
            title: "Cancel Request",
            message: "Are you sure you want to cancel this request?",
            onConfirm: () => {
                setRequests(requests.map(r => r.id === id ? { ...r, status: "Cancelled", updatedAt: new Date().toISOString().split('T')[0] } : r));
                showToast("Request cancelled.");
            }
        });
    };

    const handleStatusChange = (id, newStatus) => {
        const req = requests.find(r => r.id === id);
        if (newStatus === "Completed") {
            setConfirmModal({
                title: "Complete Transaction",
                message: "Completing this transaction will mark the product as sold. Proceed?",
                onConfirm: () => {
                    setRequests(requests.map(r => r.id === id ? { ...r, status: "Completed", updatedAt: new Date().toISOString().split('T')[0] } : r));
                    setProducts(products.map(p => p.id === req.productId ? { ...p, status: "Sold" } : p));
                    addNotification(req.buyerId, "request", `Your transaction for request #${req.id} was marked completed.`);
                    showToast("Transaction completed and product marked sold.");
                }
            });
        } else if (newStatus === "Accepted") {
            const otherPending = requests.filter(r => r.productId === req.productId && r.id !== req.id && r.status === 'Pending');
            if (otherPending.length > 0) {
                setConfirmModal({
                    title: "Accept Request",
                    message: `Accepting this request will automatically reject ${otherPending.length} other pending request(s) for this product. Proceed?`,
                    onConfirm: () => {
                        setRequests(requests.map(r => {
                            if (r.id === id) return { ...r, status: "Accepted", updatedAt: new Date().toISOString().split('T')[0] };
                            if (r.productId === req.productId && r.status === 'Pending') return { ...r, status: "Rejected", updatedAt: new Date().toISOString().split('T')[0] };
                            return r;
                        }));
                        addNotification(req.buyerId, "request", `Your request for product #${req.productId} was accepted!`);
                        showToast("Request accepted and other pending requests rejected.");
                    }
                });
            } else {
                setRequests(requests.map(r => r.id === id ? { ...r, status: "Accepted", updatedAt: new Date().toISOString().split('T')[0] } : r));
                addNotification(req.buyerId, "request", `Your request for product #${req.productId} was accepted!`);
                showToast("Request accepted.");
            }
        } else {
            setRequests(requests.map(r => r.id === id ? { ...r, status: newStatus, updatedAt: new Date().toISOString().split('T')[0] } : r));
            addNotification(req.buyerId, "request", `Your request status changed to ${newStatus}.`);
            showToast(`Request ${newStatus.toLowerCase()}.`);
        }
    };

    const handleReviewSubmit = (e) => {
        e.preventDefault();
        const duplicateReview = reviews.some(rev => rev.requestId === reviewModalReq.id);
        if (duplicateReview) {
            showToast("You have already reviewed this completed request.", "error");
            setReviewModalReq(null);
            return;
        }

        const newRev = {
            id: Date.now(),
            requestId: reviewModalReq.id,
            buyerId: currentUser.id,
            sellerId: reviewModalReq.sellerId,
            rating: parseInt(rating),
            comment,
            createdAt: new Date().toISOString().split('T')[0]
        };
        setReviews([...reviews, newRev]);
        addNotification(reviewModalReq.sellerId, "review", `You received a ${rating}-star review for completed request #${reviewModalReq.id}.`);
        setReviewModalReq(null);
        setComment("");
        showToast("Review submitted successfully!");
    };

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-extrabold text-slate-900">Transaction Requests</h1>
                <div className="flex bg-slate-200 p-1 rounded-2xl text-xs font-bold">
                    <button onClick={() => setActiveTab("sent")} className={`px-4 py-2 rounded-xl transition ${activeTab === 'sent' ? 'bg-white shadow text-blue-600' : 'text-slate-600'}`}>
                        Requests Sent ({sentRequests.length})
                    </button>
                    <button onClick={() => setActiveTab("received")} className={`px-4 py-2 rounded-xl transition ${activeTab === 'received' ? 'bg-white shadow text-blue-600' : 'text-slate-600'}`}>
                        Requests Received ({receivedRequests.length})
                    </button>
                </div>
            </div>

            <div className="space-y-4">
                {activeTab === 'sent' && (
                    sentRequests.length === 0 ? (
                        <div className="bg-white p-12 rounded-3xl border text-center text-xs text-slate-400">No requests sent yet.</div>
                    ) : (
                        sentRequests.map(r => {
                            const prod = products.find(p => p.id === r.productId) || { name: "Product", images: [] };
                            const seller = users.find(u => u.id === r.sellerId) || { fullName: "Seller" };
                            const hasReviewed = reviews.some(rev => rev.requestId === r.id);
                            return (
                                <div key={r.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                    <div className="flex items-center space-x-4">
                                        <img src={prod.images?.[0]} className="w-16 h-16 rounded-2xl object-cover border" />
                                        <div className="space-y-1">
                                            <div className="flex items-center space-x-2">
                                                <StatusBadge status={r.status} type="general" />
                                                <span className="text-xs font-bold text-blue-600">{r.type}</span>
                                            </div>
                                            <h4 className="font-bold text-slate-900 text-sm">{prod.name}</h4>
                                            <p className="text-xs text-slate-600">Seller: {seller.fullName} • "{r.message}"</p>
                                            <span className="text-[10px] text-slate-400 block">{r.createdAt}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
                                        {r.status === 'Pending' && (
                                            <button onClick={() => handleCancel(r.id)} className="px-3 py-1.5 bg-red-50 text-red-700 rounded-xl text-xs font-bold">Cancel</button>
                                        )}
                                        {r.status === 'Completed' && !hasReviewed && (
                                            <button onClick={() => setReviewModalReq(r)} className="px-3.5 py-1.5 bg-blue-600 text-white rounded-xl text-xs font-bold">Rate Seller</button>
                                        )}
                                    </div>
                                </div>
                            );
                        })
                    )
                )}

                {activeTab === 'received' && (
                    receivedRequests.length === 0 ? (
                        <div className="bg-white p-12 rounded-3xl border text-center text-xs text-slate-400">No requests received yet.</div>
                    ) : (
                        receivedRequests.map(r => {
                            const prod = products.find(p => p.id === r.productId) || { name: "Product", images: [] };
                            const buyer = users.find(u => u.id === r.buyerId) || { fullName: "Buyer" };
                            return (
                                <div key={r.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                    <div className="flex items-center space-x-4">
                                        <img src={prod.images?.[0]} className="w-16 h-16 rounded-2xl object-cover border" />
                                        <div className="space-y-1">
                                            <div className="flex items-center space-x-2">
                                                <StatusBadge status={r.status} type="general" />
                                                <span className="text-xs font-bold text-blue-600">{r.type}</span>
                                            </div>
                                            <h4 className="font-bold text-slate-900 text-sm">{prod.name}</h4>
                                            <p className="text-xs text-slate-600">Buyer: {buyer.fullName} • "{r.message}"</p>
                                            <span className="text-[10px] text-slate-400 block">{r.createdAt}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
                                        {r.status === 'Pending' && (
                                            <>
                                                <button onClick={() => handleStatusChange(r.id, 'Accepted')} className="px-3 py-1.5 bg-emerald-600 text-white rounded-xl text-xs font-bold">Accept</button>
                                                <button onClick={() => handleStatusChange(r.id, 'Rejected')} className="px-3 py-1.5 bg-red-50 text-red-700 rounded-xl text-xs font-bold">Reject</button>
                                            </>
                                        )}
                                        {r.status === 'Accepted' && (
                                            <button onClick={() => handleStatusChange(r.id, 'Completed')} className="px-3 py-1.5 bg-blue-600 text-white rounded-xl text-xs font-bold">Mark Completed</button>
                                        )}
                                    </div>
                                </div>
                            );
                        })
                    )
                )}
            </div>

            {reviewModalReq && (
                <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
                        <h3 className="text-base font-bold text-slate-900">Rate Seller</h3>
                        <form onSubmit={handleReviewSubmit} className="space-y-3">
                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1">Rating (1 to 5 Stars)</label>
                                <select value={rating} onChange={e => setRating(e.target.value)} className="w-full bg-slate-50 border p-2.5 rounded-xl text-xs outline-none">
                                    <option value="5">⭐⭐⭐⭐⭐ (5/5)</option>
                                    <option value="4">⭐⭐⭐⭐ (4/5)</option>
                                    <option value="3">⭐⭐⭐ (3/5)</option>
                                    <option value="2">⭐⭐ (2/5)</option>
                                    <option value="1">⭐ (1/5)</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1">Comment</label>
                                <textarea rows="3" value={comment} onChange={e => setComment(e.target.value)} placeholder="Write your feedback..." required className="w-full bg-slate-50 border p-2.5 rounded-xl text-xs outline-none" />
                            </div>
                            <div className="flex space-x-3 pt-2">
                                <button type="button" onClick={() => setReviewModalReq(null)} className="flex-1 bg-slate-100 py-2.5 rounded-xl text-xs font-bold">Cancel</button>
                                <button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl text-xs font-bold">Submit Review</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
