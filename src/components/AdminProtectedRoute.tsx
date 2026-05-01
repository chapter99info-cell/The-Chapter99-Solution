import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAdminAuth } from '../contexts/AdminAuthContext';

export default function AdminProtectedRoute({ children }: { children: React.ReactNode }) {
  const { admin } = useAdminAuth();
  if (!admin) return <Navigate to="/admin/login" replace />;
  return <>{children}</>;
}
