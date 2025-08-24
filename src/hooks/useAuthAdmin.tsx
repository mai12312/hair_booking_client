"use client"

import { authContext } from "@/slice/auth.slice";
import { useContext } from "react"

export const useAuthAdmin = () => {
    return useContext(authContext);
}