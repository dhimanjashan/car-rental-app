"use client";

import React, { useEffect, useState } from 'react';
import { steeringWheel } from '@lucide/lab';
import { Icon } from 'lucide-react';
import { Pacifico } from 'next/font/google';
import Link from 'next/link';
import Image from 'next/image';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useUser } from '../context/UserContext';

const pacifico = Pacifico({
  subsets: ['latin'],
  weight: '400',
});

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { setIsLoggedIn } = useUser();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.status === 200) {
        toast.success('You’ve logged in successfully.', {
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: 'colored',
        });

        localStorage.setItem("myToken", data.token);
        setIsLoggedIn(true);
        window.dispatchEvent(new CustomEvent("authChange", {
          detail: { login: true },
        }));

        setEmail("");
        setPassword("");
        router.push("/");
      }

      if (response.status === 400) {
        toast.error(data.error || "Invalid credentials", {
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: 'colored',
        });
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  useEffect(() => {
    window.scrollTo(0, 1);
  }, []);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="flex flex-col md:flex-row bg-white rounded-3xl shadow-2xl overflow-hidden max-w-5xl w-full mb-10 border-2 border-amber-300">
        <div className="w-full md:w-1/2 bg-gray-900 text-white p-10 space-y-8">
          <h2 className="text-3xl font-bold text-yellow-400">
            <span className='text-white'>Log into</span> RentRider
          </h2>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-semibold mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={handleChange}
                placeholder="********"
                className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-yellow-400 text-black font-semibold py-3 rounded-md hover:bg-yellow-300 transition hover:cursor-pointer"
            >
              Log in
            </button>

            <div className="text-sm text-gray-400 text-center">
              Forgot your password?{" "}
              <Link href="/resetPassword">
                <span className="text-yellow-300 hover:underline cursor-pointer">Reset here</span>
              </Link>
            </div>
          </form>

          <div className="text-center text-sm text-gray-400">
            Don’t have an account?{" "}
            <Link href="/signup">
              <span className="text-yellow-400 hover:underline cursor-pointer">Signup</span>
            </Link>
          </div>
        </div>

        <div className="w-full md:w-1/2 bg-yellow-400 text-white flex flex-col items-center justify-center p-8">
          <Icon iconNode={steeringWheel} className="text-black w-10 h-10 mb-4" />
          <h1 className={`${pacifico.className} text-white text-4xl mb-6`}>RentRider</h1>
          {!isMobile ? (
            <Image
              src="/boy.png"
              width={500}
              height={300}
              alt="Boy Illustration"
              className="object-contain drop-shadow-xl"
            />
          ) : (
            <Image
              src="/boy2.png"
              width={250}
              height={80}
              alt="Boy Illustration"
              className="object-contain drop-shadow-xl"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
