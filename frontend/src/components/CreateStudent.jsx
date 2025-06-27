
import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const CreateStudent = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    enroll_no: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) return toast.error('Please login first.');

    if (!formData.name || !formData.email || !formData.enroll_no) {
      return toast.error('All fields are required!');
    }

    setLoading(true);
    try {
      const res = await axios.post('/api/students', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (res.data.success) {
        toast.success('🎉 Student created successfully!');
        setFormData({ name: '', email: '', enroll_no: '' });

        // Snappy redirect with immediate transition
        setTimeout(() => {
          navigate('/students', { replace: true });
        }, 300);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create student.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center px-4 py-8">
      <ToastContainer 
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        className="mt-16"
      />
      
      {/* Enhanced Card Container */}
      <div className="w-full max-w-md bg-white/15 backdrop-blur-xl shadow-2xl rounded-2xl p-8 border border-white/20 transform transition-all duration-300 hover:scale-105">
        
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Create New Student</h2>
          <p className="text-white/70 text-sm">Fill in the details to add a new student</p>
        </div>

        {/* Enhanced Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Full Name Field */}
          <div className="relative">
            <label className="block text-white/90 text-sm font-medium mb-2 ml-1">Full Name</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
              </div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter student's full name"
                className="w-full pl-10 pr-4 py-3 rounded-xl border-0 bg-white/20 backdrop-blur-sm text-white placeholder-white/50 focus:bg-white/30 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all duration-200 shadow-inner"
              />
            </div>
          </div>

          {/* Email Field */}
          <div className="relative">
            <label className="block text-white/90 text-sm font-medium mb-2 ml-1">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"></path>
                </svg>
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="student@example.com"
                className="w-full pl-10 pr-4 py-3 rounded-xl border-0 bg-white/20 backdrop-blur-sm text-white placeholder-white/50 focus:bg-white/30 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all duration-200 shadow-inner"
              />
            </div>
          </div>

          {/* Enrollment Number Field */}
          <div className="relative">
            <label className="block text-white/90 text-sm font-medium mb-2 ml-1">Enrollment Number</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"></path>
                </svg>
              </div>
              <input
                type="number"
                name="enroll_no"
                value={formData.enroll_no}
                onChange={handleChange}
                required
                placeholder="Enter enrollment number"
                className="w-full pl-10 pr-4 py-3 rounded-xl border-0 bg-white/20 backdrop-blur-sm text-white placeholder-white/50 focus:bg-white/30 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all duration-200 shadow-inner"
              />
            </div>
          </div>

          {/* Enhanced Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`
              w-full py-4 px-6 rounded-xl font-semibold text-white text-lg
              bg-gradient-to-r from-blue-600 to-purple-600 
              hover:from-blue-700 hover:to-purple-700 
              focus:from-blue-700 focus:to-purple-700
              disabled:from-gray-400 disabled:to-gray-500 
              disabled:cursor-not-allowed
              transform transition-all duration-200 
              hover:scale-105 hover:shadow-lg
              focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-transparent
              shadow-lg
              ${loading ? 'animate-pulse' : ''}
            `}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating Student...
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                Create Student
              </div>
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-white/60 text-xs">
            All fields are required to create a new student record
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreateStudent;