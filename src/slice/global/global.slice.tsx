"use client"
import { useAuthAdmin } from "@/hooks/useAuthAdmin"
import { CreateBookingContextProvider } from "../create-bookings.slice"
import { CustomerContextProvider } from "../customers.slide"
import { redirect } from "next/navigation"
import { useState } from "react"


export const ProviderContext = ({children}: {children: React.ReactNode}) => {
    const { auth } = useAuthAdmin();
    // const router = useRouter();
    const [url] = useState(window.location.href);
    const [isIncludeUrlAdmin] = useState(url.includes("/admin"));
    if(auth && auth.isAuth) {
        if(!isIncludeUrlAdmin) {
            redirect("/admin/dashboard");
        }
    } else if(auth && !auth.isAuth) {
        const isAdminUrl = isIncludeUrlAdmin && !url.includes("login");
        if(isAdminUrl) {
            redirect("/admin/login");
        }
    }
    return (
        <div>
            <CustomerContextProvider>
                <CreateBookingContextProvider>
                    {children}
                </CreateBookingContextProvider>
            </CustomerContextProvider>
        </div>
    )
}