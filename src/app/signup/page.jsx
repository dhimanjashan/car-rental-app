"use client";
import React, { useState } from 'react';
import { GiSteeringWheel } from 'react-icons/gi';
import Link from 'next/link';
import { toast } from 'react-hot-toast';

const SignupPage = () => {
    const [username, setUsername] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "email") setemail(value);
        if (name === "username") setUsername(value);
        if (name === "password") setpassword(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Frontend validation
        if (!username || !email || !password) {
            toast.error("Oops! Please complete the form first.", { theme: "colored" });
            return;
        }

        if (password.length < 6) {
            toast.error("Password must be at least 6 characters long.", { theme: "colored" });
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/api/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, email, password })
            });

            const data = await response.json();

            if (response.status === 200) {
                toast.success('Welcome! Your account is ready.', { theme: "colored" });
                setUsername("");
                setemail("");
                setpassword("");
            } else {
                toast.error(data.error || "Signup failed", { theme: "colored" });
            }
        } catch (err) {
            console.error(err);
            toast.error("Something went wrong. Please try again later.", { theme: "colored" });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="bg-gray-900 text-white rounded-3xl shadow-2xl max-w-xl w-full p-10 space-y-8">
                <div className="text-center">
                    <GiSteeringWheel className="text-yellow-400 text-6xl mx-auto mb-4" />
                    <h1 className="text-4xl font-extrabold text-white">Join RentRider</h1>
                    <p className="text-lg mt-2 text-gray-300">
                        Sign up and start your journey with comfort and style.
                    </p>
                </div>

                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-semibold mb-1">Full Name</label>
                        <input
                            type="text"
                            name="username"
                            placeholder="John Doe"
                            value={username}
                            className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="you@example.com"
                            value={email}
                            className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-1">Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="********"
                            value={password}
                            className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            onChange={handleChange}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-yellow-400 text-black font-semibold py-3 rounded-md hover:bg-yellow-300 transition hover:cursor-pointer"
                    >
                        Create Account
                    </button>
                </form>

                <div className="text-center text-sm text-gray-400">
                    Already have an account?{' '}
                    <Link href="/login">
                        <span className="text-yellow-400 hover:underline cursor-pointer">Login</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;
