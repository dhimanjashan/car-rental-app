'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const FinalCTA = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!isMobile) return null;

  return (
    <section className="bg-gradient-to-r from-gray-700 to-red-700 py-20 px-4">
      <div className="max-w-3xl mx-auto bg-black border-8 border-white/30 rounded-4xl overflow-hidden text-white text-center">
        <Image
          src="/carimage18.png"
          alt="Car Image Logo"
          width={500}
          height={80}
          className="w-full max-w-[2000px] mx-auto"
        />
        <div className="py-10 px-6">
          <h2 className="text-4xl md:text-6xl font-bold mb-4">Ready to Hit the Road?</h2>
          <p className="text-lg mb-4">Book your perfect ride in just a few clicks — safe, affordable, and fast.</p>
          <Link href="/allCars">
            <button className="mt-4 px-8 py-4 text-black text-xl font-bold rounded-full bg-yellow-300 hover:bg-yellow-400 transition duration-300 hover:cursor-pointer">
              🚗 Book Your Ride
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
