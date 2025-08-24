"use client"

import { AuthContext } from "@/types/auth";
import { createContext, memo, useState } from "react"

/**
 * @desc context of comments
 */
export const authContext = createContext<AuthContext.TAuthContext>({
    auth: {
        email: "",
        accessToken: "",
        isAuth: false,
        admin: {},
    },
    setAuth: () => {},
});

/**
 * @desc type of AuthContextProvider
 */
export const AuthContextProvider = memo(({
    children,
} : {
    children: React.ReactNode,
}) => {

    const [auth, setAuth] = useState<AuthAdmin>({
        email: "",
        accessToken: "",
        isAuth: false,
        admin: {},
    });

    return (
        <authContext.Provider value={{
           auth,
           setAuth
        }}>
            {children}  
        </authContext.Provider>
    )
})

AuthContextProvider.displayName = "AuthContextProvider";