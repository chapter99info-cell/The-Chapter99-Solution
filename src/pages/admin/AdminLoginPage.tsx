import React from 'react';
import { useAdminAuth } from '../../contexts/AdminAuthContext';
import { useNavigate } from 'react-router-dom';

export default function AdminLoginPage() {
  const { adminLogin } = useAdminAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
      <div className="bg-white/5 border border-white/10 p-12 rounded-3xl w-full max-w-md backdrop-blur-xl">
        <h1 className="text-3xl font-black mb-8 italic tracking-tighter uppercase">Admin Portal</h1>
        <button 
          onClick={() => { adminLogin(); navigate('/admin/dashboard'); }}
          className="w-full py-4 bg-white text-slate-900 font-black rounded-xl hover:scale-105 transition-all"
        >
          BYPASS LOGIN
        </button>
      </div>
    </div>
  );
}
