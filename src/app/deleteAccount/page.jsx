"use client";
import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { Eye, EyeOff, Loader2 } from 'lucide-react';

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
    const [step, setStep] = useState(1);
    const { setIsLoggedIn } = useUser();

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password) => {
        return password.length >= 6;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

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

    const handleSubmit = async () => {
        if (!validateForm()) return;

        setIsLoading(true);

        try {
            const response = await fetch('/api/verify-user', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
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
        } catch {
            setErrors({ general: 'Network error. Please try again.' });
        } finally {
            setIsLoading(false);
        }
    };

    const handleFinalDelete = async () => {
        if (confirmationInput.toLowerCase() !== 'delete my account') return;

        setIsLoading(true);

        try {
            const response = await fetch('/api/deleteUser', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    confirmation: confirmationInput
                })
            });

            if (response.ok) {
                setShowConfirmDialog(false);
                setStep(3);
                setShowSuccessDialog(true);
                localStorage.removeItem('myToken');
                setIsLoggedIn(false);
                setTimeout(() => {
                    window.location.href = '/login';
                }, 3000);
            } else {
                const errorData = await response.json();
                setErrors({ general: errorData.message || 'Failed to delete account' });
            }
        } catch {
            setErrors({ general: 'Network error. Please try again.' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-xl shadow-xl p-6 space-y-6">
                {step === 1 && (
                    <>
                        <h2 className="text-xl font-bold">Delete Account</h2>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full border rounded p-2"
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleInputChange}
                                className="w-full border rounded p-2 pr-10"
                            />
                            <span
                                className="absolute right-3 top-2.5 cursor-pointer text-gray-500"
                                onClick={() => setShowPassword(prev => !prev)}
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </span>
                        </div>
                        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                        {errors.general && <p className="text-red-500 text-sm">{errors.general}</p>}

                        <button
                            onClick={handleSubmit}
                            disabled={isLoading}
                            className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
                        >
                            {isLoading ? <Loader2 className="animate-spin mx-auto" /> : 'Continue'}
                        </button>
                    </>
                )}

                {showConfirmDialog && step === 2 && (
                    <>
                        <h2 className="text-lg font-semibold">Type "delete my account"</h2>
                        <input
                            type="text"
                            placeholder='Type here...'
                            value={confirmationInput}
                            onChange={(e) => setConfirmationInput(e.target.value)}
                            className="w-full border rounded p-2"
                        />
                        <button
                            onClick={handleFinalDelete}
                            disabled={isLoading}
                            className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
                        >
                            {isLoading ? <Loader2 className="animate-spin mx-auto" /> : 'Confirm Delete'}
                        </button>
                    </>
                )}

                {showSuccessDialog && step === 3 && (
                    <div className="text-center space-y-3">
                        <h2 className="text-green-600 text-xl font-bold">Account deleted successfully</h2>
                        <p>Redirecting to login...</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DeleteAccountPage;
