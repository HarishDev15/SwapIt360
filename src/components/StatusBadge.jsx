import React from 'react';

export function StatusBadge({ status, type }) {
    let classes = "px-2 py-0.5 rounded-full text-[10px] font-semibold ";
    if (type === 'tx') {
        if (status === 'Buy') classes += "bg-emerald-100 text-emerald-800";
        else if (status === 'Rent') classes += "bg-orange-100 text-orange-800";
        else if (status === 'Exchange') classes += "bg-purple-100 text-purple-800";
    } else if (type === 'approval') {
        if (status === 'Approved') classes += "bg-emerald-100 text-emerald-800";
        else if (status === 'Pending') classes += "bg-amber-100 text-amber-800";
        else if (status === 'Rejected') classes += "bg-red-100 text-red-800";
    } else if (type === 'general') {
        if (status === 'Available' || status === 'Active' || status === 'Resolved') classes += "bg-emerald-100 text-emerald-800";
        else if (status === 'Sold' || status === 'Inactive') classes += "bg-slate-100 text-slate-700";
        else classes += "bg-blue-100 text-blue-800";
    }
    return <span className={classes}>{status}</span>;
}
