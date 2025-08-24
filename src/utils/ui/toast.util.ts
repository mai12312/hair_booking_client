"use client"

import { useCallback, useMemo } from "react";
import { toast, ToastOptions } from "react-toastify";

export const useToastMessage = () => {
    const optionsDefault: ToastOptions<unknown> = useMemo(() => ({
        position: "bottom-right"
    }), [])
    /**
     * @desc This toast is used to display a successful message 
     * @param {string} mess 
     */
    const toastSuccess = useCallback((mess: string, options?: ToastOptions<unknown>) => {
        toast.success(mess, {...options, ...optionsDefault});
    }, [])

    const toastError = useCallback((mess: string, options?: ToastOptions<unknown>) => {
        toast.error(mess, {...options, ...optionsDefault});
    }, [])
    return {
        toastSuccess, 
        toastError
    }
}