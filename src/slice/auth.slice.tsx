"use client"

import { AuthContext } from "@/types/auth";
import { getApiBackend } from "@/utils/env.util";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { redirect, usePathname, useRouter } from "next/navigation";
import { createContext, memo, useCallback, useEffect, useMemo, useState } from "react"

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
    changeAuth: () => {},
});

/**
 * @desc type of AuthContextProvider
 */
export const AuthContextProvider = memo(({
    children,
    token
} : {
    children: React.ReactNode,
    token: RequestCookie | undefined
}) => {
    const [auth, setAuth] = useState<AuthAdmin>({
        email: "",
        accessToken: token?.value || "",
        isAuth: false,
        admin: {},
    });

    useEffect(() => {
        if(token && token.value.length > 0) {
            fetch(`${getApiBackend()}/api/auth/me`, {
                headers: {
                    "Authorization": `Bearer ${token.value}`
                }
            })
            .then(res => res.json())
            .then((data) => {
                if(data.status == 200) {
                    changeAuth({
                        ...auth,
                        email: data?.datas?.email ?? "",
                        isAuth: true,
                        admin: data?.datas ?? {},
                    })
                }
            });
        }
    }, [])
    
    const changeAuth = useCallback((auth: AuthAdmin) => {
        setAuth(auth)
    }, [auth, auth.accessToken, auth.email, auth.isAuth])
    
    const authData = useMemo(() => ({
        auth,
        changeAuth
    }), [
        auth,
        changeAuth
    ])

    return (
        <authContext.Provider value={{
           auth: authData.auth,
           changeAuth: authData.changeAuth
        }}>
            {children}  
        </authContext.Provider>
    )
})

AuthContextProvider.displayName = "AuthContextProvider";