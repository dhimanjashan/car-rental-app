import React from 'react';
import { Pacifico } from 'next/font/google';
import { steeringWheel } from '@lucide/lab';
import { Icon } from 'lucide-react';
import Link from 'next/link';

const pacifico = Pacifico({
  subsets: ['latin'],
  weight: '400',
});

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-700 text-white">
      <div className="max-w-screen-xl mx-auto px-6 py-14">
        <div className="flex items-center mb-10">
          <Icon iconNode={steeringWheel} className="size-16 text-yellow-300" />
          <h1 className={`text-5xl ml-4 ${pacifico.className} text-white`}>RentRider</h1>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-10">
          <div>
            <h2 className="font-bold text-xl mb-3">About</h2>
            <ul className="space-y-1">
              <li><Link href="/about">Who We Are</Link></li>
              <li><Link href="/allCars">Our Pricing</Link></li>
              <li><Link href="/faq">FAQs</Link></li>
            </ul>
          </div>

          <div>
            <h2 className="font-bold text-xl mb-3">Services</h2>
            <ul className="space-y-1">
              <li><Link href="/allCars">Explore Our Fleet</Link></li>
              <li><Link href="/how-it-works">How RentRider Works</Link></li>
              <li><Link href="/">Customer Stories</Link></li>
            </ul>
          </div>

          <div>
            <h2 className="font-bold text-xl mb-3">Connect</h2>
            <ul className="space-y-1">
              <li><Link href="/contact">Get in Touch</Link></li>
              <li><a href="mailto:support@rentrider.com">Email Support</a></li>
              <li><a href="https://twitter.com/rentrider" target="_blank" rel="noopener noreferrer">Follow on Twitter</a></li>
            </ul>
          </div>

          <div>
            <h2 className="font-bold text-xl mb-3">Support</h2>
            <ul className="space-y-1">
              <li><Link href="/contact">Help Center</Link></li>
              <li><Link href="/terms">Terms & Conditions</Link></li>
            </ul>
          </div>
        </div>

        <p className="text-center text-lg text-gray-300">
          &copy; 2025 RentRider. Made with ❤️ & 🧠. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
