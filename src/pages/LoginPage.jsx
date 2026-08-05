import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

export function LoginPage() {
    const { users, setCurrentUser, showToast } = useContext(AppContext);
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
        const user = users.find(u => u.email === email && u.password === password);
        if (!user) {
            showToast("Invalid email or password.", "error");
            return;
        }
        if (user.status === "Inactive") {
            showToast("Your account has been deactivated by admin.", "error");
            return;
        }
        setCurrentUser(user);
        showToast("Login successful!");
        if (user.role === 'admin') navigate('/admin-dashboard');
        else navigate('/');
    };

    return (
        <div className="max-w-md mx-auto px-4 py-16">
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
                <div className="text-center space-y-1">
                    <h2 className="text-xl font-extrabold text-slate-900">Welcome Back</h2>
                    <p className="text-xs text-slate-500">Log in to your SwapIt360 account</p>
                </div>
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">College Email</label>
                        <input type="email" placeholder="student@swapit360.com" value={email} onChange={e => setEmail(e.target.value)} required className="w-full bg-slate-50 border p-3 rounded-xl text-xs outline-none" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Password</label>
                        <input type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required className="w-full bg-slate-50 border p-3 rounded-xl text-xs outline-none" />
                    </div>
                    <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl text-xs font-bold transition shadow">Login</button>
                </form>
                <p className="text-center text-xs text-slate-500 pt-2">
                    Don't have an account? <Link to="/register" className="text-blue-600 font-bold hover:underline">Register here</Link>
                </p>
            </div>
        </div>
    );
}
