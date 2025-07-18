'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import Sidebar from '../../components/sidebar';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L, { LatLngExpression } from 'leaflet';

// Fix icon issue
delete (L.Icon.Default as any).prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/leaflet/clipart38818.png',
  iconUrl: '/leaflet/location.png',
  shadowUrl: '/leaflet/clipart38818.png',
});

const VehicleNavigationPage = () => {
  // Example location (Delhi)
  const vehicleLocation: LatLngExpression = { lat: 30.1306, lng: 75.8014 };

  return (
    <div className="flex min-h-screen ">
      {/* Sidebar */}
      <aside className="w-64 bg-white text-black shadow-lg">
        <Sidebar />
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <h1 className="text-yellow-400 underline text-center text-3xl font-bold mb-8">
          GPS View
        </h1>

        {/* Map Container */}
        <div className="h-[70vh] w-full rounded-xl overflow-hidden shadow-lg border border-zinc-800">
          <MapContainer
            center={vehicleLocation}
            zoom={13}
            scrollWheelZoom={true}
            className="h-full w-full z-10"
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={vehicleLocation}>
              <Popup>
                🚘 Vehicle is here <br /> Lat: {vehicleLocation.lat} <br /> Lng: {vehicleLocation.lng}
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </main>
    </div>
  );
};

export default dynamic(() => Promise.resolve(VehicleNavigationPage), {
  ssr: false,
});
