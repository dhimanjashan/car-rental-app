"use client"
import React, { useEffect, useState } from 'react';
import { SlCalender } from "react-icons/sl";
import { BsCurrencyDollar } from "react-icons/bs";
import { LuLaptopMinimalCheck } from "react-icons/lu";
import { FaCarAlt, FaHome } from "react-icons/fa";
import { MdGpsFixed } from "react-icons/md";
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const services = [
    {
        icon: <SlCalender className="text-6xl text-yellow-400" />,
        title: "Flexible Rental Options",
        description: "We provide both short-term and long-term rental solutions to fit your schedule and budget."
    },
    {
        icon: <BsCurrencyDollar className="text-6xl text-yellow-400" />,
        title: "Affordable Rates",
        description: "Enjoy competitive pricing and special deals to make your rental experience cost-effective and satisfying."
    },
    {
        icon: <LuLaptopMinimalCheck className="text-6xl text-yellow-400" />,
        title: "Easy Online Booking",
        description: "Book your rental car quickly and easily through our user-friendly platform."
    },
    {
        icon: <FaCarAlt className="text-6xl text-yellow-400" />,
        title: "Premium Vehicle Selection",
        description: "From sleek sedans to luxury SUVs, RentRider offers top-tier vehicles that combine comfort, style, and performance."
    },
    {
        icon: <FaHome className="text-6xl text-yellow-400" />,
        title: "Doorstep Delivery & Pickup",
        description: "Skip the rental desk—get your vehicle delivered and picked up from your location with ease."
    },
    {
        icon: <MdGpsFixed className="text-6xl text-yellow-400" />,
        title: "Real-Time Vehicle Tracking",
        description: "Monitor your rental vehicle in real time with built-in GPS tracking for safer and smarter travel."
    }
];

const page = () => {
    const router = useRouter();
    const [carName, setcarName] = useState("");
    const [carData, setcarData] = useState("");

    useEffect(() => {
        if (carData) {
            router.push(`/car?slug=${carData.searchCar.slug}`);
        }
    }, [carData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name == "carname") {
            setcarName(value);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        const fetchCar = async () => {
            try {
                const response = await fetch(`/api/searchCar?carname=${carName}`);
                const data = await response.json();
                setcarData(data);
            } catch (error) { }
        };

        fetchCar();
    };

    return (
        <div className="px-4 md:px-16 py-16">
            <h1 className="text-5xl md:text-6xl font-bold text-center text-yellow-300 mb-6">SERVICES</h1>
            <p className="text-center text-xl max-w-3xl mx-auto mb-16">
                At RentRider, we offer a variety of services to meet your car rental needs. Whether for a quick trip or a long-term arrangement, we’ve got you covered.
            </p>

            <div className="grid gap-10 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                {services.map((service, index) => (
                    <div key={index} className="bg-gray-800 text-white p-8 rounded-2xl shadow-lg flex items-start gap-6">
                        <div>{service.icon}</div>
                        <div>
                            <h2 className="text-2xl font-bold mb-2">{service.title}</h2>
                            <p className="text-lg">{service.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-24 text-center">
                <h2 className="text-4xl font-bold mb-4">Rent a Car with Ease</h2>
                <p className="text-xl mb-6">Choose your car from our flexible options.</p>
                <span className='text-3xl text-yellow-300'>
                    Search
                </span>
                <motion.img animate={{ y: [40, -15] }} transition={{
                    duration: 0.9,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut"
                }} src='/down-arrow.png' className=' mx-auto mt-5 filter invert sepia transition transform scale-3d text-white' width={100} height={100} alt='down arrow image'></motion.img>
            </div>

            <div className="bg-white text-black py-8 px-6 md:px-10 my-16 rounded-2xl shadow-md max-w-4xl mx-auto">
                <h2 className="text-xl md:text-2xl font-bold mb-6 text-center">Find Your Car</h2>

                <div className="flex flex-col md:flex-row items-stretch gap-4">
                    <div className="flex-1 relative">
                        <input
                            type="text"
                            name="carname"
                            value={carName}
                            placeholder="Search by car name (e.g. Swift)"
                            onChange={handleChange}
                            className="w-full py-3 px-5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
                        />
                    </div>

                    <div className="md:w-auto">
                        <button
                            onClick={handleSearch}
                            className="w-full h-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 px-6 rounded-lg transition hover:cursor-pointer"
                        >
                            Search
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default page;
