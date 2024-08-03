import { createContext, useEffect, useState } from "react";
import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils.js";
import { useQuery } from "react-query";


export const CategoriesContext = createContext({
    categoriesMap: {},
    isLoading: false,
    isError: false
})


export const CategoriesProvider = ({ children }) => {
    // const [categoriesMap, setCategoriesMap] = useState({})
    
    // useEffect(() => {
    //     const getCategoriesMap = async () => {
    //         const categoryMap = await getCategoriesAndDocuments()
    //         setCategoriesMap(categoryMap);
    //     }

    //     return getCategoriesMap
    // }, [])

    // const getCategoriesMap = async () => {
    //     const categoryMap = await getCategoriesAndDocuments()

    //     console.log('Hi from category context', categoryMap);
    //     return categoryMap
    // }

    const { isLoading, isError, data: categoriesMap } = useQuery(
        'category', 
        getCategoriesAndDocuments,
        {
            staleTime: 3600000,
            cacheTime: 3600000,
        }
    )

    const value = { isLoading, isError, categoriesMap }
    return (
        <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
    )
}