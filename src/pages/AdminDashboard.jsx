import React, { useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

export function AdminDashboard() {
    const { currentUser, users, products, reports } = useContext(AppContext);
    if (!currentUser || currentUser.role !== 'admin') return <Navigate to="/login" />;

    const totalStudents = users.filter(u => u.role === 'student').length;
    const activeStudents = users.filter(u => u.role === 'student' && u.status === 'Active').length;
    const pendingApprovals = products.filter(p => p.approvalStatus === 'Pending').length;
    const approvedProducts = products.filter(p => p.approvalStatus === 'Approved').length;
    const openReports = reports.filter(r => r.status === 'Open').length;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
            <div>
                <h1 className="text-2xl font-extrabold text-slate-900">Admin Dashboard</h1>
                <p className="text-xs text-slate-500 mt-1">Platform overview and campus moderation</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                <div className="bg-white p-5 rounded-2xl border"><span className="text-xs text-slate-500 font-bold">Total Students</span><h3 className="text-2xl font-extrabold text-slate-900 mt-1">{totalStudents}</h3></div>
                <div className="bg-white p-5 rounded-2xl border"><span className="text-xs text-emerald-600 font-bold">Active Students</span><h3 className="text-2xl font-extrabold text-slate-900 mt-1">{activeStudents}</h3></div>
                <div className="bg-white p-5 rounded-2xl border"><span className="text-xs text-amber-600 font-bold">Pending Approvals</span><h3 className="text-2xl font-extrabold text-slate-900 mt-1">{pendingApprovals}</h3></div>
                <div className="bg-white p-5 rounded-2xl border"><span className="text-xs text-blue-600 font-bold">Approved Products</span><h3 className="text-2xl font-extrabold text-slate-900 mt-1">{approvedProducts}</h3></div>
                <div className="bg-white p-5 rounded-2xl border"><span className="text-xs text-red-600 font-bold">Open Reports</span><h3 className="text-2xl font-extrabold text-slate-900 mt-1">{openReports}</h3></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Link to="/admin-products" className="bg-white p-6 rounded-2xl border border-slate-200 card-hover flex justify-between items-center">
                    <div><h3 className="font-bold text-slate-900 text-sm">Product Approvals</h3><p className="text-xs text-slate-500 mt-1">{pendingApprovals} items waiting</p></div>
                    <span className="text-xl">→</span>
                </Link>
                <Link to="/admin-users" className="bg-white p-6 rounded-2xl border border-slate-200 card-hover flex justify-between items-center">
                    <div><h3 className="font-bold text-slate-900 text-sm">Student Management</h3><p className="text-xs text-slate-500 mt-1">{totalStudents} students registered</p></div>
                    <span className="text-xl">→</span>
                </Link>
                <Link to="/admin-reports" className="bg-white p-6 rounded-2xl border border-slate-200 card-hover flex justify-between items-center">
                    <div><h3 className="font-bold text-slate-900 text-sm">Reports Management</h3><p className="text-xs text-slate-500 mt-1">{openReports} open reports</p></div>
                    <span className="text-xl">→</span>
                </Link>
            </div>
        </div>
    );
}
