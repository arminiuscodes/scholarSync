import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const isEmpty = (value) => !value || value.trim() === '';

  const handleSignup = async (e) => {
    e.preventDefault();

    const { name, email, password } = formData;
    if (isEmpty(name) || isEmpty(email) || isEmpty(password)) {
      toast.warn('⚠️ Please fill in all the fields.', { position: 'top-center' });
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post('/api/auth/signup', formData);
      if (res.data.success) {
        toast.success('📨 OTP sent to your email!', { position: 'top-center' });
        setStep(2);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Signup failed!', { position: 'top-center' });
    } finally {
      setLoading(false);
    }
  };

  const handleOtpVerify = async (e) => {
    e.preventDefault();
    if (isEmpty(otp)) {
      toast.warn('⚠️ Please enter the OTP.', { position: 'top-center' });
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post('/api/auth/verify', {
        email: formData.email,
        otp,
      });
      if (res.data.success) {
        toast.success('✅ Signup complete and verified!', { position: 'top-center' });

        setTimeout(() => {
          window.location.href = '/login'; // refresh and redirect
        }, 1500);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'OTP verification failed!', { position: 'top-center' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gradient-to-r from-indigo-600 to-purple-600 px-4 overflow-x-hidden">
      <ToastContainer />
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">
          {step === 1 ? 'Create an Account' : 'Verify OTP'}
        </h2>

        {step === 1 ? (
          <form onSubmit={handleSignup} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              value={formData.name}
              className="w-full px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              value={formData.email}
              className="w-full px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              value={formData.password}
              className="w-full px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-xl transition"
            >
              {loading ? 'Sending OTP...' : 'Send OTP'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleOtpVerify} className="space-y-4">
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              className="w-full px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-xl transition"
            >
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>
            <p
              onClick={() => setStep(1)}
              className="text-sm text-center text-indigo-600 cursor-pointer hover:underline"
            >
              ← Go back to edit email
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default Signup;
