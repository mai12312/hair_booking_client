"use client"
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";

export default function ComponentRegister() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(null);

    const handleSignIn = async (e: any) => {
        e.preventDefault();
        try {
            if(password==confirmPassword){
                  if(error){
                    toast.error("Đăng ký thất bại")
                  }
                  else {
                    toast.success("đăng ký thành công")
                    window.location.href = '/';
                  }
            }
            else {
                toast.error("Mật khẩu không khớp")
            }

        } catch (err: any) {
            setError(err.message);
        }
    };
    return (
        <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-pink-500 pb-2">ĐĂNG KÝ</h2>

            <form onSubmit={handleSignIn}>
                {/* <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700">Name</label>
                    <input
                        type="text"
                        id="name"
                        className="w-full mt-2 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
                        placeholder="Name"
                    />
                </div> */}

                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full mt-2 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
                        placeholder="Email"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700">Mật khẩu</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full mt-2 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
                        placeholder="Mật khẩu"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="confirmPassword" className="block text-gray-700">Xác nhận mật khẩu</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full mt-2 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
                        placeholder="Xác nhận mật khẩu"
                    />
                </div>

                <Button
                    type="submit"
                    className="w-full bg-pink-500 text-white font-semibold py-2 rounded hover:bg-pink-600 transition duration-300"
                >
                    Đăng ký
                </Button>

                <p className="text-right mt-4">
                    <Link href={`/signup`} className="text-pink-500 hover:underline">Đăng nhập</Link>
                </p>
            </form>
        </div>
    )
}