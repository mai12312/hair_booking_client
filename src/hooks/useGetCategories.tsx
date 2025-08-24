"use client"

import { CategoriesContext } from "@/slice/categories/categories.slice"
import { useContext } from "react"

export function useGetCategories() {
    return useContext(CategoriesContext)
}
