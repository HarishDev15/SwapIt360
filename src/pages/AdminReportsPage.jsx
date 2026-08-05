import React, { useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { StatusBadge } from '../components/StatusBadge';

export function AdminReportsPage() {
    const { currentUser, reports, setReports, products, setProducts, showToast, setConfirmModal, addNotification } = useContext(AppContext);
    if (!currentUser || currentUser.role !== 'admin') return <Navigate to="/login" />;

    const handleResolve = (id) => {
        setReports(reports.map(r => r.id === id ? { ...r, status: 'Resolved' } : r));
        showToast("Report resolved.");
    };

    const handleDismiss = (id) => {
        setReports(reports.map(r => r.id === id ? { ...r, status: 'Dismissed' } : r));
        showToast("Report dismissed.");
    };

    const handleRemoveProduct = (productId, reportId) => {
        setConfirmModal({
            title: "Remove Suspicious Product",
            message: "Are you sure you want to remove this suspicious product?",
            onConfirm: () => {
                const targetProd = products.find(p => p.id === productId);
                setProducts(products.filter(p => p.id !== productId));
                setReports(reports.map(r => r.id === reportId ? { ...r, status: 'Resolved' } : r));
                if (targetProd) {
                    addNotification(targetProd.sellerId, 'product', `Your product "${targetProd.name}" was removed by admin due to a report.`);
                }
                showToast("Product removed and report resolved.");
            }
        });
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
            <div>
                <h1 className="text-2xl font-extrabold text-slate-900">Reports Management</h1>
                <p className="text-xs text-slate-500 mt-1">{reports.filter(r => r.status === 'Open').length} open reports</p>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                {reports.length === 0 ? (
                    <div className="p-12 text-center text-xs text-slate-400">No reports submitted.</div>
                ) : (
                    <div className="divide-y divide-slate-100">
                        {reports.map(r => {
                            const prod = products.find(p => p.id === r.productId) || { name: "Removed Product" };
                            return (
                                <div key={r.id} className="p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                    <div className="space-y-1">
                                        <div className="flex items-center space-x-2">
                                            <StatusBadge status={r.status} type="general" />
                                            <span className="text-xs font-bold text-red-600">{r.reason}</span>
                                        </div>
                                        <h4 className="font-bold text-slate-900 text-sm">Product: {prod.name}</h4>
                                        <p className="text-xs text-slate-600">"{r.description}"</p>
                                        <span className="text-[10px] text-slate-400">Submitted: {r.createdAt}</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Link to={`/product/${r.productId}`} className="px-3 py-1.5 bg-slate-100 rounded-xl text-xs font-bold">View Product</Link>
                                        {r.status === 'Open' && (
                                            <>
                                                <button onClick={() => handleResolve(r.id)} className="px-3 py-1.5 bg-emerald-600 text-white rounded-xl text-xs font-bold">Resolve</button>
                                                <button onClick={() => handleDismiss(r.id)} className="px-3 py-1.5 bg-amber-600 text-white rounded-xl text-xs font-bold">Dismiss</button>
                                                <button onClick={() => handleRemoveProduct(r.productId, r.id)} className="px-3 py-1.5 bg-red-600 text-white rounded-xl text-xs font-bold">Remove Product</button>
                                            </>
                                        )}
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
