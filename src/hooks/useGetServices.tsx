"use client"

import { ServicesContext } from "@/slice/services.slide"
import { useContext } from "react"

export function useGetServices() {
    return useContext(ServicesContext)
}
