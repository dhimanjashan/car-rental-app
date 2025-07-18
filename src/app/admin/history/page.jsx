"use client";
import React, { useState, useEffect } from 'react';
import Sidebar from "../../components/sidebar";
import Image from 'next/image';
import { Calendar, Car, Filter, Search } from 'lucide-react';

const HistoryPage = () => {
  const [bookedcar, setBookedcar] = useState(null);
  const [userData, setUserData] = useState(null);
  const [token, setToken] = useState(null);
  const [carData, setCarData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    const storedToken = localStorage.getItem("myToken");
    setToken(storedToken);
  }, []);

  useEffect(() => {
    if (!token) return;
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/getUser", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setUserData(data.id);
      } catch (error) { }
    };
    fetchUserData();
  }, [token]);

  useEffect(() => {
    if (!userData) return;
    const fetchBookedCars = async () => {
      try {
        const response = await fetch(`/api/getRentalCars?userId=${userData}`);
        const data = await response.json();
        setBookedcar(data.car || []);
      } catch (error) { }
    };
    fetchBookedCars();
  }, [userData]);

  useEffect(() => {
    if (!bookedcar || bookedcar.length === 0) {
      setLoading(false);
      return;
    }
    const fetchAllCars = async () => {
      try {
        setLoading(true);
        const cars = await Promise.all(
          bookedcar.map(async (booking) => {
            const res = await fetch(`/api/getCarById?carId=${booking.carId}`);
            const data = await res.json();
            return {
              ...data.car,
              carId: booking.carId,
              pickupdate: booking.pickupDate,
              dropoffdate: booking.returnDate,
              rentalStatus: booking.rentalStatus || 'completed',
              bookingId: booking._id
            };
          })
        );
        setCarData(cars);
      } catch (error) { } finally {
        setLoading(false);
      }
    };
    fetchAllCars();
  }, [bookedcar]);

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'active':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredCars = carData?.filter(car => {
    const matchesSearch = car.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.vehicle?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || car.rentalStatus === filterStatus;
    return matchesSearch && matchesFilter;
  }) || [];

  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="bg-yellow-100 p-6 rounded-full mb-6">
        <Car className="w-16 h-16 text-yellow-600" />
      </div>
      <h3 className="text-2xl font-semibold text-gray-800 mb-2">No Rental History Found</h3>
      <p className="text-gray-600 mb-6 max-w-md">
        You haven't rented any cars yet. Start exploring our collection to book your first ride!
      </p>
      <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg font-medium transition-colors hover:cursor-pointer">
        Browse Cars
      </button>
    </div>
  );

  const LoadingState = () => (
    <div className="space-y-4">
      {[...Array(3)].map((_, idx) => (
        <div key={idx} className="bg-white rounded-xl p-6 animate-pulse">
          <div className="flex items-center gap-6">
            <div className="w-32 h-20 bg-gray-300 rounded-lg"></div>
            <div className="flex-1">
              <div className="h-6 bg-gray-300 rounded w-48 mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-32 mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-24"></div>
            </div>
            <div className="h-6 bg-gray-300 rounded w-20"></div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-white text-black shadow-lg">
        <Sidebar />
      </aside>

      <main className='flex-1 p-8'>
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-yellow-400 underline text-center">Rental History</h1>
          <p className="text-gray-500 text-center">View and manage your past car rentals</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by car name or type..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-gray-900"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="text-gray-400 w-5 h-5" />
              <select
                className="px-4 py-2 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="active">Active</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>

        {loading ? (
          <LoadingState />
        ) : !carData || carData.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm">
            <EmptyState />
          </div>
        ) : filteredCars.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No results found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredCars.map((car, idx) => (
              <div key={car.bookingId || idx} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6">
                <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
                  <div className="flex-shrink-0">
                    <Image
                      src={car.image ? `/${car.image}` : "/default-car.png"}
                      width={160}
                      height={100}
                      alt={car.name || "Car"}
                      className="rounded-lg object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl font-semibold text-gray-900 truncate">
                        {car.name || "Unknown Car"}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(car.rentalStatus)}`}>
                        {car.rentalStatus?.charAt(0).toUpperCase() + car.rentalStatus?.slice(1) || 'Completed'}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                      <span className="flex items-center gap-1">
                        <Car className="w-4 h-4" />
                        {car.transmission}
                      </span>
                      <span>•</span>
                      <span>{car.fuelType}</span>
                      <span>•</span>
                      <span>{car.vehicle}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(car.pickupdate)} – {formatDate(car.dropoffdate)}</span>
                    </div>
                  </div>

                  <div className="flex-shrink-0 text-right">
                    <div className="text-2xl font-bold text-gray-900">
                      ₹{car.price || "N/A"}
                    </div>
                    <div className="text-sm text-gray-500">per day</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {carData && carData.length > 0 && (
          <div className="mt-8 bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Summary</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">{carData.length}</div>
                <div className="text-sm text-gray-500">Total Rentals</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {carData.filter(car => car.rentalStatus === 'active').length}
                </div>
                <div className="text-sm text-gray-500">Active Rentals</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {carData.filter(car => car.rentalStatus === 'completed').length}
                </div>
                <div className="text-sm text-gray-500">Completed</div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default HistoryPage;
