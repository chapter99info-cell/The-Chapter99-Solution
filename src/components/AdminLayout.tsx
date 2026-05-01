import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../contexts/AdminAuthContext';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { adminLogout } = useAdminAuth();
  const navigate = useNavigate();

  return (
    <div className="flex h-screen bg-slate-100">
      <aside className="w-64 bg-slate-900 text-white p-6 space-y-6">
        <div className="text-2xl font-black italic tracking-tighter">CHAPTER99 ADMIN</div>
        <nav className="space-y-4">
          <Link to="/admin/dashboard" className="block hover:text-brand-light">Dashboard</Link>
          <Link to="/admin/bookings" className="block hover:text-brand-light">Bookings</Link>
          <Link to="/admin/menu-orders" className="block hover:text-brand-light">Orders</Link>
          <Link to="/admin/services" className="block hover:text-brand-light">Services</Link>
          <Link to="/admin/content-ai" className="block hover:text-brand-light">AI Content</Link>
        </nav>
        <button 
          onClick={() => { adminLogout(); navigate('/admin/login'); }}
          className="mt-auto w-full py-2 bg-red-600 rounded-lg"
        >
          Logout
        </button>
      </aside>
      <main className="flex-1 overflow-auto p-10">
        {children}
      </main>
    </div>
  );
}
