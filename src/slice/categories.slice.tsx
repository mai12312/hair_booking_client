

"use client"

import { getApiBackend } from "@/utils/env.util";
import { createContext, memo, useEffect, useState } from "react";

/**
 * pending is use when fecting first time
 */
type TCategories = {
    categories: CategoryList,
    pending: boolean,
    setCategories: React.Dispatch<React.SetStateAction<CategoryList>>,
    isShowEditDialog: boolean,
    setShowEditDialog: React.Dispatch<React.SetStateAction<boolean>>,
}

export const CategoriesContext = createContext<TCategories>({
    categories: [],
    setCategories: () => {},
    pending: false,
    isShowEditDialog: false,
    setShowEditDialog: () => {}
});

export const CategoriesProvider = memo(function CategoriesProvider({children}: {children: React.ReactNode}) {
    const [categories, setCategories] = useState<CategoryList>([]);
    const [pending, setPending] = useState<boolean>(true);
    const [isShowEditDialog, setShowEditDialog] = useState<boolean>(false);

    useEffect(() => {
        const backendUrl = getApiBackend();
        const api = `${backendUrl}/api/service-categories`;
        fetch(api)
           .then(res => res.json())
           .then((data) => {
                if(data && data.status === 200) {
                    setCategories(data.datas?.categories ?? []);
                }
                setPending(false);
            })
            .catch(err => {
                setCategories([]);
                setPending(false);
            });
    }, [])

    return (
        <CategoriesContext.Provider value={{
            categories,
            setCategories,
            pending,
            isShowEditDialog,
            setShowEditDialog
        }}>
            {children}
        </CategoriesContext.Provider>
    )
})
CategoriesProvider.displayName = "CategoriesProvider";