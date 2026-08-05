import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

export function Navbar() {
    const { currentUser, logout, notifications, wishlists, requests, setNotifications } = useContext(AppContext);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

    const userNotifs = notifications.filter(n => n.userId === currentUser?.id);
    const unreadNotifCount = userNotifs.filter(n => !n.read).length;
    const userWishlistCount = wishlists.find(w => w.userId === currentUser?.id)?.productIds?.length || 0;
    const pendingReqCount = requests.filter(r => (currentUser?.role === 'admin' || r.sellerId === currentUser?.id) && r.status === 'Pending').length;

    const markAllRead = () => {
        const updated = notifications.map(n => n.userId === currentUser.id ? { ...n, read: true } : n);
        setNotifications(updated);
    };

    return (
        <div className="sticky top-0 z-40 bg-white shadow-sm border-b border-slate-200">
            <div className="bg-blue-600 text-white text-[11px] py-1.5 px-4 text-center font-medium flex justify-between items-center max-w-7xl mx-auto">
                <span>Buy • Sell • Rent • Exchange — Everything Students Need</span>
                <span className="hidden sm:inline bg-blue-700 px-2 py-0.5 rounded text-[10px]">Trusted Student Marketplace</span>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2.5">
                        <div className="bg-blue-600 text-white p-2 rounded-xl font-extrabold text-sm tracking-wide shadow-sm">S360</div>
                        <span className="font-extrabold text-slate-900 text-base tracking-tight">SwapIt360</span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center space-x-6 text-xs font-semibold text-slate-700">
                        <Link to="/" className="hover:text-blue-600 transition">Home</Link>
                        <Link to="/products" className="hover:text-blue-600 transition">Marketplace</Link>
                        <Link to="/products" className="hover:text-blue-600 transition">Categories</Link>
                        
                        {currentUser?.role === 'student' && (
                            <>
                                <Link to="/add-product" className="bg-blue-600 hover:bg-blue-700 text-white px-3.5 py-2 rounded-xl shadow-sm transition">Sell Item</Link>
                                
                                <Link to="/wishlist" className="relative hover:text-blue-600 transition flex items-center">
                                    <span>Wishlist</span>
                                    {userWishlistCount > 0 && (
                                        <span className="absolute -top-2 -right-3 bg-rose-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px]">
                                            {userWishlistCount}
                                        </span>
                                    )}
                                </Link>

                                <Link to="/requests" className="relative hover:text-blue-600 transition flex items-center">
                                    <span>Requests</span>
                                    {pendingReqCount > 0 && (
                                        <span className="absolute -top-2 -right-3 bg-amber-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px]">
                                            {pendingReqCount}
                                        </span>
                                    )}
                                </Link>
                            </>
                        )}

                        {currentUser?.role === 'admin' && (
                            <Link to="/admin-dashboard" className="text-blue-600 font-bold">Admin Dashboard</Link>
                        )}
                    </nav>

                    {/* Right Actions */}
                    <div className="hidden md:flex items-center space-x-4">
                        {currentUser && (
                            <div className="relative">
                                <button 
                                    onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
                                    className="relative p-2 text-slate-600 hover:text-blue-600 transition">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
                                    {unreadNotifCount > 0 && (
                                        <span className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-4 h-4 flex items-center justify-center text-[9px] font-bold">
                                            {unreadNotifCount}
                                        </span>
                                    )}
                                </button>

                                {notifDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50">
                                        <div className="px-4 py-2 border-b flex justify-between items-center text-xs font-bold text-slate-800">
                                            <span>Notifications</span>
                                            <span className="text-[10px] text-blue-600 cursor-pointer hover:underline" onClick={markAllRead}>Mark all read</span>
                                        </div>
                                        <div className="max-h-64 overflow-y-auto divide-y divide-slate-100">
                                            {userNotifs.length === 0 ? (
                                                <div className="p-4 text-center text-xs text-slate-400">No notifications</div>
                                            ) : (
                                                userNotifs.map(n => (
                                                    <div key={n.id} className={`p-3 text-xs text-slate-700 hover:bg-slate-50 transition ${!n.read ? 'bg-blue-50/50' : ''}`}>
                                                        <p>{n.message}</p>
                                                        <span className="text-[10px] text-slate-400 mt-1 block">{n.createdAt}</span>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {currentUser ? (
                            <div className="relative">
                                <button 
                                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                                    className="flex items-center space-x-2 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-xl transition">
                                    <div className="w-7 h-7 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                                        {currentUser.fullName[0]}
                                    </div>
                                    <span className="text-xs font-bold text-slate-800">{currentUser.fullName.split(' ')[0]}</span>
                                </button>

                                {profileDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 text-xs font-semibold text-slate-700">
                                        {currentUser.role === 'student' ? (
                                            <>
                                                <Link to="/profile" onClick={() => setProfileDropdownOpen(false)} className="block px-4 py-2 hover:bg-slate-50">My Profile</Link>
                                                <Link to="/my-listings" onClick={() => setProfileDropdownOpen(false)} className="block px-4 py-2 hover:bg-slate-50">My Listings</Link>
                                                <Link to="/requests" onClick={() => setProfileDropdownOpen(false)} className="block px-4 py-2 hover:bg-slate-50">My Requests</Link>
                                                <Link to="/wishlist" onClick={() => setProfileDropdownOpen(false)} className="block px-4 py-2 hover:bg-slate-50">Wishlist</Link>
                                            </>
                                        ) : (
                                            <>
                                                <Link to="/admin-dashboard" onClick={() => setProfileDropdownOpen(false)} className="block px-4 py-2 hover:bg-slate-50">Admin Dashboard</Link>
                                                <Link to="/admin-products" onClick={() => setProfileDropdownOpen(false)} className="block px-4 py-2 hover:bg-slate-50">Product Approvals</Link>
                                                <Link to="/admin-users" onClick={() => setProfileDropdownOpen(false)} className="block px-4 py-2 hover:bg-slate-50">Student Management</Link>
                                                <Link to="/admin-reports" onClick={() => setProfileDropdownOpen(false)} className="block px-4 py-2 hover:bg-slate-50">Reports Management</Link>
                                            </>
                                        )}
                                        <div className="border-t my-1"></div>
                                        <button onClick={() => { logout(); setProfileDropdownOpen(false); }} className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50">Logout</button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="flex space-x-2">
                                <Link to="/login" className="bg-slate-100 hover:bg-slate-200 text-slate-800 px-4 py-2 rounded-xl text-xs font-bold transition">Login</Link>
                                <Link to="/register" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-xs font-bold transition">Register</Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Hamburger */}
                    <div className="md:hidden flex items-center">
                        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-slate-700 p-2">
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-white border-b px-4 py-4 space-y-3 text-xs font-semibold">
                    <Link to="/" onClick={() => setMobileMenuOpen(false)} className="block py-1.5">Home</Link>
                    <Link to="/products" onClick={() => setMobileMenuOpen(false)} className="block py-1.5">Marketplace</Link>
                    <Link to="/products" onClick={() => setMobileMenuOpen(false)} className="block py-1.5">Categories</Link>
                    {currentUser?.role === 'student' && (
                        <>
                            <Link to="/add-product" onClick={() => setMobileMenuOpen(false)} className="block py-1.5">Sell Item</Link>
                            <Link to="/wishlist" onClick={() => setMobileMenuOpen(false)} className="block py-1.5">Wishlist</Link>
                            <Link to="/requests" onClick={() => setMobileMenuOpen(false)} className="block py-1.5">Requests</Link>
                            <Link to="/profile" onClick={() => setMobileMenuOpen(false)} className="block py-1.5">Profile</Link>
                            <Link to="/my-listings" onClick={() => setMobileMenuOpen(false)} className="block py-1.5">My Listings</Link>
                        </>
                    )}
                    {currentUser?.role === 'admin' && (
                        <Link to="/admin-dashboard" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 text-blue-600">Admin Dashboard</Link>
                    )}
                    <div className="pt-3 border-t flex justify-between items-center">
                        {currentUser ? (
                            <>
                                <span className="text-slate-600">{currentUser.fullName}</span>
                                <button onClick={() => { logout(); setMobileMenuOpen(false); }} className="text-red-600 font-bold">Logout</button>
                            </>
                        ) : (
                            <div className="flex space-x-2 w-full">
                                <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="flex-1 text-center bg-slate-100 py-2 rounded-xl">Login</Link>
                                <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="flex-1 text-center bg-blue-600 text-white py-2 rounded-xl">Register</Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
