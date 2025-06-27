
import React, { useState, useEffect } from 'react';
import { UserPlus, Eye, Sparkles, TrendingUp, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Homepage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      const parsed = JSON.parse(user);
      setUsername(parsed.name);
      setIsLoggedIn(true);
    }
  }, []);

  const features = [
    {
      icon: UserPlus,
      title: 'Add Students',
      description: 'Easily register new students with comprehensive details and academic information.',
      color: 'from-violet-500 to-purple-600',
      bgColor: 'bg-violet-50',
      link: '/create',
      stats: '250+ added this month'
    },
    {
      icon: Eye,
      title: 'View All Students',
      description: 'Browse through your complete student database with advanced filtering options.',
      color: 'from-emerald-500 to-teal-600',
      bgColor: 'bg-emerald-50',
      link: '/students',
      stats: '1,200+ total records'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {isLoggedIn ? (
          <>
            {/* Welcome Header */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent mb-4">
                <Sparkles className="w-8 h-8 text-indigo-500" />
                <span className="text-lg font-semibold">Welcome back</span>
              </div>
              <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                Hello, <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">{username}</span> 👋
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Ready to manage your student database? Your dashboard is updated and ready to go.
              </p>
            </div>

            {/* Main Action Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div 
                    key={index}
                    className="group relative overflow-hidden bg-white rounded-2xl shadow-xl border-0 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer"
                    onClick={() => navigate(feature.link)}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                    <div className="p-8 relative">
                      <div className="flex items-start justify-between mb-6">
                        <div className={`p-4 ${feature.bgColor} rounded-2xl group-hover:scale-110 transition-transform duration-300`}>
                          <IconComponent className="w-8 h-8 text-indigo-600" />
                        </div>
                      </div>
                      
                      <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-indigo-700 transition-colors duration-300">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 text-base leading-relaxed mb-4">
                        {feature.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500 font-medium">{feature.stats}</span>
                        <a 
                          href={feature.link} 
                          className="inline-flex items-center px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors duration-300"
                        >
                          Explore
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Management Tips Section */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-2xl shadow-xl text-white overflow-hidden relative">
              <div className="absolute inset-0 bg-opacity-20"></div>
              <div className="p-8 relative">
                <div className="flex items-start gap-6">
                  <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-4">Manage Your Data Effectively</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                        <h4 className="font-semibold mb-2">Quick Updates</h4>
                        <p className="text-white/90 text-sm">Update or delete student records easily within the "View All Students" section.</p>
                      </div>
                      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                        <h4 className="font-semibold mb-2">Data Security</h4>
                        <p className="text-white/90 text-sm">Ensure you have the necessary permissions to make changes.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center mb-16">
            {/* Hero Section for Logged Out State */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-3xl"></div>
              <div className="relative px-8 py-16">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent mb-6">
                  <Sparkles className="w-8 h-8 text-indigo-500" />
                  <span className="text-lg font-semibold">Welcome to the future of education</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight">
                  Welcome to{' '}
                  <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    ScholarSync
                  </span>
                </h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
                  Your comprehensive student management solution. 
                  Streamline your educational administration with powerful tools designed to make student data management effortless and efficient.
                </p>
                
                {/* Trust Badge */}
                <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg mb-8">
                  <Users className="w-5 h-5 text-indigo-600" />
                  <span className="text-gray-700 font-medium">Trusted by 500+ educational institutions worldwide</span>
                </div>
                
                {/* CTA Button */}
                <a 
                  href="/login" 
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-4 rounded-2xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  Get Started
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
            
            {/* Feature Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <UserPlus className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Easy Registration</h3>
                <p className="text-gray-600 text-sm">Quick and intuitive student registration process</p>
              </div>
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <Eye className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Smart Analytics</h3>
                <p className="text-gray-600 text-sm">Comprehensive insights into your student data</p>
              </div>
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-purple-500 rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Growth Tracking</h3>
                <p className="text-gray-600 text-sm">Monitor progress and academic performance</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Homepage;