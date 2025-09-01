"use client"

import { redirect, usePathname } from "next/navigation";
import { CreateBookingContextProvider } from "../create-bookings.slice"
import { CustomerContextProvider } from "../customers.slide"
import { useAuthAdmin } from "@/hooks/useAuthAdmin";
import { useState } from "react";
import { CategoriesProvider } from "../categories.slice";
import { ServicesProvider } from "../services.slide";
import { BookingsProvider } from "../bookings.slice";

export const ProviderContext = ({children}: {children: React.ReactNode}) => {
    const { auth } = useAuthAdmin();
    const pathname = usePathname();
    const [isIncludeUrlAdmin] = useState(pathname.includes("/admin"));
    
    if(auth.accessToken.length > 0) {
        const isRedirectAdmin = !isIncludeUrlAdmin || isIncludeUrlAdmin && pathname.includes("login");
        if(isRedirectAdmin) {
            redirect("/admin/dashboard");
        }
    } else if(!auth.isAuth) {
        const isAdminUrl = isIncludeUrlAdmin && !pathname.includes("login");
        if(isAdminUrl) {
            redirect("/admin/login");
        }
    } else if(auth.isAuth && auth.accessToken.length > 0) {
        const isRedirectAdmin = !isIncludeUrlAdmin || isIncludeUrlAdmin && pathname.includes("login");
        if(isRedirectAdmin) {
            redirect("/admin/dashboard");
        }
    } else if(!auth.isAuth && !auth.accessToken) {
        if(isIncludeUrlAdmin) {
            redirect("/admin/login");
        }
    }
    return (
        <div>
            <CategoriesProvider>
                <ServicesProvider>
                    <BookingsProvider>
                        <CustomerContextProvider>
                            <CreateBookingContextProvider>
                                {children}
                            </CreateBookingContextProvider>
                        </CustomerContextProvider>
                    </BookingsProvider>
                </ServicesProvider>
            </CategoriesProvider>
        </div>
    )
}