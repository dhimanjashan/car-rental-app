"use client"
import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import {
    Trash2,
    AlertTriangle,
    Eye,
    EyeOff,
    ArrowLeft,
    Shield,
    X,
    CheckCircle,
    XCircle,
    Loader2
} from 'lucide-react';

const DeleteAccountPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [showSuccessDialog, setShowSuccessDialog] = useState(false);
    const [confirmationInput, setConfirmationInput] = useState('');
    const [step, setStep] = useState(1); // 1: Form, 2: Confirmation, 3: Success
    const { setIsLoggedIn } = useUser();
    // Validation rules
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password) => {
        return password.length >= 6;
    };

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear specific error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    // Validate form
    const validateForm = () => {
        const newErrors = {};

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!validateEmail(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (!formData.password.trim()) {
            newErrors.password = 'Password is required';
        } else if (!validatePassword(formData.password)) {
            newErrors.password = 'Password must be at least 6 characters long';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle form submission
    const handleSubmit = async () => {

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);

        try {
            // Simulate API call to verify credentials
            const response = await fetch('/api/verify-user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password
                })
            });

            if (response.ok) {
                setStep(2);
                setShowConfirmDialog(true);
            } else {
                const errorData = await response.json();
                if (errorData.field === 'email') {
                    setErrors({ email: errorData.message });
                } else if (errorData.field === 'password') {
                    setErrors({ password: errorData.message });
                } else {
                    setErrors({ general: errorData.message || 'Invalid credentials' });
                }
            }
        } catch (error) {
            setErrors({ general: 'Network error. Please try again.' });
        } finally {
            setIsLoading(false);
        }
    };

    // Handle final account deletion
    const handleFinalDelete = async () => {
        if (confirmationInput.toLowerCase() !== 'delete my account') {
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch('/api/deleteUser', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password,
                    confirmation: confirmationInput
                })
            });

            if (response.ok) {
                setShowConfirmDialog(false);
                setStep(3);
                setShowSuccessDialog(true);
                localStorage.removeItem('myToken');
                setIsLoggedIn(false);

                // Redirect after 3 seconds
                setTimeout(() => {
                    window.location.href = '/login';
                }, 3000);
            } else {
                const errorData = await response.json();
                setErrors({ general: errorData.message || 'Failed to delete account' });
            }
        } catch (error) {
            setErrors({ general: 'Network error. Please try again.' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                        <Trash2 className="w-8 h-8 text-red-600" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Delete Account</h1>
                    <p className="text-gray-600">
                        This action cannot be undone. Please verify your credentials to continue.
                    </p>
                </div>

                {/* Warning Alert */}
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                    <div className="flex items-start">
                        <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 mr-3 flex-shrink-0" />
                        <div>
                            <h3 className="text-sm font-medium text-red-800 mb-1">
                                Warning: This action is irreversible
                            </h3>
                            <ul className="text-sm text-red-700 space-y-1">
                                <li>• All your account data will be permanently deleted</li>
                                <li>• Your booking history will be removed</li>
                                <li>• Any active rentals will be cancelled</li>
                                <li>• This action cannot be undone</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Main Form */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    {/* Back Button */}
                    <button
                        onClick={() => window.history.back()}
                        className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors hover:cursor-pointer"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Dashboard
                    </button>

                    {/* Form */}
                    <div className="space-y-6">
                        {/* General Error */}
                        {errors.general && (
                            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                                <div className="flex items-center">
                                    <XCircle className="w-5 h-5 text-red-600 mr-2" />
                                    <span className="text-sm text-red-800">{errors.general}</span>
                                </div>
                            </div>
                        )}

                        {/* Email Field */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className={`w-full text-gray-700 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${errors.email
                                    ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                                    : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                                    }`}
                                placeholder="Enter your email address"
                                disabled={isLoading}
                            />
                            {errors.email && (
                                <p className="mt-2 text-sm text-red-600 flex items-center">
                                    <XCircle className="w-4 h-4 mr-1" />
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        {/* Password Field */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className={`w-full text-black px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors pr-12 ${errors.password
                                        ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                                        : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                                        }`}
                                    placeholder="Enter your password"
                                    disabled={isLoading}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                    disabled={isLoading}
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="mt-2 text-sm text-red-600 flex items-center">
                                    <XCircle className="w-4 h-4 mr-1" />
                                    {errors.password}
                                </p>
                            )}
                        </div>

                        {/* Security Note */}
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                            <div className="flex items-start">
                                <Shield className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                                <div>
                                    <p className="text-sm text-blue-800">
                                        We need to verify your identity before proceeding with account deletion.
                                        Your credentials are encrypted and secure.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            onClick={handleSubmit}
                            disabled={isLoading}
                            className="w-full bg-red-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center hover:cursor-pointer"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                                    Verifying...
                                </>
                            ) : (
                                <>
                                    <Trash2 className="w-5 h-5 mr-2" />
                                    Verify & Continue
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Confirmation Dialog */}
            {showConfirmDialog && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl max-w-md w-full p-6">
                        <div className="text-center mb-6">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                                <AlertTriangle className="w-8 h-8 text-red-600" />
                            </div>
                            <h2 className="text-xl font-bold text-gray-900 mb-2">Final Confirmation</h2>
                            <p className="text-gray-600">
                                Are you absolutely sure you want to delete your account? This action cannot be undone.
                            </p>
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Type "DELETE MY ACCOUNT" to confirm:
                            </label>
                            <input
                                type="text"
                                value={confirmationInput}
                                onChange={(e) => setConfirmationInput(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-black"
                                placeholder="DELETE MY ACCOUNT"
                                disabled={isLoading}
                            />
                        </div>

                        <div className="flex space-x-4">
                            <button
                                onClick={() => {
                                    setShowConfirmDialog(false);
                                    setConfirmationInput('');
                                    setStep(1);
                                }}
                                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium text-black hover:cursor-pointer"
                                disabled={isLoading}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleFinalDelete}
                                disabled={isLoading || confirmationInput.toLowerCase() !== 'delete my account'}
                                className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center hover:cursor-pointer"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin mr-2" />
                                        Deleting...
                                    </>
                                ) : (
                                    'Delete Account'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Success Dialog */}
            {showSuccessDialog && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl max-w-md w-full p-6 text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                            <CheckCircle className="w-8 h-8 text-green-600" />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900 mb-2">Account Deleted</h2>
                        <p className="text-gray-600 mb-4">
                            Your account has been successfully deleted. You will be redirected to the login page shortly.
                        </p>
                        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                            <p className="text-sm text-green-800">
                                Redirecting in 3 seconds...
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DeleteAccountPage;