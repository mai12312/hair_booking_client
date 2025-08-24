"use client"
import { UploadUppyContext } from "@/slice/upload/upload-uppy.slice";
import { useContext } from "react";

export function useUploadUppy() {
    return useContext(UploadUppyContext)
}