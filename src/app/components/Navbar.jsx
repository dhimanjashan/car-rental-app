'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { steeringWheel } from '@lucide/lab';
import { Pacifico } from 'next/font/google';
import Link from 'next/link';
import { useCart } from '../cartContext';
import { Icon, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes'
import { toast } from 'react-hot-toast';
import Image from 'next/image';
import { usePathname } from "next/navigation";
import { useUser } from '../context/UserContext';



const pacifico = Pacifico({
  subsets: ['latin'],
  weight: '400',
});

export default function Navbar() {
  const { isLoggedIn } = useUser();
  const [menuOpen, setMenuOpen] = useState(false);
  const { setShowLogout } = useCart();
  const { setTheme, resolvedTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  console.log(pathname)

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);

    toast(`Switched to ${newTheme} mode`, {
      icon: newTheme === 'dark' ? '🌙' : '☀️',
      duration: 2000,
      style: {
        background: newTheme === 'dark' ? '#1f2937' : '#fef3c7', // Example: dark gray or light yellow
        color: newTheme === 'dark' ? '#f9fafb' : '#111827', // text color
      },
    });
  };

  useEffect(() => {
    setMounted(true);
  }, []);
  useEffect(() => {
    // Always safe to access window in useEffect
    const token = typeof window !== 'undefined' ? localStorage.getItem('myToken') : null;
    // isLoggedIn(!!token);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="bg-[#0b0f14] sticky top-0 z-999 shadow-yellow-500 shadow-sm">
      <div className="max-w-screen-xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-1">
          <Icon iconNode={steeringWheel} className="size-8 text-yellow-300" />

          <h1 className={`${pacifico.className} text-3xl text-white`}>RentRider</h1>
        </div>

        {/* Hamburger Icon */}
        <div className="text-white md:hidden" onClick={toggleMenu}>
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 items-center list-none">
          <Link href="/"><li className={`${pathname === "/" ? "text-yellow-400" : "text-white"} nav-link`}>Home</li></Link>
          <Link href="/allCars"><li className={`${pathname === "/allCars" ? "text-yellow-400" : "text-white"} nav-link`}>All Cars</li></Link>
          <Link href="/about"><li className={`${pathname === "/about" ? "text-yellow-400" : "text-white"} nav-link`}>About</li></Link>
          <Link href="/services"><li className={`${pathname === "/services" ? "text-yellow-400" : "text-white"} nav-link`}>Services</li></Link>
          <Link href="/contact"><li className={`${pathname === "/contact" ? "text-yellow-400" : "text-white"} nav-link`}>Contact</li></Link>
          {mounted && resolvedTheme === 'dark' && (
            <Sun
              className="size-8 text-yellow-300 hover:cursor-pointer hover:bg-white/30 rounded-2xl p-1"
              onClick={toggleTheme}
            />
          )}
          {mounted && resolvedTheme === 'light' && (
            <Moon
              className="size-8 text-yellow-300 hover:cursor-pointer hover:bg-white/30 rounded-2xl p-1"
              onClick={toggleTheme}
            />
          )}
          {!isLoggedIn  ? (
            <Link href="/login"><button className="btn-yellow hover:cursor-pointer">Login</button></Link>
          ) : (
            <button onClick={() => setShowLogout(true)} className="btn-yellow hover:cursor-pointer">Logout</button>
          )}

          {!isLoggedIn  ? (<Link href="/signup"> <span className="btn-yellow w-full inline-block text-center">Signup</span></Link>) : (<Link href="/admin"><Image
            src="/profile.png"
            width={40}
            height={40}
            alt="user avatar"
            className="hover:cursor-pointer"
          /></Link>)}
        </nav>
      </div>

      {/* Mobile Nav */}
      {menuOpen && (
        <nav className="md:hidden px-4 pb-4 ">
          <ul className="flex flex-col gap-3 text-white">
            <Link href="/" onClick={toggleMenu}><li className="nav-link-mobile">Home</li></Link>
            <Link href="/allCars" onClick={toggleMenu}><li className="nav-link-mobile">All Cars</li></Link>
            <Link href="/about" onClick={toggleMenu}><li className="nav-link-mobile">About</li></Link>
            <Link href="/services" onClick={toggleMenu}><li className="nav-link-mobile">Services</li></Link>
            <Link href="/contact" onClick={toggleMenu}><li className="nav-link-mobile">Contact</li></Link>
            <div className='mx-auto'>

              {mounted && resolvedTheme === 'dark' && (
                <Sun
                  className="size-8 text-yellow-300 hover:cursor-pointer hover:bg-white/30 rounded-2xl p-1"
                  onClick={() => { setTheme('light'); toggleMenu() }}
                />
              )}
              {mounted && resolvedTheme === 'light' && (
                <Moon
                  className="size-8 text-yellow-300 hover:cursor-pointer hover:bg-white/30 rounded-2xl p-1"
                  onClick={() => { setTheme('dark'); toggleMenu() }}
                />
              )}
            </div>
            {!isLoggedIn  ? (
              <Link href="/login" onClick={toggleMenu}>
                <button className="btn-yellow w-full">Login</button>
              </Link>
            ) : (
              <button
                onClick={() => {
                  setShowLogout(true);
                  toggleMenu();
                }}
                className="btn-yellow w-full"
              >
                Logout
              </button>
            )}
            {mounted && !isLoggedIn  ? (
              <Link href="/signup" onClick={toggleMenu}>
                <span className="btn-yellow w-full inline-block text-center">Signup</span>
              </Link>
            ) : mounted && login ? (
              <Image
                src="/user.png"
                width={40}
                height={40}
                alt="user avatar"
                className="hover:cursor-pointer rounded-full"
              />
            ) : null}
          </ul>
        </nav>
      )}
    </header>
  );
}
