'use client';
import { useEffect, useState } from 'react';

const MobileVideo = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <video autoPlay muted loop playsInline className="absolute top-0 left-0 w-full h-full object-cover z-0">
      <source src={isMobile ? "/carvideo3.mp4" : "/carvideo4.mp4"} type="video/mp4" />
    </video>
  );
};

export default MobileVideo;
