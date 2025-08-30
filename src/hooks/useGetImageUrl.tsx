"use client"

import { getApiBackend } from "@/utils/env.util";

export const useGetImageUrl = (file: string) => {
    const backendUrl = getApiBackend();
    const imageUrl = () => {
        if (!file) return "";
        return `${backendUrl}/${file}`;
    }


    return {
        imageUrl
    }
}