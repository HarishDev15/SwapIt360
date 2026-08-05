import React, { useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { StatusBadge } from '../components/StatusBadge';

export function MyListingsPage() {
    const { currentUser, products, setProducts, requests, setConfirmModal, showToast } = useContext(AppContext);

    if (!currentUser || currentUser.role !== 'student') return <Navigate to="/login" />;

    const myListings = products.filter(p => p.sellerId === currentUser.id);
    const total = myListings.length;
    const available = myListings.filter(p => p.status === "Available" && p.approvalStatus === "Approved").length;
    const pending = myListings.filter(p => p.approvalStatus === "Pending").length;
    const sold = myListings.filter(p => p.status === "Sold").length;

    const handleDelete = (id) => {
        setConfirmModal({
            title: "Delete Listing",
            message: "Are you sure you want to delete this product?",
            onConfirm: () => {
                setProducts(products.filter(p => p.id !== id));
                showToast("Product deleted successfully.");
            }
        });
    };

    const toggleStatus = (id, currentStatus) => {
        const nextStatus = currentStatus === "Available" ? "Sold" : "Available";
        setConfirmModal({
            title: `Mark as ${nextStatus}`,
            message: `Are you sure you want to mark this product as ${nextStatus}?`,
            onConfirm: () => {
                setProducts(products.map(p => p.id === id ? { ...p, status: nextStatus } : p));
                showToast(`Product marked as ${nextStatus}.`);
            }
        });
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-extrabold text-slate-900">My Listings</h1>
                    <p className="text-xs text-slate-500 mt-1">Manage your academic and hostel items</p>
                </div>
                <Link to="/add-product" className="bg-blue-600 text-white px-4 py-2.5 rounded-xl text-xs font-bold">+ Sell Product</Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-200">
                    <span className="text-xs text-slate-500 font-bold">Total Listings</span>
                    <h3 className="text-2xl font-extrabold text-slate-900 mt-1">{total}</h3>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-200">
                    <span className="text-xs text-emerald-600 font-bold">Available</span>
                    <h3 className="text-2xl font-extrabold text-slate-900 mt-1">{available}</h3>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-200">
                    <span className="text-xs text-amber-600 font-bold">Pending Approval</span>
                    <h3 className="text-2xl font-extrabold text-slate-900 mt-1">{pending}</h3>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-200">
                    <span className="text-xs text-slate-600 font-bold">Sold</span>
                    <h3 className="text-2xl font-extrabold text-slate-900 mt-1">{sold}</h3>
                </div>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                {myListings.length === 0 ? (
                    <div className="p-12 text-center text-xs text-slate-400">You haven't listed any products yet.</div>
                ) : (
                    <div className="divide-y divide-slate-100">
                        {myListings.map(p => {
                            const reqCount = requests.filter(r => r.productId === p.id).length;
                            return (
                                <div key={p.id} className="p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                    <div className="flex items-center space-x-4">
                                        <img src={p.images[0]} className="w-16 h-16 rounded-2xl object-cover border" />
                                        <div className="space-y-1">
                                            <div className="flex items-center space-x-2">
                                                <StatusBadge status={p.approvalStatus} type="approval" />
                                                <StatusBadge status={p.status} type="general" />
                                            </div>
                                            <h4 className="font-bold text-slate-900 text-sm">{p.name}</h4>
                                            <p className="text-xs text-blue-600 font-bold">₹{p.sellingPrice} • {reqCount} requests</p>
                                            {p.approvalStatus === 'Rejected' && p.rejectionReason && (
                                                <p className="text-[11px] text-red-600">Reason: {p.rejectionReason}</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
                                        <Link to={`/product/${p.id}`} className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold">View</Link>
                                        <Link to={`/edit-product/${p.id}`} className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl text-xs font-bold">Edit</Link>
                                        <button onClick={() => toggleStatus(p.id, p.status)} className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-xl text-xs font-bold">
                                            {p.status === 'Available' ? 'Mark Sold' : 'Mark Available'}
                                        </button>
                                        <button onClick={() => handleDelete(p.id)} className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 rounded-xl text-xs font-bold">Delete</button>
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
