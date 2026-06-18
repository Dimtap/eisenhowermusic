import React, { useState } from 'react';
import axios from 'axios';
import { Lock, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const AdminLogin = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await axios.post(
        `${BACKEND_URL}/api/auth/admin-login`,
        { password },
        { withCredentials: true }
      );
      onLogin();
    } catch (err) {
      setError(err.response?.data?.detail || 'Invalid password. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center px-4">
      {/* Subtle grid */}
      <div
        className="fixed inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(#c8a227 1px, transparent 1px), linear-gradient(90deg, #c8a227 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative w-full max-w-sm">
        <div className="bg-white border-2 border-white p-8 shadow-[8px_8px_0px_#c8a227]">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-[#2d6a27] border-2 border-[#0A0A0A] flex items-center justify-center shadow-[2px_2px_0px_#c8a227]">
              <Lock size={18} className="text-white" />
            </div>
            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em] font-heading leading-none">
                Admin Panel
              </p>
              <p className="text-xs text-[#6B7280] font-body mt-0.5">
                Ike Instrumental Marching Band
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div
                data-testid="admin-login-error"
                className="bg-red-50 border-2 border-red-500 p-3 text-sm font-bold text-red-600 font-heading uppercase tracking-wider"
              >
                {error}
              </div>
            )}

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#0A0A0A] font-heading mb-1.5">
                Admin Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoFocus
                data-testid="admin-password-input"
                placeholder="Enter admin password"
                className="w-full border-2 border-[#0A0A0A] p-3 rounded-none focus:outline-none focus:border-[#2d6a27] shadow-[2px_2px_0px_#0A0A0A] text-sm font-body"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              data-testid="admin-login-button"
              className="w-full bg-[#2d6a27] text-white py-4 font-bold uppercase tracking-[0.12em] border-2 border-[#0A0A0A] shadow-[4px_4px_0px_#c8a227] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#c8a227] transition-all duration-200 font-heading text-sm disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-[#E5E7EB]">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs text-[#6B7280] hover:text-[#2d6a27] transition-colors font-body"
            >
              <ArrowLeft size={12} />
              Back to Website
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
