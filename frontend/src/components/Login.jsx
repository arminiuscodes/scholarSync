import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('/api/auth/login', formData);
      if (res.data.success) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        localStorage.setItem('loginSuccess', 'true');

        window.dispatchEvent(new Event('userLogin')); // 🔥 trigger navbar refresh

        toast.success('Login successful!', { position: 'top-center' });
        navigate('/');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed', { position: 'top-center' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center px-4 py-16">
      <ToastContainer />
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 transition-all duration-300">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-800">Welcome Back!</h2>
          <p className="text-gray-600 mt-1 text-sm">Login to your account</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block mb-1 text-gray-700 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 text-gray-800 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-700 font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 text-gray-800 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full ${loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} text-white font-semibold py-3 rounded-lg transition duration-200`}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Don’t have an account?{' '}
          <a href="/signup" className="text-blue-600 underline hover:text-blue-800">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
