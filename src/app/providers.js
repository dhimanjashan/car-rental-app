"use client"
import { useState,useEffect } from "react";
import { ThemeProvider } from "next-themes";

export function Providers({ children }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
      setMounted(true);
    }, []);
  
    // Prevent mismatches during hydration
    if (!mounted) return null;
    return <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
    </ThemeProvider>
}