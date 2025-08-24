"use client"
import { toast } from "react-toastify";

export function LogoutButton() {
    const handleLogout = async () => {
        window.location.reload();
        toast.error("You don't not log out!");
    }
    return (
        <button 
            type="button"
            className="w-full text-left"
            onClick={handleLogout}
        >
            Logout
        </button>
    )
}