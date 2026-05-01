import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AdminAuthContextType {
  admin: any;
  adminLogin: () => void;
  adminLogout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const AdminAuthProvider = ({ children }: { children: ReactNode }) => {
  const [admin, setAdmin] = useState(null);
  const adminLogin = () => setAdmin({ name: 'Admin' });
  const adminLogout = () => setAdmin(null);

  return (
    <AdminAuthContext.Provider value={{ admin, adminLogin, adminLogout }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) throw new Error('useAdminAuth must be used within AdminAuthProvider');
  return context;
};
