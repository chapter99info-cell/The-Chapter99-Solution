import React from 'react';

export default function AdminBookingsPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-black italic tracking-tighter">BOOKINGS MANAGEMENT</h1>
      <div className="bg-white rounded-3xl overflow-hidden border border-slate-100 italic">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="p-6">Client</th>
              <th className="p-6">Service</th>
              <th className="p-6">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-slate-50">
              <td className="p-6">John Doe</td>
              <td className="p-6">Traditional Thai Massage (60m)</td>
              <td className="p-6"><span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold uppercase">Confirmed</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
