"use client"

import { CustomerContext } from "@/types/customers";
import { createContext, memo, useCallback, useEffect, useState } from "react"

/**
 * @desc context of comments
 */
export const customerContext = createContext<CustomerContext.TCustomerContext>({
    customer: {
        id: 0,
        name: "",
        email: "",
        phone: "",
    },
    setCustomer: () => {},
});

/**
 * @desc type of CustomerContextProvider
 */
export const CustomerContextProvider = memo(({
    children,
} : {
    children: React.ReactNode,
}) => {

    const [customer, setCustomer] = useState<Customer>({
        id: 0,
        name: "",
        email: "",
        phone: "",
    });
    return (
        <customerContext.Provider value={{
           customer,
           setCustomer
        }}>
            {children}  
        </customerContext.Provider>
    )
})

CustomerContextProvider.displayName = "CustomerContextProvider";