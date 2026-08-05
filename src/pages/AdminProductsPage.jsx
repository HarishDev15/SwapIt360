import React, { useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

export function AdminProductsPage() {
    const { currentUser, products, setProducts, users, addNotification, showToast, setConfirmModal } = useContext(AppContext);
    if (!currentUser || currentUser.role !== 'admin') return <Navigate to="/login" />;

    const pendingProducts = products.filter(p => p.approvalStatus === 'Pending');

    const handleApprove = (id) => {
        setProducts(products.map(p => p.id === id ? { ...p, approvalStatus: 'Approved' } : p));
        const prod = products.find(p => p.id === id);
        if (prod) addNotification(prod.sellerId, 'product', `Your product "${prod.name}" was approved by admin!`);
        showToast("Product approved successfully.");
    };

    const handleReject = (id) => {
        const reason = prompt("Enter rejection reason:");
        if (!reason) return;
        setConfirmModal({
            title: "Reject Product",
            message: `Are you sure you want to reject this product? Reason: "${reason}"`,
            onConfirm: () => {
                setProducts(products.map(p => p.id === id ? { ...p, approvalStatus: 'Rejected', rejectionReason: reason } : p));
                const prod = products.find(p => p.id === id);
                if (prod) addNotification(prod.sellerId, 'product', `Your product "${prod.name}" was rejected. Reason: ${reason}`);
                showToast("Product rejected.");
            }
        });
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
            <div>
                <h1 className="text-2xl font-extrabold text-slate-900">Product Approvals</h1>
                <p className="text-xs text-slate-500 mt-1">{pendingProducts.length} listings awaiting moderation</p>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                {pendingProducts.length === 0 ? (
                    <div className="p-12 text-center text-xs text-slate-400">No pending products to approve.</div>
                ) : (
                    <div className="divide-y divide-slate-100">
                        {pendingProducts.map(p => {
                            const seller = users.find(u => u.id === p.sellerId) || { fullName: "Student" };
                            return (
                                <div key={p.id} className="p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                    <div className="flex items-center space-x-4">
                                        <img src={p.images[0]} className="w-16 h-16 rounded-2xl object-cover border" />
                                        <div className="space-y-1">
                                            <h4 className="font-bold text-slate-900 text-sm">{p.name}</h4>
                                            <p className="text-xs text-slate-500">Seller: {seller.fullName} • ₹{p.sellingPrice} • {p.category}</p>
                                            <span className="text-[10px] text-slate-400">Submitted: {p.createdAt.split('T')[0]}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Link to={`/product/${p.id}`} className="px-3 py-1.5 bg-slate-100 rounded-xl text-xs font-bold">View</Link>
                                        <button onClick={() => handleApprove(p.id)} className="px-3 py-1.5 bg-emerald-600 text-white rounded-xl text-xs font-bold">Approve</button>
                                        <button onClick={() => handleReject(p.id)} className="px-3 py-1.5 bg-red-600 text-white rounded-xl text-xs font-bold">Reject</button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
