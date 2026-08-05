import React from 'react';
import { Link } from 'react-router-dom';

export function NotFound() {
    return (
        <div className="text-center py-24 space-y-4">
            <h1 className="text-4xl font-extrabold text-slate-900">404</h1>
            <p className="text-sm text-slate-600">Page not found or requested resource does not exist.</p>
            <Link to="/" className="inline-block bg-blue-600 text-white px-6 py-2.5 rounded-xl text-xs font-bold">Go to Home</Link>
        </div>
    );
}
