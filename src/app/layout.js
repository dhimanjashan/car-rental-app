import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Outfit } from 'next/font/google';
import ConditionalTopLoader from './components/ConditionalTopLoader';
import { CartProvider } from "./cartContext";
import { Providers } from "./providers";
import { Toaster } from "react-hot-toast";
import { UserProvider } from "./context/UserContext";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "RentRider",
  description: "RentRider is a platform where clients can easily find suitable car for trip or any other work.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${outfit.className} antialiased min-h-screen`}
      >  <UserProvider>
        <CartProvider>
        <ConditionalTopLoader 
        
        />
      
        <Providers>

        <Navbar />
        <Toaster position="bottom-center" />     
       
          {children}     
         
        </Providers>
        <Footer />
        </CartProvider>
        </UserProvider>
      </body>
    </html>
  );
}
