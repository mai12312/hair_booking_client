"use client"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from 'react';
import { useAuthAdmin } from "@/hooks/useAuthAdmin"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<any>(null);
    const { setAuth } = useAuthAdmin();
    const router = useRouter();

    const handleLogin = async (e: any) => {
        e.preventDefault();
        setError(null);
        if (error) {
            setError(error.message);
        } else {
            const api = `/api/auth/signin`;
            fetch(api, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            })
                .then(res => {
                    if (!res.ok) throw new Error("Login failed");
                    return res.json();
                })
                .then(data => {
                    setAuth({
                        email: email, 
                        accessToken: data?.datas?.accessToken ?? "",
                        isAuth: true
                    });
                    toast.success("Login successful");
                    setTimeout(() => {
                        router.push("/admin/dashboard");
                    }, 1000);
                })
                .catch(err => {
                    setError(err.message);
                });
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen p-16 bg-gray-100">
            <Card className="mx-auto max-w-sm">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold">Login</CardTitle>
                    <CardDescription>Please enter your username and password.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="username">Username</Label>
                        <Input id="username" type="text" placeholder="Email" value={email}
                            onChange={e => (setEmail(e.target.value))} required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" value={password}
                            onChange={e => (setPassword(e.target.value?.trim()))} required />
                    </div>
                    <Button type="submit" className="w-full" onClick={handleLogin}>
                        Log In
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}