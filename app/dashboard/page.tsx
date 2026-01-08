'use client';
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';

interface UserData {
  email: string;
  id: string;
  name: string;
}

export default function Dashboard() {
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // التحقق من وجود التوكن أولاً
    const token = localStorage.getItem('token');
    
    if (!token) {
      // إذا لم يكن هناك توكن، إعادة التوجيه إلى صفحة التسجيل
      router.push('/auth/login');
      return;
    }

    // محاولة قراءة بيانات المستخدم من localStorage
    try {
      // الطريقة الأولى: قراءة البيانات كـ object واحد
      const userDataStr = localStorage.getItem('user_data');
      
      if (userDataStr) {
        const parsedData: UserData = JSON.parse(userDataStr);
        setUserData(parsedData);
      } else {
        // الطريقة الثانية: قراءة البيانات الفردية
        const email = localStorage.getItem('email');
        const id = localStorage.getItem('user_id');
        const name = localStorage.getItem('name');
        
        if (email && id && name) {
          setUserData({ email, id, name });
        }
      }
    } catch (error) {
      console.error('Error reading user data from localStorage:', error);
    } finally {
      setLoading(false);
    }
  }, [router]);

  const handleLogout = () => {
    // مسح جميع بيانات المستخدم من localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('email');
    localStorage.removeItem('user_id');
    localStorage.removeItem('name');
    
    // إعادة التوجيه إلى صفحة التسجيل
    router.push('/auth/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">No User Data Found</h1>
          <p className="text-gray-600 mb-6">Please login first to access the dashboard</p>
          <button
            onClick={() => router.push('/auth/login')}
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">User Profile</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Full Name</label>
                <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-lg font-medium text-gray-800">{userData.name}</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Email Address</label>
                <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-lg font-medium text-gray-800">{userData.email}</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">User ID</label>
                <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-lg font-medium text-gray-800 font-mono">{userData.id}</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 flex flex-col justify-center items-center">
              <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-4">
                <span className="text-white text-3xl font-bold">
                  {userData.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-800">{userData.name}</h3>
              <p className="text-gray-600 mt-2">Welcome to your dashboard</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-semibold text-gray-700 mb-2">Account Status</h3>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span className="text-green-600 font-medium">Active</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-semibold text-gray-700 mb-2">Member Since</h3>
            <p className="text-gray-800">Today</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-semibold text-gray-700 mb-2">Token Status</h3>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
              <span className="text-blue-600 font-medium">Valid</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}