
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { Trash2, Edit3, Save, Users, Search, Plus, X } from 'lucide-react';
import 'react-toastify/dist/ReactToastify.css';

const ViewStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({ name: '', email: '', enroll_no: '' });

  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await axios.get('/api/students', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (res.data.success) {
        setStudents(res.data.data);
      }
    } catch (error) {
      toast.error('Failed to fetch students.');
    } finally {
      setLoading(false);
    }
  };

  const deleteStudent = async (id) => {
    try {
      const res = await axios.delete(`/api/students/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (res.data.success) {
        toast.success('Student deleted!');
        setStudents(prev => prev.filter(student => student._id !== id));
      }
    } catch (error) {
      toast.error('Delete failed.');
    }
  };

  const startEdit = (student) => {
    setEditId(student._id);
    setEditData({
      name: student.name,
      email: student.email,
      enroll_no: student.enroll_no
    });
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditData({ name: '', email: '', enroll_no: '' });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
  };

  const saveEdit = async (id) => {
    try {
      const res = await axios.put(`/api/students/${id}`, editData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      if (res.data.success) {
        toast.success('Updated successfully!');
        setEditId(null);
        setEditData({ name: '', email: '', enroll_no: '' });
        fetchStudents(); // refresh list
      }
    } catch (error) {
      toast.error('Update failed.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        className="mt-4 text-sm"
      />
      
      <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
        {/* Mobile-Optimized Header Section */}
        <div className="text-center mb-6 sm:mb-8 lg:mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full mb-4 sm:mb-6 shadow-lg">
            <Users className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-3 sm:mb-4 tracking-tight">
            Student Management
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed px-4">
            Manage your student database with ease. View, edit, and organize student information seamlessly.
          </p>
          <p className="text-sm sm:text-base lg:text-lg text-indigo-600 mt-2 px-4">
            Experience intuitive CRUD operations designed for both desktop and mobile users.
          </p>
        </div>

        {/* Mobile-Optimized Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
          <div className="bg-white rounded-2xl p-4 sm:p-6 border border-gray-200 shadow-lg">
            <div className="flex items-center">
              <div className="bg-blue-100 p-2 sm:p-3 rounded-full">
                <Users className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
              </div>
              <div className="ml-3 sm:ml-4">
                <p className="text-gray-600 text-xs sm:text-sm">Total Students</p>
                <p className="text-gray-800 text-xl sm:text-2xl font-bold">{students.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-4 sm:p-6 border border-gray-200 shadow-lg">
            <div className="flex items-center">
              <div className="bg-green-100 p-2 sm:p-3 rounded-full">
                <Edit3 className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
              </div>
              <div className="ml-3 sm:ml-4">
                <p className="text-gray-600 text-xs sm:text-sm">Active Edits</p>
                <p className="text-gray-800 text-xl sm:text-2xl font-bold">{editId ? 1 : 0}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-4 sm:p-6 border border-gray-200 shadow-lg sm:col-span-2 lg:col-span-1">
            <div className="flex items-center">
              <div className="bg-purple-100 p-2 sm:p-3 rounded-full">
                <Search className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
              </div>
              <div className="ml-3 sm:ml-4">
                <p className="text-gray-600 text-xs sm:text-sm">Database Status</p>
                <p className="text-gray-800 text-xl sm:text-2xl font-bold">{loading ? 'Loading...' : 'Active'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content - Mobile Optimized */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="p-4 sm:p-6 lg:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 gap-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 flex items-center gap-2 sm:gap-3">
                <Users className="w-6 h-6 sm:w-8 sm:h-8 text-indigo-600" />
                Student Directory
              </h2>
              <div className="text-xs sm:text-sm text-gray-600 bg-gray-100 px-3 sm:px-4 py-2 rounded-full text-center">
                {students.length} Records Found
              </div>
            </div>

            {loading ? (
              <div className="text-center py-12 sm:py-16">
                <div className="inline-block animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-indigo-600"></div>
                <p className="text-gray-600 mt-4 text-base sm:text-lg">Loading student data...</p>
              </div>
            ) : students.length === 0 ? (
              <div className="text-center py-12 sm:py-16">
                <div className="bg-gray-100 w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" />
                </div>
                <p className="text-gray-600 text-lg sm:text-xl mb-2">No students found</p>
                <p className="text-gray-500 text-sm sm:text-base">Start by adding your first student record</p>
              </div>
            ) : (
              <>
                {/* Mobile Card Layout */}
                <div className="block lg:hidden space-y-4">
                  {students.map((student, index) => (
                    <div key={student._id} className="bg-gray-50 rounded-2xl p-4 border border-gray-200 shadow-sm">
                      {editId === student._id ? (
                        <div className="space-y-4">
                          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4 border border-indigo-200">
                            <h3 className="text-gray-800 font-semibold mb-4 flex items-center gap-2">
                              <Edit3 className="w-4 h-4" />
                              Editing Student
                            </h3>
                            <div className="space-y-3">
                              <div>
                                <label className="block text-gray-700 text-sm font-medium mb-1">Full Name</label>
                                <input
                                  type="text"
                                  name="name"
                                  value={editData.name}
                                  onChange={handleEditChange}
                                  className="w-full px-4 py-3 rounded-xl bg-white text-gray-800 placeholder-gray-400 border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition-all text-base"
                                  placeholder="Enter full name"
                                />
                              </div>
                              <div>
                                <label className="block text-gray-700 text-sm font-medium mb-1">Email Address</label>
                                <input
                                  type="email"
                                  name="email"
                                  value={editData.email}
                                  onChange={handleEditChange}
                                  className="w-full px-4 py-3 rounded-xl bg-white text-gray-800 placeholder-gray-400 border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition-all text-base"
                                  placeholder="Enter email address"
                                />
                              </div>
                              <div>
                                <label className="block text-gray-700 text-sm font-medium mb-1">Enrollment Number</label>
                                <input
                                  type="number"
                                  name="enroll_no"
                                  value={editData.enroll_no}
                                  onChange={handleEditChange}
                                  className="w-full px-4 py-3 rounded-xl bg-white text-gray-800 placeholder-gray-400 border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition-all text-base"
                                  placeholder="Enter enrollment number"
                                />
                              </div>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-3 mt-4">
                              <button
                                onClick={() => saveEdit(student._id)}
                                className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl font-semibold transition-all transform active:scale-95 shadow-lg text-base"
                              >
                                <Save className="w-4 h-4" />
                                Save Changes
                              </button>
                              <button
                                onClick={cancelEdit}
                                className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-xl font-semibold transition-all active:scale-95 text-base"
                              >
                                <X className="w-4 h-4" />
                                Cancel
                              </button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="flex items-start gap-4 mb-4">
                            <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                              {student.name.charAt(0).toUpperCase()}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="text-gray-800 font-semibold text-lg truncate">{student.name}</h3>
                              <p className="text-gray-500 text-sm">Student #{index + 1}</p>
                            </div>
                          </div>
                          
                          <div className="space-y-2 mb-4">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-1">
                              <span className="text-gray-600 text-sm font-medium min-w-0">Email:</span>
                              <span className="text-gray-700 text-sm break-all">{student.email}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-gray-600 text-sm font-medium">Enrollment:</span>
                              <div className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full text-sm font-medium">
                                #{student.enroll_no}
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex flex-col sm:flex-row gap-3">
                            <button
                              onClick={() => startEdit(student)}
                              className="flex items-center justify-center gap-2 px-4 py-3 bg-amber-100 hover:bg-amber-200 text-amber-700 rounded-lg text-sm font-medium transition-all hover:scale-105 border border-amber-200"
                            >
                              <Edit3 className="w-4 h-4" />
                              Edit Student
                            </button>
                            <button
                              onClick={() => deleteStudent(student._id)}
                              className="flex items-center justify-center gap-2 px-4 py-3 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg text-sm font-medium transition-all hover:scale-105 border border-red-200"
                            >
                              <Trash2 className="w-4 h-4" />
                              Delete Student
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>

                {/* Desktop Table Layout */}
                <div className="hidden lg:block overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-4 px-6 text-gray-700 font-semibold">Student Details</th>
                        <th className="text-left py-4 px-6 text-gray-700 font-semibold">Contact Info</th>
                        <th className="text-left py-4 px-6 text-gray-700 font-semibold">Enrollment</th>
                        <th className="text-right py-4 px-6 text-gray-700 font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {students.map((student, index) => (
                        <tr key={student._id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors group">
                          {editId === student._id ? (
                            <td colSpan="4" className="p-6">
                              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-200">
                                <h3 className="text-gray-800 font-semibold mb-4 flex items-center gap-2">
                                  <Edit3 className="w-5 h-5" />
                                  Editing Student Record
                                </h3>
                                <div className="grid md:grid-cols-3 gap-4">
                                  <div>
                                    <label className="block text-gray-700 text-sm font-medium mb-2">Full Name</label>
                                    <input
                                      type="text"
                                      name="name"
                                      value={editData.name}
                                      onChange={handleEditChange}
                                      className="w-full px-4 py-3 rounded-xl bg-white text-gray-800 placeholder-gray-400 border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition-all"
                                      placeholder="Enter full name"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-gray-700 text-sm font-medium mb-2">Email Address</label>
                                    <input
                                      type="email"
                                      name="email"
                                      value={editData.email}
                                      onChange={handleEditChange}
                                      className="w-full px-4 py-3 rounded-xl bg-white text-gray-800 placeholder-gray-400 border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition-all"
                                      placeholder="Enter email address"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-gray-700 text-sm font-medium mb-2">Enrollment Number</label>
                                    <input
                                      type="number"
                                      name="enroll_no"
                                      value={editData.enroll_no}
                                      onChange={handleEditChange}
                                      className="w-full px-4 py-3 rounded-xl bg-white text-gray-800 placeholder-gray-400 border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition-all"
                                      placeholder="Enter enrollment number"
                                    />
                                  </div>
                                </div>
                                <div className="flex gap-3 mt-6">
                                  <button
                                    onClick={() => saveEdit(student._id)}
                                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl font-semibold transition-all transform hover:scale-105 shadow-lg"
                                  >
                                    <Save className="w-4 h-4" />
                                    Save Changes
                                  </button>
                                  <button
                                    onClick={cancelEdit}
                                    className="flex items-center gap-2 px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-xl font-semibold transition-all"
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            </td>
                          ) : (
                            <>
                              <td className="py-6 px-6">
                                <div className="flex items-center gap-4">
                                  <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                                    {student.name.charAt(0).toUpperCase()}
                                  </div>
                                  <div>
                                    <h3 className="text-gray-800 font-semibold text-lg">{student.name}</h3>
                                    <p className="text-gray-500 text-sm">Student #{index + 1}</p>
                                  </div>
                                </div>
                              </td>
                              <td className="py-6 px-6">
                                <p className="text-gray-700">{student.email}</p>
                                <p className="text-gray-500 text-sm">Primary Contact</p>
                              </td>
                              <td className="py-6 px-6">
                                <div className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium inline-block">
                                  #{student.enroll_no}
                                </div>
                              </td>
                              <td className="py-6 px-6">
                                <div className="flex gap-2 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                                  <button
                                    onClick={() => startEdit(student)}
                                    className="flex items-center gap-1 px-4 py-2 bg-amber-100 hover:bg-amber-200 text-amber-700 rounded-lg text-sm font-medium transition-all hover:scale-105 border border-amber-200"
                                    title="Edit student"
                                  >
                                    <Edit3 className="w-4 h-4" />
                                    Edit
                                  </button>
                                  <button
                                    onClick={() => deleteStudent(student._id)}
                                    className="flex items-center gap-1 px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg text-sm font-medium transition-all hover:scale-105 border border-red-200"
                                    title="Delete student"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                    Delete
                                  </button>
                                </div>
                              </td>
                            </>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewStudents;