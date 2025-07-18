'use client';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const AllCars = () => {
  const [availableCars, setAvailableCars] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8);
  const [carName, setCarName] = useState('');

  useEffect(() => {
    const fetchCars = async () => {
      const response = await fetch('/api/cars');
      const data = await response.json();
      setAvailableCars(data.Cars || []);
    };
    fetchCars();
  }, []);

  const filteredCars = availableCars.filter((car) =>
    car.name.toLowerCase().includes(carName.toLowerCase())
  );

  const handleLoadMore = () => setVisibleCount((prev) => prev + 8);
  const handleLess = () => {
    setVisibleCount(8);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen py-16 px-4 md:px-10">
      {/* Heading */}
      <h2 className="text-yellow-300 text-4xl md:text-5xl font-bold text-center mb-12 drop-shadow-lg">
        Find Your Perfect Ride
      </h2>

      {/* Filter */}
      <div className="bg-zinc-800 border border-zinc-700 rounded-2xl max-w-3xl mx-auto px-6 py-8 shadow-2xl mb-16">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <input
            type="text"
            name="carname"
            value={carName}
            onChange={(e) => setCarName(e.target.value)}
            placeholder="Search by car name..."
            className="w-full text-lg px-4 py-3 rounded-lg border border-zinc-600 bg-zinc-900 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
          />
          <button
            onClick={() => setCarName('')}
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-3 rounded-lg transition w-full sm:w-auto hover:cursor-pointer"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Cars */}
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-7xl mx-auto">
        {filteredCars.length === 0 ? (
          <p className="text-center col-span-full text-gray-400 text-lg">
            No cars found. Try another name.
          </p>
        ) : (
          filteredCars.slice(0, visibleCount).map((car, i) => (
            <Link href={{ pathname: '/car', query: { slug: car.slug } }} key={i}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-zinc-900 rounded-2xl overflow-hidden shadow-xl hover:shadow-yellow-300/30 transition hover:-translate-y-1"
              >
                <Image
                  src={`/${car.image}`}
                  alt={car.name}
                  width={400}
                  height={250}
                  className="w-full md:h-42 h-60 object-cover"
                />
                <div className="p-5 space-y-3">
                  <h3 className="text-white text-xl font-bold">{car.name}</h3>
                  <p className="text-gray-400 text-sm">
                    {car.vehicle} • {car.transmission} • {car.fuelType}
                  </p>
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-yellow-300 font-bold">₹{car.price}/day</span>
                    <button className="bg-yellow-300 text-black px-4 py-1 rounded-md font-medium hover:bg-yellow-400 hover:cursor-pointer">
                      View
                    </button>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))
        )}
      </div>

      {/* Load More */}
      {filteredCars.length > 8 && (
        <div className="flex justify-center mt-12">
          {visibleCount < filteredCars.length ? (
            <button
              onClick={handleLoadMore}
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-8 py-3 rounded-lg transition hover:cursor-pointer"
            >
              Load More
            </button>
          ) : (
            <button
              onClick={handleLess}
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-8 py-3 rounded-lg transition hover:cursor-pointer"
            >
              Show Less
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default AllCars;
