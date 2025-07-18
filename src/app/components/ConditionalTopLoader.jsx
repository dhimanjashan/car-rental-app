'use client';

import { useEffect, useState } from 'react';
import NextTopLoader from 'nextjs-toploader';
export default function ConditionalTopLoader() {
  const [shouldRender, setShouldRender] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const isMobileDevice = window.innerWidth < 768;
    setIsMobile(isMobileDevice);
    setShouldRender(true);
  }, []);

  if (!shouldRender) return null;

  return (
    <NextTopLoader
      color="#fde047"
      initialPosition={0.08}
      crawlSpeed={200}
      height={3}
      crawl={true}
      showSpinner={!isMobile}
      easing="ease"
      speed={200}
      zIndex={1600}
      showAtBottom={false}
    />
  );
}
