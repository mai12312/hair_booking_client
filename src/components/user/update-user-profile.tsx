"use client"
import { Button } from "../ui/button";
import { useState } from "react";
import { Input } from "../ui/input";
import { toast } from "react-toastify";
import { useGetAuth } from "@/hooks/user/auth/useGetAuth";

export function UpdateUserProfile() {
    const { username, userAvatar, userEmail, userId } = useGetAuth();
    const [name, setName] = useState<string>(username);
    const [error, setError] = useState<string | null>(null); 
    const [isUpdating, setIsUpdating] = useState<boolean>(false);

    async function UpdateName() {
        setIsUpdating(true);

        try {
            if (error) {
                setError("Failed to update name.")
                console.error(error);
            } else {
                setError(null);
                toast.success("Name updated successfully!");
            }
        } catch (err) {
            console.error("An error occurred:", err);
            setError("An unexpected error occurred.");
        }

        setIsUpdating(false);
        window.location.reload()
    }

    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md">
            <h2 className="text-lg font-semibold text-pink-600 mb-4">Thông tin tài khoản</h2>

            <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Email</label>
                <Input
                    type="email"
                    value={userEmail}
                    disabled
                    className="w-full px-4 py-2 border rounded-md bg-gray-100 cursor-not-allowed text-gray-500"
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Họ và tên</label>
                <Input
                    type="text"
                    value={name}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                    onChange={(e) => setName(e.target.value)}
                />
                <p className="text-red-500 text-sm mt-2">
                    &quot;Họ và tên&quot; chỉ cho phép cập nhật 1 lần trong 30 ngày.
                </p>
            </div>

            {/* Conditional rendering of error message */}
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            <Button
                className={`w-full bg-yellow-400 text-white font-bold py-2 px-4 rounded-md hover:bg-yellow-500 transition duration-300 ${isUpdating ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={async () => UpdateName()}
                disabled={isUpdating}
            >
                {isUpdating ? "Đang cập nhật..." : "Cập nhật"}
            </Button>
        </div>
    );
}