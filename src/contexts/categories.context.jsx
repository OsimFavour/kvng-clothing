import { createContext } from "react";
import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils.js";
import { useQuery } from "react-query";


export const CategoriesContext = createContext({
    categoriesMap: {},
    isLoading: false,
    isError: false
})


export const CategoriesProvider = ({ children }) => {

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