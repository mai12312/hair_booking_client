"use client"

import { customerContext } from "@/slice/customers.slide";
import { useContext } from "react"

export const useGetCustomer = () => {
    return useContext(customerContext);
}