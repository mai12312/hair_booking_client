

"use client"

import { ValidatorContext } from "@/types/context";
import { createContext, memo, useState } from "react"

/**
 * Banner context
 */
export const ValidatorErrorContext = createContext<ValidatorContext.TValidatorErrorContext>({
    errors: {errors: null},
    setErrors: () => {}
});

/**
 * @desc validator errors
 * @param param
 * @returns 
 */
export const ValidatorErrorProvider = memo(({
    children,
}: {
    children: React.ReactNode,
}) => {    
    const [errors, setErrors] = useState({errors: null});

    return (
        <ValidatorErrorContext.Provider value={{
            errors, 
            setErrors
        }}>
            {children}
        </ValidatorErrorContext.Provider>
    )
})

ValidatorErrorProvider.displayName = "ValidatorErrorProvider"