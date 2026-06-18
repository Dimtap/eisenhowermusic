import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminLogin from './AdminLogin';
import AdminPanel from './AdminPanel';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const AdminPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null=checking

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/auth/me`, { withCredentials: true })
      .then(() => setIsAuthenticated(true))
      .catch(() => setIsAuthenticated(false));
  }, []);

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <p className="text-white/50 text-sm font-body tracking-widest uppercase">Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AdminLogin onLogin={() => setIsAuthenticated(true)} />;
  }

  return <AdminPanel onLogout={() => setIsAuthenticated(false)} />;
};

export default AdminPage;
