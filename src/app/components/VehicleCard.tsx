// app/vehicles/components/VehicleCard.tsx
"use client";

import React from 'react';
import Link from 'next/link';

interface VehicleCardProps {
  company: string;
  dateRange: string;
  id: string;
}

const VehicleCard: React.FC<VehicleCardProps> = ({ company, dateRange, id }) => {
  return (
    <div className="flex justify-between items-center border-2 border-gray-400 rounded-lg mb-4">
      <div className="m-6">
        <h1>{company}</h1>
        <div>{dateRange}</div>
      </div>
      <div>
        <Link href={`/vehicles/view/${id}`}>
          <button className="bg-yellow-300 text-black m-4 px-5 py-2 rounded-lg hover:cursor-pointer hover:bg-yellow-400">
            View
          </button>
        </Link>
      </div>
    </div>
  );
};

export default VehicleCard;
