"use client";

import React, {
    createContext,
    useContext,
    useState,
} from "react";
import LogoutModal from "./components/LogoutModal";
import { useRouter } from "next/navigation";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const router = useRouter();
    const [showLogout, setShowLogout] = useState(false);
    const handleLogout = () => {
        localStorage.removeItem("myToken");
        setShowLogout(false);
        router.push("/");
    };
    return (
        <CartContext.Provider
            value={{
                showLogout,
                setShowLogout,
            }}> {children} <LogoutModal
                show={showLogout}
                onCancel={() => setShowLogout(false)}
                onConfirm={handleLogout}
            /> </CartContext.Provider>)
}
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};