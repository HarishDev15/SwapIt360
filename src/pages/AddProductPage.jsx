import React, { useState, useContext } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { AppContext, CATEGORIES } from '../context/AppContext';

export function AddProductPage() {
    const { currentUser, products, setProducts, showToast, addNotification } = useContext(AppContext);
    const navigate = useNavigate();

    if (!currentUser || currentUser.role !== 'student') {
        return <Navigate to="/login" />;
    }

    const [form, setForm] = useState({
        name: "", description: "", category: "Books", originalPrice: "", sellingPrice: "", condition: "Good", productAge: "6 Months", transactionType: "Buy", campusLocation: currentUser.campusLocation || "", image: ""
    });

    const calculateSuggestedPrice = (orig, cond) => {
        const p = parseFloat(orig) || 0;
        if (cond === "Like New") return Math.round(p * 0.8);
        if (cond === "Good") return Math.round(p * 0.65);
        if (cond === "Used") return Math.round(p * 0.5);
        return 0;
    };

    const computedSuggestion = calculateSuggestedPrice(form.originalPrice, form.condition);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (parseFloat(form.sellingPrice) > parseFloat(form.originalPrice)) {
            if (!confirm("Selling price is higher than original price. Proceed?")) return;
        }

        const newProduct = {
            id: Date.now(),
            sellerId: currentUser.id,
            name: form.name,
            description: form.description,
            category: form.category,
            originalPrice: parseFloat(form.originalPrice),
            sellingPrice: parseFloat(form.sellingPrice),
            condition: form.condition,
            productAge: form.productAge,
            transactionType: form.transactionType,
            campusLocation: form.campusLocation,
            images: [form.image || "https://placehold.co/400x300/2563eb/ffffff?text=SwapIt360+Item"],
            status: "Available",
            approvalStatus: "Pending",
            featured: false,
            rejectionReason: "",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        setProducts([newProduct, ...products]);
        addNotification(currentUser.id, "product", `Your product "${form.name}" was submitted for admin approval.`);
        showToast("Product submitted for admin approval.");
        navigate('/my-listings');
    };

    return (
        <div className="max-w-2xl mx-auto px-4 py-8">
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
                <div>
                    <h2 className="text-xl font-extrabold text-slate-900">Sell an Item</h2>
                    <p className="text-xs text-slate-500">List an academic or hostel essential for campus students</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="sm:col-span-2">
                            <label className="block text-xs font-bold text-slate-700 mb-1">Product Name</label>
                            <input type="text" placeholder="Scientific Calculator" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required className="w-full bg-slate-50 border p-3 rounded-xl text-xs outline-none" />
                        </div>
                        <div className="sm:col-span-2">
                            <label className="block text-xs font-bold text-slate-700 mb-1">Description ({form.description.length} chars)</label>
                            <textarea rows="3" placeholder="Provide details..." value={form.description} onChange={e => setForm({...form, description: e.target.value})} required className="w-full bg-slate-50 border p-3 rounded-xl text-xs outline-none" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                            <select value={form.category} onChange={e => setForm({...form, category: e.target.value})} className="w-full bg-slate-50 border p-3 rounded-xl text-xs outline-none">
                                {CATEGORIES.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">Transaction Type</label>
                            <select value={form.transactionType} onChange={e => setForm({...form, transactionType: e.target.value})} className="w-full bg-slate-50 border p-3 rounded-xl text-xs outline-none">
                                <option value="Buy">Buy</option>
                                <option value="Rent">Rent</option>
                                <option value="Exchange">Exchange</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">Original Price (₹)</label>
                            <input type="number" placeholder="1000" value={form.originalPrice} onChange={e => setForm({...form, originalPrice: e.target.value})} required className="w-full bg-slate-50 border p-3 rounded-xl text-xs outline-none" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">Selling Price (₹)</label>
                            <input type="number" placeholder="700" value={form.sellingPrice} onChange={e => setForm({...form, sellingPrice: e.target.value})} required className="w-full bg-slate-50 border p-3 rounded-xl text-xs outline-none" />
                            {form.originalPrice && <span className="text-[10px] text-blue-600 mt-1 block font-semibold">Recommended selling price: ₹{computedSuggestion}</span>}
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">Condition</label>
                            <select value={form.condition} onChange={e => setForm({...form, condition: e.target.value})} className="w-full bg-slate-50 border p-3 rounded-xl text-xs outline-none">
                                <option value="Like New">Like New</option>
                                <option value="Good">Good</option>
                                <option value="Used">Used</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">Product Age</label>
                            <input type="text" placeholder="6 Months" value={form.productAge} onChange={e => setForm({...form, productAge: e.target.value})} required className="w-full bg-slate-50 border p-3 rounded-xl text-xs outline-none" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">Campus Location</label>
                            <input type="text" placeholder="Library Block" value={form.campusLocation} onChange={e => setForm({...form, campusLocation: e.target.value})} required className="w-full bg-slate-50 border p-3 rounded-xl text-xs outline-none" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">Image URL</label>
                            <input type="url" placeholder="https://..." value={form.image} onChange={e => setForm({...form, image: e.target.value})} className="w-full bg-slate-50 border p-3 rounded-xl text-xs outline-none" />
                        </div>
                    </div>
                    <div className="flex space-x-3 pt-2">
                        <button type="reset" onClick={() => setForm({ name: "", description: "", category: "Books", originalPrice: "", sellingPrice: "", condition: "Good", productAge: "6 Months", transactionType: "Buy", campusLocation: currentUser.campusLocation || "", image: "" })} className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-3 rounded-xl text-xs font-bold transition">Reset</button>
                        <button type="submit" className="flex-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl text-xs font-bold transition shadow">Submit Listing for Approval</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
