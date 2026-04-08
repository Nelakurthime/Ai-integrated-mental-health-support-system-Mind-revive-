import React from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Onboarding from './components/Onboarding';
import MindPuzzle from './components/MindPuzzle';
import Dashboard from './components/Dashboard';
import Coaching from './components/Coaching';
import Login from './components/Login';
import Signup from './components/Signup';
import Community from './components/Community';
import AdminDashboard from './components/AdminDashboard';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { AppRoute } from './types';

// Placeholder components for routes not fully implemented in this demo
const Clinician = () => (
    <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-slate-800">Clinician Portal</h2>
        <p className="text-slate-500 mt-2">Secure messaging and data sharing with your therapist.</p>
    </div>
);

const RequireAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { isAuthenticated } = useAuth();
    const location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to={AppRoute.LOGIN} state={{ from: location }} replace />;
    }

    return <>{children}</>;
};

const RequireAdmin: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user } = useAuth();
    
    if (user?.role !== 'admin') {
        return <Navigate to={AppRoute.DASHBOARD} replace />;
    }
    return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <HashRouter>
        <Layout>
          <Routes>
            {/* Public Routes */}
            <Route path={AppRoute.LOGIN} element={<Login />} />
            <Route path={AppRoute.SIGNUP} element={<Signup />} />
            
            {/* Redirect root based on auth status */}
            <Route path={AppRoute.HOME} element={<Navigate to={AppRoute.LOGIN} replace />} />

            {/* Protected Routes */}
            <Route path={AppRoute.ONBOARDING} element={
                <RequireAuth>
                    <Onboarding />
                </RequireAuth>
            } />
            <Route path={AppRoute.PUZZLE} element={
                <RequireAuth>
                    <MindPuzzle />
                </RequireAuth>
            } />
            <Route path={AppRoute.DASHBOARD} element={
                <RequireAuth>
                    <Dashboard />
                </RequireAuth>
            } />
            <Route path={AppRoute.COACHING} element={
                <RequireAuth>
                    <Coaching />
                </RequireAuth>
            } />
            <Route path={AppRoute.COMMUNITY} element={
                <RequireAuth>
                    <Community />
                </RequireAuth>
            } />
            <Route path={AppRoute.CLINICIAN} element={
                <RequireAuth>
                    <Clinician />
                </RequireAuth>
            } />

            {/* Admin Route */}
             <Route path={AppRoute.ADMIN} element={
                <RequireAuth>
                    <RequireAdmin>
                        <AdminDashboard />
                    </RequireAdmin>
                </RequireAuth>
            } />

          </Routes>
        </Layout>
      </HashRouter>
    </AuthProvider>
  );
};

export default App;