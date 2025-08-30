

"use client"

import { getApiBackend } from "@/utils/env.util";
import { createContext, memo, useEffect, useState } from "react";
import { set } from "zod";

/**
 * pending is use when fecting first time
 */
type TServices = {
    services: ServiceList,
    pending: boolean,
    setServices: React.Dispatch<React.SetStateAction<ServiceList>>,
    isShowEditDialog: boolean,
    setShowEditDialog: React.Dispatch<React.SetStateAction<boolean>>,
}

export const ServicesContext = createContext<TServices>({
    services: [],
    setServices: () => {},
    pending: false,
    isShowEditDialog: false,
    setShowEditDialog: () => {}
});

export const ServicesProvider = memo(function ServicesProvider({children}: {children: React.ReactNode}) {
    const [services, setServices] = useState<ServiceList>([]);
    const [pending, setPending] = useState<boolean>(true);
    const [isShowEditDialog, setShowEditDialog] = useState<boolean>(false);

    useEffect(() => {
        const backendUrl = getApiBackend();
        const api = `${backendUrl}/api/services`;
        fetch(api)
           .then(res => res.json())
           .then((data: DataResponse<{services: ServiceList}>) => {
                console.log("data services: ", data);
                if(data && data.status === 200) {
                    setServices(data.datas?.services ?? []);
                }
                setPending(false);
            })
            .catch(err => {
                setServices([]);
                setPending(false);
            });
    }, [])

    return (
        <ServicesContext.Provider value={{
            services,
            setServices,
            pending,
            isShowEditDialog,
            setShowEditDialog
        }}>
            {children}
        </ServicesContext.Provider>
    )
})
ServicesProvider.displayName = "ServicesProvider";