import React, { useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { StatusBadge } from '../components/StatusBadge';

export function AdminUsersPage() {
    const { currentUser, users, setUsers, products, showToast, setConfirmModal } = useContext(AppContext);
    if (!currentUser || currentUser.role !== 'admin') return <Navigate to="/login" />;

    const studentUsers = users.filter(u => u.role === 'student');

    const toggleStatus = (id, currentStatus) => {
        const nextStatus = currentStatus === 'Active' ? 'Inactive' : 'Active';
        setConfirmModal({
            title: `${nextStatus === 'Active' ? 'Activate' : 'Deactivate'} Student`,
            message: `Are you sure you want to change student status to ${nextStatus}?`,
            onConfirm: () => {
                const updated = users.map(u => u.id === id ? { ...u, status: nextStatus } : u);
                setUsers(updated);
                showToast(`Student status changed to ${nextStatus}.`);
            }
        });
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
            <div>
                <h1 className="text-2xl font-extrabold text-slate-900">Student Management</h1>
                <p className="text-xs text-slate-500 mt-1">{studentUsers.length} registered students</p>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="divide-y divide-slate-100">
                    {studentUsers.map(u => {
                        const count = products.filter(p => p.sellerId === u.id).length;
                        return (
                            <div key={u.id} className="p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                <div className="space-y-1">
                                    <div className="flex items-center space-x-2">
                                        <h4 className="font-bold text-slate-900 text-sm">{u.fullName}</h4>
                                        <StatusBadge status={u.status} type="general" />
                                    </div>
                                    <p className="text-xs text-slate-500">{u.email} • Roll: {u.rollNumber} • {u.department}</p>
                                    <span className="text-[10px] text-slate-400">{count} listings • Joined {u.joinedAt}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Link to={`/seller/${u.id}`} className="px-3 py-1.5 bg-slate-100 rounded-xl text-xs font-bold">Profile</Link>
                                    <button onClick={() => toggleStatus(u.id, u.status)} className={`px-3 py-1.5 rounded-xl text-xs font-bold ${u.status === 'Active' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'}`}>
                                        {u.status === 'Active' ? 'Deactivate' : 'Activate'}
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
