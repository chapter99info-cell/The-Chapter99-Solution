import React from 'react';

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-black italic tracking-tighter">OVERVIEW</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-8 bg-white rounded-3xl shadow-sm border border-slate-100">
          <div className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-2">Total Orders</div>
          <div className="text-4xl font-black italic">1,204</div>
        </div>
        <div className="p-8 bg-white rounded-3xl shadow-sm border border-slate-100">
          <div className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-2">Active Bookings</div>
          <div className="text-4xl font-black italic">42</div>
        </div>
        <div className="p-8 bg-white rounded-3xl shadow-sm border border-slate-100">
          <div className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-2">AI Generated Assets</div>
          <div className="text-4xl font-black italic">856</div>
        </div>
      </div>
    </div>
  );
}
