import React, { useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

export function EditProductPage() {
    const { id } = useParams();
    const { currentUser, products, setProducts, showToast } = useContext(AppContext);
    const navigate = useNavigate();

    const product = products.find(p => p.id === parseInt(id));

    if (!currentUser || !product || product.sellerId !== currentUser.id) {
        return <div className="text-center py-20 text-slate-600">Unauthorized or product not found.</div>;
    }

    const [form, setForm] = useState({
        name: product.name,
        description: product.description,
        category: product.category,
        originalPrice: product.originalPrice,
        sellingPrice: product.sellingPrice,
        condition: product.condition,
        productAge: product.productAge,
        transactionType: product.transactionType,
        campusLocation: product.campusLocation,
        image: product.images[0]
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const updated = products.map(p => p.id === product.id ? {
            ...p,
            ...form,
            originalPrice: parseFloat(form.originalPrice),
            sellingPrice: parseFloat(form.sellingPrice),
            images: [form.image],
            approvalStatus: "Pending",
            updatedAt: new Date().toISOString()
        } : p);

        setProducts(updated);
        showToast("Product updated and requires admin re-approval.");
        navigate('/my-listings');
    };

    return (
        <div className="max-w-2xl mx-auto px-4 py-8">
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
                <div>
                    <h2 className="text-xl font-extrabold text-slate-900">Edit Listing</h2>
                    <p className="text-xs text-amber-600 font-semibold">Editing an approved listing will set its status back to Pending approval.</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="sm:col-span-2">
                            <label className="block text-xs font-bold text-slate-700 mb-1">Product Name</label>
                            <input type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required className="w-full bg-slate-50 border p-3 rounded-xl text-xs outline-none" />
                        </div>
                        <div className="sm:col-span-2">
                            <label className="block text-xs font-bold text-slate-700 mb-1">Description</label>
                            <textarea rows="3" value={form.description} onChange={e => setForm({...form, description: e.target.value})} required className="w-full bg-slate-50 border p-3 rounded-xl text-xs outline-none" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">Selling Price (₹)</label>
                            <input type="number" value={form.sellingPrice} onChange={e => setForm({...form, sellingPrice: e.target.value})} required className="w-full bg-slate-50 border p-3 rounded-xl text-xs outline-none" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">Campus Location</label>
                            <input type="text" value={form.campusLocation} onChange={e => setForm({...form, campusLocation: e.target.value})} required className="w-full bg-slate-50 border p-3 rounded-xl text-xs outline-none" />
                        </div>
                    </div>
                    <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl text-xs font-bold transition shadow">Save Changes</button>
                </form>
            </div>
        </div>
    );
}
