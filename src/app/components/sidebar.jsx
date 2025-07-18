"use client";
import { Pacifico } from 'next/font/google';
import { SteeringWheel } from 'lucide-react'; // ✅ use named import from 'lucide-react'
import Link from 'next/link';
import { usePathname } from "next/navigation";

const pacifico = Pacifico({
    subsets: ['latin'],
    weight: '400',
});

const Sidebar = () => {
    const pathname = usePathname();

    return (
        <div className="flex min-h-screen">
            <aside className="w-64 z-10 p-6 flex flex-col">
                <div className="text-2xl font-bold mb-10 flex items-center">
                    <SteeringWheel className="size-9 text-yellow-500" />
                    <h1 className={`text-3xl ml-2 ${pacifico.className}`}>RentRider</h1>
                </div>
                <nav className="space-y-4 text-lg flex flex-col">
                    <Link href="/admin" className={`${pathname === "/admin" ? "text-yellow-500" : "text-black"} hover:text-yellow-500`}>Dashboard</Link>
                    <Link href="/admin/vehicles" className={`${pathname === "/admin/vehicles" ? "text-yellow-500" : "text-black"} hover:text-yellow-500`}>Vehicles</Link>
                    <Link href="/admin/vehicleNavigation" className={`${pathname === "/admin/vehicleNavigation" ? "text-yellow-500" : "text-black"} hover:text-yellow-500`}>GPS View</Link>
                    <Link href="/admin/bookings" className={`${pathname === "/admin/bookings" ? "text-yellow-500" : "text-black"} hover:text-yellow-500`}>Bookings</Link>
                    <Link href="/admin/history" className={`${pathname === "/admin/history" ? "text-yellow-500" : "text-black"} hover:text-yellow-500`}>History</Link>
                    <Link href="/support" className={`${pathname === "/support" ? "text-yellow-500" : "text-black"} hover:text-yellow-500`}>Support</Link>
                </nav>
            </aside>
        </div>
    );
};

export default Sidebar;
