import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">
      <div className="bg-white p-12 rounded-3xl w-full max-w-md">
        <h1 className="text-3xl font-black mb-8">LOGIN</h1>
        <button 
          onClick={() => { login(); navigate('/'); }}
          className="w-full py-4 bg-brand text-white font-black rounded-xl"
        >
          DEMO LOGIN
        </button>
      </div>
    </div>
  );
}
