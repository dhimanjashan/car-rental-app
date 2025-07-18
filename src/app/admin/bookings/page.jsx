"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const CurrentBookingPage = () => {
  const [bookingcar, setBookingcar] = useState(null);
  console.log(bookingcar)
  const [userData, setUserData] = useState(null);
  const [token, setToken] = useState(null);
  const [carSlug, setCarSlug] = useState(null);
  const [selectedCar, setSelectedCar] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleManageClick = (car) => {
    console.log("Selected car:", car); // ← ADD THIS
    setSelectedCar(car);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCar(null);
  };
  // Load token and slug from localStorage
  useEffect(() => {
    setToken(localStorage.getItem("myToken"));
    setCarSlug(localStorage.getItem("carSlug"));
  }, []);

  // Fetch user data
  useEffect(() => {
    if (!token) return;

    fetch("/api/getUserOfBooking", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setUserData(data.user))
      .catch((err) => console.error("User fetch error:", err));
  }, [token]);


  const handleCancelBooking = async (slug) => {
    try {
      const res = await fetch(`/api/updateCarBooking?slug=${slug}`, {
        method: "PUT",
      });

      const data = await res.json();

      if (res.ok) {
        // Remove the cancelled booking from state
        setBookingcar((prev) => ({
          bookings: prev.bookings.filter((b) => b.slug !== slug),
        }));

        setShowModal(false); // close the modal
      } else {
        console.error("Delete failed:", data.error);
      }
    } catch (err) {
      console.error("Booking cancel error:", err);
    }
  };




  useEffect(() => {
    if (!userData || !carSlug) return;
    const fetchCar = async () => {
      try {
        let url = `/api/getBookingCar?slug=${carSlug}&email=${userData.email}`;
        const response = await fetch(url);
        const data = await response.json();
        setBookingcar({ bookings: data.car?.bookings || [] });
      } catch (error) {
        console.error("Failed to fetch car details", error);
      }
    };
    fetchCar();
  }, [userData, carSlug]);

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  return (
    <>
      <div className="flex min-h-screen">
      <aside className="w-64 bg-white text-black shadow-lg">
                <Sidebar />
            </aside>

        <main className="flex-1 p-10 space-y-8">
            <h1 className="text-3xl font-bold text-yellow-400 underline text-center">
              Current Booking
            </h1>

          {bookingcar?.bookings.length > 0 ? (
            bookingcar.bookings.map((car, idx) => (
              <section
                key={idx}
                className="bg-gray-800 p-6 rounded-xl shadow-md"
              >
                <div className="flex flex-col md:flex-row justify-between items-center border border-gray-600 rounded-lg p-4 gap-6">
                  {/* Car Info */}
                  <div className="flex items-center gap-6">
                    {/* You can uncomment this when you have a valid image */}
                    <Image src={`/${car.image}`} width={180} height={180} alt="Car" className="rounded-lg" />
                    <div>
                      <h3 className="text-lg font-bold">{car.name || "Unknown Car"}</h3>
                      <p className="text-gray-400">
                        {car.type || "Vehicle Type"} • {car.transmission || "Transmission"}
                      </p>
                      <p className="mt-2 text-sm text-gray-300">
                        {formatDate(car.pickupdate) || "Start Date"} –{" "}
                        {formatDate(car.dropoffdate) || "End Date"}
                      </p>
                    </div>
                  </div>

                  {/* Locations */}
                  <div className="flex gap-8 text-sm">
                    <div className="flex flex-col">
                      <span className="text-gray-400">Pickup Location</span>
                      <p>{car.location || "N/A"}</p>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-400">Dropoff Location</span>
                      <p>{car.location || "N/A"}</p>
                    </div>
                  </div>

                  {/* Manage Button */}
                  <div>
                    <button className="bg-yellow-400 text-black px-6 py-2 rounded-lg hover:bg-yellow-500 transition-all hover:cursor-pointer" onClick={() => handleManageClick(car)}>
                      Manage
                    </button>
                  </div>
                </div>
              </section>
            ))
          ) : (
            <p className="text-center text-gray-400 mt-10">
              No current bookings found.
            </p>
          )}
        </main>
      </div>
      <AnimatePresence>
        {showModal && selectedCar && (
          <motion.div
            className="fixed inset-0 backdrop-blur bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }} onClick={(e) => {
              if (e.target === e.currentTarget) handleCloseModal();
            }}
          >
            <motion.div
              className="bg-white text-black p-6 rounded-xl w-[90%] max-w-lg shadow-xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-xl font-bold mb-4">Manage Booking</h2>
              <p><strong>Car:</strong> {selectedCar.name}</p>
              <p><strong>Pickup:</strong> {selectedCar.pickupdate}</p>
              <p><strong>Dropoff:</strong> {selectedCar.dropoffdate}</p>
              <p><strong>Location:</strong> {selectedCar.location}</p>
              <p><strong>Price:</strong> ₹{selectedCar.price}/day</p>

              <div className="mt-6 flex justify-end gap-4">
                <button
                  className="px-4 py-2 bg-gray-200 rounded hover:cursor-pointer"
                  onClick={handleCloseModal}
                >
                  Close
                </button>
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 hover:cursor-pointer"
                  onClick={() => handleCancelBooking(selectedCar.slug)}
                >
                  Cancel Booking
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </>
  );
};

export default CurrentBookingPage;
