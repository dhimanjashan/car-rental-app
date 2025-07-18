'use client';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import Sidebar from '../../components/sidebar';

const VehiclePage = () => {
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
    <div className="flex min-h-screen">
      <aside className="w-64 bg-white text-black shadow-lg">
        <Sidebar />
      </aside>

      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <h1 className="text-yellow-400 underline text-4xl font-bold text-center mb-12 drop-shadow">
          Available Vehicles
        </h1>

        <div className="bg-zinc-800 border border-zinc-700 rounded-2xl max-w-4xl mx-auto px-6 py-8 shadow-xl mb-16">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <input
              type="text"
              name="carname"
              value={carName}
              onChange={(e) => setCarName(e.target.value)}
              placeholder="Search by car name..."
              className="w-full text-lg px-4 py-3 rounded-lg border border-zinc-600 bg-zinc-900 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <button
              onClick={() => setCarName('')}
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-3 rounded-lg transition w-full sm:w-auto"
            >
              Reset
            </button>
          </div>
        </div>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-7xl mx-auto">
          {filteredCars.length === 0 ? (
            <p className="text-center col-span-full text-gray-400 text-lg">
              No cars found. Try another name.
            </p>
          ) : (
            filteredCars.slice(0, visibleCount).map((car, i) => (
              <Link
                href={{ pathname: '/car', query: { slug: car.slug } }}
                key={i}
              >
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-zinc-900 rounded-2xl overflow-hidden shadow-xl hover:shadow-yellow-300/30 transition hover:-translate-y-1 cursor-pointer"
                >
                  <Image
                    src={`/${car.image}`}
                    alt={car.name}
                    width={400}
                    height={250}
                    className="w-full h-44 object-cover"
                  />
                  <div className="p-5 space-y-2">
                    <h3 className="text-white text-xl font-bold">
                      {car.name}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      {car.vehicle} • {car.transmission} • {car.fuelType}
                    </p>
                    <div className="flex justify-between items-center pt-2">
                      <span className="text-yellow-300 font-bold">
                        ₹{car.price}/day
                      </span>
                      <button className="bg-yellow-300 text-black px-4 py-1 rounded-md font-medium hover:bg-yellow-400">
                        View
                      </button>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))
          )}
        </div>

        {filteredCars.length > 8 && (
          <div className="flex justify-center mt-12">
            {visibleCount < filteredCars.length ? (
              <button
                onClick={handleLoadMore}
                className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-8 py-3 rounded-lg transition"
              >
                Load More
              </button>
            ) : (
              <button
                onClick={handleLess}
                className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-8 py-3 rounded-lg transition"
              >
                Show Less
              </button>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default VehiclePage;
