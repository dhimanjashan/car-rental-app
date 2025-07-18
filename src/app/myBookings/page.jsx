// app/bookings/page.tsx

"use client";

import Image from "next/image";
import { FaCalendarAlt, FaMapMarkerAlt, FaCar } from "react-icons/fa";
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from "next/link";


const BookingsPage = () => {
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug");
  const email = searchParams.get("email");
  const [bookingcar, setBookingcar] = useState(null);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        let url = `/api/getBookingCar?slug=${slug}&email=${email}`;
        const response = await fetch(url);
        const data = await response.json();
        setBookingcar({ bookings: data.car?.bookings || [] });
      } catch (error) {
        console.error("Failed to fetch car details", error);
      }
    };
    fetchCar();
  }, [email]);
  return (
    <main className="min-h-screen text-white py-10 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12">🚗 My Car Bookings</h1>
        {bookingcar === null ? (
          <p className="text-center">Loading bookings...</p>
        ) : bookingcar.bookings.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center">
            <Image
              src="/no-booking.png"
              alt="No Bookings"
              width={400}
              height={400}
              className="mb-8 opacity-80 rounded-lg"
            />
            <Link href={"/allCars"}>
              <button className="bg-yellow-300 text-black px-6 py-3 mt-2 rounded-md font-semibold hover:bg-yellow-400 transition hover:cursor-pointer">
                Book Now
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2">
            {bookingcar.bookings.map((booking, idx) => (
              <div
                key={idx}
                className="relative bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl overflow-hidden shadow-xl hover:scale-[1.01] transition-all duration-300"
              >
                <Image
                  src={`/${booking.image}`}
                  alt="Car Image"
                  width={800}
                  height={400}
                  className="w-100 h-64 object-cover mx-auto"
                />
                <div className="p-6 space-y-4">
                  <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <FaCar className="text-yellow-400" /> {booking.name}
                  </h2>
                  <div className="text-gray-300 space-y-2 text-sm">
                    <p className="flex items-center gap-2">
                      <FaCalendarAlt className="text-blue-400" />
                      <span>
                        <span className="font-semibold">Pickup:</span> {booking.pickupdate}
                      </span>
                    </p>
                    <p className="flex items-center gap-2">
                      <FaCalendarAlt className="text-red-400" />
                      <span>
                        <span className="font-semibold">Drop:</span> {booking.dropoffdate}
                      </span>
                    </p>
                    <p className="flex items-center gap-2">
                      <FaMapMarkerAlt className="text-green-400" />
                      <span>
                        <span className="font-semibold">Location:</span> {booking.location}
                      </span>
                    </p>
                    <p className="text-xs text-gray-400 mt-4">
                      Booked on <span className="font-semibold">{booking.bookedOn}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
export default BookingsPage;