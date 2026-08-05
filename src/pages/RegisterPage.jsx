import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext, DEPARTMENTS, ACADEMIC_YEARS } from '../context/AppContext';

export function RegisterPage() {
    const { users, setUsers, setCurrentUser, showToast, addNotification } = useContext(AppContext);
    const navigate = useNavigate();
    const [form, setForm] = useState({
        fullName: "", email: "", rollNumber: "", department: "CSE", academicYear: "First Year", campusLocation: "", password: "", confirmPassword: "", terms: false
    });

    const handleRegister = (e) => {
        e.preventDefault();
        if (form.password.length < 6) {
            showToast("Password must be at least 6 characters.", "error");
            return;
        }
        if (form.password !== form.confirmPassword) {
            showToast("Passwords do not match.", "error");
            return;
        }
        if (!form.terms) {
            showToast("Please accept the terms and conditions.", "error");
            return;
        }
        if (users.some(u => u.email === form.email)) {
            showToast("Email is already registered.", "error");
            return;
        }
        if (users.some(u => u.rollNumber === form.rollNumber)) {
            showToast("Roll number is already registered.", "error");
            return;
        }

        const newUser = {
            id: Date.now(),
            fullName: form.fullName,
            email: form.email,
            password: form.password,
            rollNumber: form.rollNumber,
            department: form.department,
            academicYear: form.academicYear,
            campusLocation: form.campusLocation,
            role: "student",
            status: "Active",
            joinedAt: new Date().toISOString().split('T')[0]
        };

        setUsers([...users, newUser]);
        setCurrentUser(newUser);
        addNotification(newUser.id, "system", "Welcome to SwapIt360!");
        showToast("Registration successful!");
        navigate('/');
    };

    return (
        <div className="max-w-xl mx-auto px-4 py-10">
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
                <div className="text-center space-y-1">
                    <h2 className="text-xl font-extrabold text-slate-900">Student Registration</h2>
                    <p className="text-xs text-slate-500">Join the SwapIt360 campus e-commerce community</p>
                </div>
                <form onSubmit={handleRegister} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                            <input type="text" placeholder="Rahul Sharma" value={form.fullName} onChange={e => setForm({...form, fullName: e.target.value})} required className="w-full bg-slate-50 border p-3 rounded-xl text-xs outline-none" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">College Email</label>
                            <input type="email" placeholder="student@swapit360.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required className="w-full bg-slate-50 border p-3 rounded-xl text-xs outline-none" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">Roll Number</label>
                            <input type="text" placeholder="CSE202601" value={form.rollNumber} onChange={e => setForm({...form, rollNumber: e.target.value})} required className="w-full bg-slate-50 border p-3 rounded-xl text-xs outline-none" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">Campus Location</label>
                            <input type="text" placeholder="Block A Hostel" value={form.campusLocation} onChange={e => setForm({...form, campusLocation: e.target.value})} required className="w-full bg-slate-50 border p-3 rounded-xl text-xs outline-none" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">Department</label>
                            <select value={form.department} onChange={e => setForm({...form, department: e.target.value})} className="w-full bg-slate-50 border p-3 rounded-xl text-xs outline-none">
                                {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">Academic Year</label>
                            <select value={form.academicYear} onChange={e => setForm({...form, academicYear: e.target.value})} className="w-full bg-slate-50 border p-3 rounded-xl text-xs outline-none">
                                {ACADEMIC_YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">Password</label>
                            <input type="password" placeholder="••••••••" value={form.password} onChange={e => setForm({...form, password: e.target.value})} required className="w-full bg-slate-50 border p-3 rounded-xl text-xs outline-none" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">Confirm Password</label>
                            <input type="password" placeholder="••••••••" value={form.confirmPassword} onChange={e => setForm({...form, confirmPassword: e.target.value})} required className="w-full bg-slate-50 border p-3 rounded-xl text-xs outline-none" />
                        </div>
                    </div>
                    <div className="flex items-center space-x-2 pt-2">
                        <input type="checkbox" id="terms" checked={form.terms} onChange={e => setForm({...form, terms: e.target.checked})} className="w-4 h-4 text-blue-600 rounded" />
                        <label htmlFor="terms" className="text-xs font-semibold text-slate-700">I accept the campus safety terms and conditions.</label>
                    </div>
                    <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl text-xs font-bold transition shadow">Register Account</button>
                </form>
            </div>
        </div>
    );
}
