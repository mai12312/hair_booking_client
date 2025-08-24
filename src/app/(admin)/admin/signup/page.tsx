"use client"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from 'react';

export default function ComponentLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<any>(null);
    const openSignIn = async (e: any) => {
        window.location.href = "/register"
    }
    const getURL = (path: string = "") => {
        let url =
            process?.env?.NEXT_PUBLIC_PROD_URL &&
                process.env.NEXT_PUBLIC_PROD_URL.trim() !== ""
                ? process.env.NEXT_PUBLIC_PROD_URL
                : "http://localhost:3000/";

        url = url.replace(/\/+$/, "");
        url = url.includes("http") ? url : `https://${url}`;
        path = path.replace(/^\/+/, "");
        return path ? `${url}/${path}` : url;
    };
    
    const handleLogin = async (e: any) => {
        e.preventDefault();
        setError(null);
       
    };

    async function signInWithProviderOAuth() {
       
    }

    return (
        <div className="flex items-center justify-center p-4 bg-gray-100 w-full min-h-screen">
            <Card className="mx-auto w-full max-w-md p-4 sm:p-8 bg-white rounded-lg shadow-md">
                <CardHeader className="space-y-2">
                    <CardTitle className="text-xl sm:text-2xl font-bold text-center">
                        Đăng nhập
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex flex-col gap-4">
                        {/* === Button Google ==== */}
                        <button
                            className="flex w-full items-center gap-2 rounded-full border border-gray-200 p-3"
                            onClick={signInWithProviderOAuth}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 21 20"
                                fill="none"
                            >
                                <path
                                    d="M20.3055 8.0415H19.5V8L10.5 8V12L16.1515 12C15.327 14.3285 13.1115 16 10.5 16C7.1865 16 4.5 13.3135 4.5 10C4.5 6.6865 7.1865 4 10.5 4C12.0295 4 13.421 4.577 14.4805 5.5195L17.309 2.691C15.523 1.0265 13.134 0 10.5 0C4.9775 0 0.5 4.4775 0.5 10C0.5 15.5225 4.9775 20 10.5 20C16.0225 20 20.5 15.5225 20.5 10C20.5 9.3295 20.431 8.675 20.3055 8.0415Z"
                                    fill="#FFC107"
                                />
                                <path
                                    d="M1.65308 5.3455L4.93858 7.755C5.82758 5.554 7.98058 4 10.5001 4C12.0296 4 13.4211 4.577 14.4806 5.5195L17.3091 2.691C15.5231 1.0265 13.1341 0 10.5001 0C6.65908 0 3.32808 2.1685 1.65308 5.3455Z"
                                    fill="#FF3D00"
                                />
                                <path
                                    d="M10.4999 20.0001C13.0829 20.0001 15.4299 19.0116 17.2044 17.4041L14.1094 14.7851C13.1054 15.5456 11.8574 16.0001 10.4999 16.0001C7.89891 16.0001 5.69041 14.3416 4.85841 12.0271L1.59741 14.5396C3.25241 17.7781 6.61341 20.0001 10.4999 20.0001Z"
                                    fill="#4CAF50"
                                />
                                <path
                                    d="M20.3055 8.0415H19.5V8L10.5 8V12L16.1515 12C15.7555 13.1185 15.036 14.083 14.108 14.7855L14.1095 14.7845L17.2045 17.4035C16.9855 17.6025 20.5 15 20.5 10C20.5 9.3295 20.431 8.675 20.3055 8.0415Z"
                                    fill="#1976D2"
                                />
                            </svg>
                            <span className="flex-1 text-center text-sm sm:text-base font-semibold text-gray-700">
                                Sign in with Google
                            </span>
                        </button>
                    </div>
                    {/* Username */}
                    <div className="space-y-2">
                        <Label htmlFor="username">Username</Label>
                        <Input
                            id="username"
                            type="text"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    {/* Password */}
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {/* Login Button */}
                    <Button
                        type="submit"
                        className="w-full bg-blue-600 text-white rounded-lg p-2 hover:bg-blue-700"
                        onClick={handleLogin}
                    >
                        Log In
                    </Button>
                    {/* Sign Up Button */}
                    <Button
                        type="button"
                        className="w-full bg-gray-100 text-gray-800 rounded-lg p-2 hover:bg-gray-200"
                        onClick={openSignIn}
                    >
                        Sign Up
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}