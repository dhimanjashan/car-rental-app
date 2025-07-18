import Image from 'next/image';
import React from 'react';
import Link from 'next/link';

const AboutPage = () => {
  return (
    <div className="min-h-screen px-6 py-16 md:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-yellow-300 mb-6">
            About RentRider
          </h1>
          <p className="text-lg md:text-xl mb-4">
            Welcome to <strong>RentRider</strong>, your trusted car rental service. We are dedicated to providing you with a seamless and affordable rental experience.
          </p>
          <p className="text-lg md:text-xl mb-4">
            Our diverse fleet of vehicles caters to all your transportation needs, whether it's for business, leisure, or adventure.
          </p>
          <p className="text-lg md:text-xl mb-4">
            At RentRider, <span className="text-yellow-300 font-semibold">customer satisfaction</span> is our top priority. We ensure you reach your destination comfortably and safely.
          </p>
          <div className="mt-6 space-y-4">
            <h2 className="text-3xl font-bold text-yellow-200">Our Mission</h2>
            <p className="text-lg md:text-xl">
              To make car rentals accessible, reliable, and enjoyable for everyone, anytime, anywhere.
            </p>

            <h2 className="text-3xl font-bold text-yellow-200 mt-6">Why Choose Us?</h2>
            <ul className="list-disc list-inside text-lg md:text-xl">
              <li>Wide range of vehicles</li>
              <li>Affordable pricing</li>
              <li>Easy booking process</li>
              <li>24/7 customer support</li>
              <li>Trusted by thousands of happy customers</li>
            </ul>

            <Link href={"/allCars"}><button className="mt-6 px-6 py-3 bg-yellow-300 text-black font-bold text-lg rounded-lg hover:bg-yellow-400 transition duration-300 hover:cursor-pointer">
              Book Your Ride Now
            </button></Link>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex justify-center sm:mb-60">
          <Image
            src="/carimage9.png"
            width={500}
            height={400}
            alt="Car Image"
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
