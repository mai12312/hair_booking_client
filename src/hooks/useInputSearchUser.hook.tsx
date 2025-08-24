"use client"
import { FocusInputSearchUserContext, InputSearchHomeContext } from "@/slice/global/search-global-user.slice";
import { useContext } from "react";

export const useInputSearchUser = () => {
    return useContext(InputSearchHomeContext);
}

/**
 * This hook is used to show popup search results
 */
export const useFocusInputSearch = () => {
    return useContext(FocusInputSearchUserContext)
}