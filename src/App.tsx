import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { AdminAuthProvider } from './contexts/AdminAuthContext';
import { Toaster } from './components/ui/sonner';
import ScrollToTop from './components/ScrollToTop';
import ProtectedRoute from './components/ProtectedRoute';
import AdminProtectedRoute from './components/AdminProtectedRoute';
import AdminLayout from './components/AdminLayout';
import JimmyAI from './components/JimmyAI';

// --- Chapter99 Solutions Main Pages ---
import LandingPage from './pages/LandingPage';
import PortfolioPage from './pages/PortfolioPage';
import PricingPage from './pages/PricingPage';
import ContactPage from './pages/ContactPage';

// --- Restaurant Solution Pages ---
import RestaurantDemoPage from './pages/solutions/RestaurantDemoPage';
import DigitalMenuPage from './pages/solutions/DigitalMenuPage';

// --- Massage Solution Pages ---
import MassageDemoPage from './pages/solutions/MassageDemoPage';
import AppointmentBookingPage from './pages/AppointmentBookingPage';

// --- Standard Pages ---
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

// --- Admin Pages ---
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminBookingsPage from './pages/admin/AdminBookingsPage';
import AdminServicesPage from './pages/admin/AdminServicesPage';
import AdminOrdersPage from './pages/admin/AdminOrdersPage';
import AdminContentAIPage from './pages/admin/AdminContentAIPage';

function App() {
  return (
    <AdminAuthProvider>
      <AuthProvider>
        <Router>
          <ScrollToTop />
          <Routes>
            {/* 🎯 MAIN SALES ROUTES */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/contact" element={<ContactPage />} />

            {/* 🍜 THAI RESTAURANT SOLUTIONS */}
            <Route path="/solutions/restaurant" element={<RestaurantDemoPage />} />
            <Route path="/solutions/digital-menu" element={<DigitalMenuPage />} />

            {/* 💆 THAI MASSAGE SOLUTIONS */}
            <Route path="/solutions/massage" element={<MassageDemoPage />} />
            <Route path="/appointments" element={<ProtectedRoute><AppointmentBookingPage /></ProtectedRoute>} />

            {/* AUTHENTICATION */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />

            {/* ⚙️ ADMIN SYSTEM */}
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route path="/admin/*" element={
              <AdminProtectedRoute>
                <AdminLayout>
                  <Routes>
                    <Route path="dashboard" element={<AdminDashboard />} />
                    <Route path="bookings" element={<AdminBookingsPage />} />
                    <Route path="menu-orders" element={<AdminOrdersPage />} />
                    <Route path="orders" element={<AdminOrdersPage />} />
                    <Route path="services" element={<AdminServicesPage />} />
                    <Route path="content-ai" element={<AdminContentAIPage />} />
                  </Routes>
                </AdminLayout>
              </AdminProtectedRoute>
            } />
          </Routes>
          <JimmyAI />
          <Toaster />
        </Router>
      </AuthProvider>
    </AdminAuthProvider>
  );
}

export default App;
