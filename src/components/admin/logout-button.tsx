"use client"
import { useAuthAdmin } from "@/hooks/useAuthAdmin";
import { useCallback } from "react";
import { toast } from "react-toastify";

export function LogoutButton() {
    const {auth, changeAuth}  = useAuthAdmin();
    const handleLogout = useCallback(() => {
        fetch("/api/auth/logout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("Logout response data: ", data);
                if(data.status == 204) {
                    toast.success("Bạn đã đăng xuất thành công!");
                    changeAuth({
                        isAuth: false,
                        accessToken: "",
                        email: ""
                    })
                } else {
                    toast.error("Bạn không thể đăng xuất!");
                }
            }).catch(() => {
                toast.error("Bạn không thể đăng xuất!");
            });
    }, [auth, auth.accessToken, auth.email])
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