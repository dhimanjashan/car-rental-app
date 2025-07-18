'use client';
import { motion } from 'framer-motion';

const HeroHeading = () => {
  return (
    <motion.h1
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="text-4xl md:text-6xl font-bold text-yellow-400"
    >
      Rent Your Dream Ride in Minutes
    </motion.h1>
  );
};

export default HeroHeading;
