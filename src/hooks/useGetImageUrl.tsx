"use client"

export const useGetImageUrl = (file: string) => {
    const backendUrl = process.env.NEXT_PUBLIC_HAIR_BOOKING_API ?? "";
    const imageUrl = () => {
        if (!file) return "";
        return `${backendUrl}/${file}`;
    }


    return {
        imageUrl
    }
}