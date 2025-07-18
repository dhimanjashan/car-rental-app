'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

const Page = () => {
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug");
  const [car, setCar] = useState({});

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await fetch(`/api/getcar?slug=${slug}`);
        const data = await response.json();
        setCar(data.car || {});
      } catch (error) { }
    };

    fetchCar();
  }, [slug]);

  return (
    <div className="min-h-screen py-10 px-4">
      <div className="max-w-6xl mx-auto space-y-12 animate-fade-in">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-b border-gray-600 pb-4">
          <h1 className="text-4xl font-bold text-yellow-400">{car.name || 'Loading...'}</h1>
          <h2 className="text-2xl font-semibold text-yellow-300">₹{car.price || '---'} / Day</h2>
        </div>

        <div className="flex justify-center">
          <Image
            src={`/${car.image || 'default-car.jpg'}`}
            alt={car.name || 'Car Image'}
            width={700}
            height={400}
            className="rounded-2xl object-cover"
          />
        </div>

        <div className="max-w-6xl mx-auto mt-8 px-4">
          <div className="grid grid-cols-1 md:grid-cols-0 lg:grid-cols-0 gap-6">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="flex items-center mb-4">
                <div className="w-2 h-8 bg-yellow-400 rounded-full mr-3"></div>
                <h3 className="text-xl font-bold text-yellow-400">Specifications</h3>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-gray-700 pb-2">
                  <span className="font-semibold text-white">Engine:</span>
                  <span className="text-gray-300 text-right">{car.vehicle || '---'}</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-700 pb-2">
                  <span className="font-semibold text-white">Transmission:</span>
                  <span className="text-gray-300 text-right">{car.transmission || '---'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-white">Fuel Type:</span>
                  <span className="text-gray-300 text-right">{car.fuelType || '---'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <Link href={{ pathname: "/bookcar", query: { slug: slug } }}>
            <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-10 py-3 rounded-full shadow-lg transition transform hover:scale-105 hover:cursor-pointer">
              Book Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Page;
