import React, { useState, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AppContext, DEPARTMENTS, ACADEMIC_YEARS } from '../context/AppContext';

export function ProfilePage() {
    const { currentUser, setUsers, products, wishlists, requests, reviews, showToast } = useContext(AppContext);
    if (!currentUser) return <Navigate to="/login" />;

    const [isEditing, setIsEditing] = useState(false);
    const [form, setForm] = useState({
        fullName: currentUser.fullName,
        department: currentUser.department,
        academicYear: currentUser.academicYear,
        campusLocation: currentUser.campusLocation
    });

    const userListings = products.filter(p => p.sellerId === currentUser.id);
    const availableListings = userListings.filter(p => p.status === 'Available').length;
    const soldListings = userListings.filter(p => p.status === 'Sold').length;
    const wishlistCount = wishlists.find(w => w.userId === currentUser.id)?.productIds?.length || 0;
    const sentReqCount = requests.filter(r => r.buyerId === currentUser.id).length;
    const receivedReqCount = requests.filter(r => r.sellerId === currentUser.id).length;

    const userReviews = reviews.filter(r => r.sellerId === currentUser.id);
    const avgRating = userReviews.length > 0 ? (userReviews.reduce((sum, r) => sum + r.rating, 0) / userReviews.length).toFixed(1) : "5.0";

    const handleSave = (e) => {
        e.preventDefault();
        const updatedUser = { ...currentUser, ...form };
        const allUsers = JSON.parse(localStorage.getItem("swapit360Users") || "[]");
        const newUsers = allUsers.map(u => u.id === currentUser.id ? updatedUser : u);
        localStorage.setItem("swapit360Users", JSON.stringify(newUsers));
        setUsers(newUsers);
        localStorage.setItem("swapit360CurrentUser", JSON.stringify(updatedUser));
        setIsEditing(false);
        showToast("Profile updated successfully!");
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6">
                <div className="w-24 h-24 bg-blue-600 text-white rounded-3xl flex items-center justify-center text-3xl font-extrabold shadow-lg">
                    {currentUser.fullName[0]}
                </div>
                <div className="flex-grow text-center sm:text-left space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <h1 className="text-2xl font-extrabold text-slate-900">{currentUser.fullName}</h1>
                        <button onClick={() => setIsEditing(!isEditing)} className="bg-slate-100 hover:bg-slate-200 px-4 py-1.5 rounded-xl text-xs font-bold">
                            {isEditing ? "Cancel" : "Edit Profile"}
                        </button>
                    </div>
                    <p className="text-xs text-slate-500">{currentUser.email} • Roll: {currentUser.rollNumber}</p>
                    <p className="text-xs text-slate-700 font-semibold">{currentUser.department} • {currentUser.academicYear} • {currentUser.campusLocation}</p>
                    <div className="flex items-center space-x-4 pt-2 justify-center sm:justify-start text-xs font-bold text-slate-600">
                        <span>⭐ {avgRating} Rating</span>
                        <span>📦 {userReviews.length} Reviews</span>
                        <span>Status: <span className="text-emerald-600">{currentUser.status}</span></span>
                    </div>
                </div>
            </div>

            {isEditing && (
                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-4">
                    <h3 className="font-bold text-slate-900 text-sm">Update Profile Details</h3>
                    <form onSubmit={handleSave} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                            <input type="text" value={form.fullName} onChange={e => setForm({...form, fullName: e.target.value})} required className="w-full bg-slate-50 border p-2.5 rounded-xl text-xs outline-none" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">Campus Location</label>
                            <input type="text" value={form.campusLocation} onChange={e => setForm({...form, campusLocation: e.target.value})} required className="w-full bg-slate-50 border p-2.5 rounded-xl text-xs outline-none" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">Department</label>
                            <select value={form.department} onChange={e => setForm({...form, department: e.target.value})} className="w-full bg-slate-50 border p-2.5 rounded-xl text-xs outline-none">
                                {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">Academic Year</label>
                            <select value={form.academicYear} onChange={e => setForm({...form, academicYear: e.target.value})} className="w-full bg-slate-50 border p-2.5 rounded-xl text-xs outline-none">
                                {ACADEMIC_YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                            </select>
                        </div>
                        <div className="sm:col-span-2">
                            <button type="submit" className="bg-blue-600 text-white px-6 py-2.5 rounded-xl text-xs font-bold">Save Changes</button>
                        </div>
                    </form>
                </div>
            )}

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-white p-5 rounded-2xl border">
                    <span className="text-xs text-slate-500 font-bold">Total Listings</span>
                    <h3 className="text-xl font-extrabold text-slate-900 mt-1">{userListings.length}</h3>
                </div>
                <div className="bg-white p-5 rounded-2xl border">
                    <span className="text-xs text-emerald-600 font-bold">Available Listings</span>
                    <h3 className="text-xl font-extrabold text-slate-900 mt-1">{availableListings}</h3>
                </div>
                <div className="bg-white p-5 rounded-2xl border">
                    <span className="text-xs text-slate-600 font-bold">Sold Products</span>
                    <h3 className="text-xl font-extrabold text-slate-900 mt-1">{soldListings}</h3>
                </div>
                <div className="bg-white p-5 rounded-2xl border">
                    <span className="text-xs text-rose-600 font-bold">Wishlist Count</span>
                    <h3 className="text-xl font-extrabold text-slate-900 mt-1">{wishlistCount}</h3>
                </div>
                <div className="bg-white p-5 rounded-2xl border">
                    <span className="text-xs text-blue-600 font-bold">Requests Sent</span>
                    <h3 className="text-xl font-extrabold text-slate-900 mt-1">{sentReqCount}</h3>
                </div>
                <div className="bg-white p-5 rounded-2xl border">
                    <span className="text-xs text-purple-600 font-bold">Requests Received</span>
                    <h3 className="text-xl font-extrabold text-slate-900 mt-1">{receivedReqCount}</h3>
                </div>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-4">
                <h3 className="text-base font-bold text-slate-900">Seller Reviews ({userReviews.length})</h3>
                {userReviews.length === 0 ? (
                    <p className="text-xs text-slate-400">No reviews received yet.</p>
                ) : (
                    <div className="divide-y divide-slate-100">
                        {userReviews.map(rev => (
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
