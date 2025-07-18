"use client";
import React, { useState, useEffect } from 'react';
import { Calendar, CarFront, LogOut, MapPin, Plus, Trash } from 'lucide-react';
import Sidebar from "../components/sidebar";
import Link from 'next/link';
import { useCart } from '../cartContext';
import { useRouter } from 'next/navigation';

const Dashboard = () => {
    const { setShowLogout } = useCart();
    const [countCurrentRentals, setCountCurrentRentals] = useState(null);
    const [currentRentals, setCurrentRentals] = useState(null);
    const [curRentData, setCurRentData] = useState(null);
    const [totalcount, setTotalCount] = useState(null);
    const [token, setToken] = useState(null);
    const [userData, setUserData] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const [car, setCar] = useState({});
    const [upcomingBookingcount, setUpcomingBookingcount] = useState(null);
    const router = useRouter();

    useEffect(() => {
        if (!userInfo?._id) return;
        const fetchData = async () => {
            try {
                const res = await fetch(`/api/currentRentals?userId=${userInfo._id}`);
                const data = await res.json();
                setCountCurrentRentals(data.countCurrentRentals);
                setTotalCount(data.totalRentals);
                setUpcomingBookingcount(data.pendingRentals);
                setCurrentRentals(data.currentRentals);
            } catch (err) { }
        };
        fetchData();
    }, [userInfo]);

    useEffect(() => {
        const storedToken = localStorage.getItem("myToken");
        setToken(storedToken);
    }, []);

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
            .catch(() => { });
    }, [token]);

    useEffect(() => {
        if (!token) return;
        fetch("/api/getUser", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => setUserInfo(data.user))
            .catch(() => { });
    }, [token]);

    const slugs = userData?.bookings.map(b => b.slug).join(",");
    useEffect(() => {
        const fetchCar = async () => {
            try {
                const response = await fetch(`/api/getcar?slug=${slugs}`);
                const data = await response.json();
                setCar(data.car || {});
            } catch (_) { }
        };
        fetchCar();
    }, [slugs]);

    useEffect(() => {
        if (!currentRentals || currentRentals.length === 0) return;
        const fetchAllCars = async () => {
            try {
                const cars = await Promise.all(
                    currentRentals.map(async (booking) => {
                        const res = await fetch(`/api/getCarById?carId=${booking.carId}`);
                        const data = await res.json();
                        return {
                            ...data.car,
                            carId: booking.carId,
                            pickupdate: booking.pickupDate,
                            dropoffdate: booking.returnDate
                        };
                    })
                );
                setCurRentData(cars);
            } catch (_) { }
        };
        fetchAllCars();
    }, [currentRentals]);

    const formatDate = (dateStr) =>
        new Date(dateStr).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });

    return (
        <div className="flex min-h-screen">
            <aside className="w-64 bg-white text-black shadow-lg">
                <Sidebar />
            </aside>

            <main className="flex-1 p-6">
                <header className="flex justify-center mb-12">
                    <h1 className="text-4xl font-bold text-yellow-500 underline">Dashboard</h1>
                </header>

                <section className="mb-10">
                    <h2 className="text-2xl font-semibold mb-4">
                        Hello, {userInfo?.username || "Loading..."}
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <StatCard
                            icon={<CarFront className="w-6 h-6 text-yellow-500" />}
                            label="Upcoming bookings"
                            value={typeof upcomingBookingcount === "number" ? upcomingBookingcount : 0}
                        />
                        <StatCard
                            icon={<Calendar className="w-6 h-6 text-yellow-500" />}
                            label="Current rentals"
                            value={typeof countCurrentRentals === "number" ? countCurrentRentals : 0}
                        />
                        <StatCard
                            icon={<CarFront className="w-6 h-6 text-yellow-500" />}
                            label="Total rentals"
                            value={typeof totalcount === "number" ? totalcount : 0}
                        />
                    </div>
                </section>

                <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                        <h3 className="text-xl font-semibold mb-3">Upcoming bookings</h3>
                        {userData?.bookings && userData.bookings.length > 0 ? (
                            <Card>
                                <BookingItem
                                    car={car.name}
                                    date={userData?.bookings.map(b => `${formatDate(b.pickupdate)} - ${formatDate(b.dropoffdate)}`).join(", ") || "Loading..."}
                                    user={userData?.username || "Loading..."}
                                    location={userData?.bookings.map(b => b.location).join(", ") || "Loading..."}
                                    userData={userData}
                                />
                            </Card>
                        ) : (
                            <EmptyState icon={<CarFront />} title="No Bookings Found" subtitle="You haven’t booked any cars yet." />
                        )}
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold mb-3">Quick actions</h3>
                        <div className="flex flex-col gap-3">
                            <Link href="/admin/vehicles">
                                <ActionButton icon={<Plus />} label="New Booking" />
                            </Link>
                            <ActionButton
                                icon={<LogOut />}
                                label="Log Out"
                                onClick={() => setShowLogout(true)}
                            />
                        </div>
                    </div>

                    <div className="lg:col-span-2">
                        <div className="flex justify-between items-center mb-3">
                            <h3 className="text-xl font-semibold">Active rentals</h3>
                        </div>

                        {countCurrentRentals !== 0 && curRentData && curRentData.length > 0 ? (
                            <Card>
                                {curRentData.map((rental, index) => (
                                    <BookingItem
                                        key={rental.rentalId || index}
                                        car={rental.name || "Loading..."}
                                        date={`${formatDate(rental.pickupdate)} - ${formatDate(rental.dropoffdate)}`}
                                        user={userData?.username || "Loading..."}
                                        location={userData?.bookings.map(b => b.location).join(", ") || "Loading..."}
                                        userData={userData}
                                    />
                                ))}
                            </Card>
                        ) : (
                            <EmptyState icon={<CarFront />} title="No Active Rentals" subtitle="You don't have any active rentals at the moment." />
                        )}
                    </div>

                    <DangerButton
                        icon={<Trash />}
                        label="Delete Account"
                        onClick={() => {
                            router.push("/deleteAccount")
                        }}
                    />
                </section>
            </main>
        </div>
    );
};

export default Dashboard;

const Card = ({ children }) => (
    <div className="bg-white text-black rounded-xl shadow p-4">{children}</div>
);

const StatCard = ({ icon, label, value }) => (
    <div className="bg-white text-black rounded-xl shadow p-4 flex items-center gap-4">
        {icon}
        <div>
            <div className="text-xl font-semibold">{value}</div>
            <div className="text-gray-500 text-sm">{label}</div>
        </div>
    </div>
);

const BookingItem = ({ car, date, user, location, userData }) => (
    userData?.bookings.length !== 0 ? (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
            <div>
                <h4 className="text-lg font-medium">{car}</h4>
                <p className="text-gray-600 text-sm">{date}</p>
            </div>
            <div className="flex items-center gap-4 mt-2 sm:mt-0">
                <div className="flex items-center gap-1 text-gray-600 text-sm">
                    <MapPin className="w-4 h-4" />
                    <span>{location}</span>
                </div>
                <div className="flex items-center gap-1 text-gray-600 text-sm">
                    <UserIcon />
                    <span>{user}</span>
                </div>
            </div>
        </div>
    ) : (
        <p>No car is booked</p>
    )
);

const ActionButton = ({ icon, label, onClick }) => (
    <button
        onClick={onClick}
        className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-yellow-100 text-yellow-800 hover:cursor-pointer font-medium rounded-lg hover:bg-yellow-200 transition duration-200"
    >
        {icon}
        <span>{label}</span>
    </button>
);

const DangerButton = ({ icon, label, onClick }) => (
    <button
        onClick={onClick}
        className="flex items-center justify-center gap-2 px-0 bg-red-100 text-red-700 font-medium rounded-lg hover:bg-red-200 transition duration-200 mt-10 hover:cursor-pointer"
    >
        {icon}
        <span>{label}</span>
    </button>
);

const UserIcon = () => (
    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A9 9 0 0112 15a9 9 0 016.879 2.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

const EmptyState = ({ icon, title, subtitle }) => (
    <div className="flex flex-col items-center justify-center h-40 border rounded-xl bg-gray-50 text-center shadow-sm p-4">
        <div className="mb-2 text-gray-400">{icon}</div>
        <h3 className="text-lg font-semibold text-gray-600">{title}</h3>
        <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
    </div>
);
