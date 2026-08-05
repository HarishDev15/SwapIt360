import React from 'react';
import { Link } from 'react-router-dom';

export function Footer() {
    return (
        <footer className="bg-slate-900 text-slate-300 py-12 mt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                    <div className="flex items-center space-x-2.5 mb-3">
                        <div className="bg-blue-600 text-white p-1.5 rounded-lg font-bold text-xs">S360</div>
                        <span className="text-sm font-extrabold text-white">SwapIt360</span>
                    </div>
                    <p className="text-xs text-slate-400">India's trusted student marketplace for buying, selling, renting and exchanging college essentials.</p>
                    <div className="flex space-x-3 mt-4 text-xs font-bold text-blue-400">
                        <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:underline">LinkedIn</a>
                        <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:underline">GitHub</a>
                        <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:underline">Instagram</a>
                    </div>
                </div>
                <div>
                    <h4 className="text-white font-bold mb-3 text-xs uppercase tracking-wider">Marketplace</h4>
                    <ul className="space-y-2 text-xs">
                        <li><Link to="/products" className="hover:text-white transition">Categories</Link></li>
                        <li><Link to="/add-product" className="hover:text-white transition">Sell Product</Link></li>
                        <li><Link to="/products" className="hover:text-white transition">Browse All</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-white font-bold mb-3 text-xs uppercase tracking-wider">About & Help</h4>
                    <ul className="space-y-2 text-xs">
                        <li><Link to="/" className="hover:text-white transition">About</Link></li>
                        <li><Link to="/" className="hover:text-white transition">Contact</Link></li>
                        <li><Link to="/" className="hover:text-white transition">Privacy Policy</Link></li>
                        <li><Link to="/" className="hover:text-white transition">Terms</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-white font-bold mb-3 text-xs uppercase tracking-wider">Campus Safety</h4>
                    <p className="text-xs text-slate-400 mb-2">Always meet in secure public campus areas such as libraries or student unions for exchanges.</p>
                    <p className="text-xs text-slate-500 pt-2">© 2026 SwapIt360. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
}
