"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const ForgotPasswordPage = () => {
  const router = useRouter();

  const [isMobile, setIsMobile] = useState(false);
  const [step, setStep] = useState(1); // Step 1: Email, 2: OTP, 3: New Password
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  const handleSubmitEmail = async () => {
    console.log(email)
    try {
      const res = await fetch('/api/send-otp', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });
  
      let data;
      
      try {
        data = await res.json();
        console.log(data)
      } catch (err) {
        return toast.error("Unexpected response. Try again.");
      }
  
      if (res.ok) {
        toast.success("OTP sent to your email");
        setStep(2);
      } else {
        toast.error(data?.error || "Something went wrong.");
      }
  
    } catch (error) {
      toast.error("Network error. Try again later.");
    }
  };
  

  const handleVerifyOTP = async () => {
    if (!otp) return toast.error("Enter OTP");

    const res = await fetch('/api/verify-otp', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp })
    });

    const data = await res.json();

    if (res.ok) {
      toast.success("OTP Verified");
      setStep(3);
    } else {
      toast.error(data.error || "Invalid OTP");
    }
  };

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    const res = await fetch('/api/change-password', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, newPassword })
    });

    const data = await res.json();

    if (res.ok) {
      toast.success("Password updated");
      router.push('/login');
    } else {
      toast.error(data.error || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex p-4 items-center justify-center">
      <div className="w-full h-auto flex flex-col md:flex-row justify-center items-center relative mb-10 -mt-40 sm:-mt-10">
        <div className="bg-zinc-900 text-white flex flex-col w-full max-w-md p-7 rounded-2xl space-y-5">
          <h1 className="text-yellow-300 text-3xl text-center">FORGOT PASSWORD</h1>

          {step === 1 && (
            <>
              <p className="text-xl text-center">Enter your email to receive OTP.</p>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-600 focus:outline-none"
                placeholder="you@example.com"
              />
              <button
                className="bg-yellow-300 text-black py-3 rounded-2xl font-bold hover:bg-yellow-400 hover:cursor-pointer"
                onClick={handleSubmitEmail}
              >
                Send OTP
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <p className="text-xl text-center">Enter the OTP sent to your email.</p>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-600 focus:outline-none"
                placeholder="Enter OTP"
              />
              <button
                className="bg-yellow-300 text-black py-3 rounded-2xl font-bold hover:bg-yellow-400 hover:cursor-pointer"
                onClick={handleVerifyOTP}
              >
                Verify OTP
              </button>
            </>
          )}

          {step === 3 && (
            <>
              <p className="text-xl text-center">Enter your new password.</p>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-600 focus:outline-none"
                placeholder="New password"
              />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-600 focus:outline-none"
                placeholder="Confirm password"
              />
              <button
                className="bg-yellow-300 text-black py-3 rounded-2xl font-bold hover:bg-yellow-400 hover:cursor-pointer"
                onClick={handleResetPassword}
              >
                Reset Password
              </button>
            </>
          )}

          <Link href="/login" className="text-yellow-300 text-center hover:underline mt-4">
            Back to login
          </Link>
        </div>

        {/* Illustrations */}
        {!isMobile && (
          <div className="flex flex-col absolute md:static md:-ml-10 mt-10 md:mt-0 items-center">
            <Image src="/key.png" priority width={300} height={300} alt="Key" className="-mb-20" />
            <Image src="/worryBoy.png" width={300} height={300} alt="Worry" className="mb-20" />
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
