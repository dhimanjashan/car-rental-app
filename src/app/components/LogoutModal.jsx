"use client";
import React from "react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { useUser } from '../context/UserContext';
import { toast } from 'react-hot-toast';

export default function LogoutModal({ show, onCancel, onConfirm }) {
  const { setIsLoggedIn } = useUser();
  if (!show) return null;

  const handleLogout = () => {
    toast.success('You’ve log out successfully.');
    localStorage.removeItem('myToken');
    setIsLoggedIn(false);
    onConfirm();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="bg-white/10 border border-white/30 rounded-2xl p-8 shadow-2xl backdrop-blur-lg w-[90%] max-w-md text-center text-white animate-fade-in-up">
        <div className="mb-4 flex justify-center">
          <ExclamationTriangleIcon className="h-12 w-12 text-yellow-300 animate-pulse" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Confirm Logout</h2>
        <p className="text-gray-200 mb-6">Are you sure you want to log out?</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={handleLogout}
            className="px-5 py-2 bg-yellow-300 hover:bg-yello400 rounded-full text-black font-medium hover:cursor-pointer"
          >
            Yes, Logout
          </button>
          <button
            onClick={onCancel}
            className="px-5 py-2 bg-white text-gray-800 hover:bg-gray-100 rounded-full font-medium hover:cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>

      <style jsx>{`
        .animate-fade-in-up {
          animation: fadeInUp 0.3s ease-out forwards;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
