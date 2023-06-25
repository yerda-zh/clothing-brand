import { createContext, useState, useEffect } from "react";

import { getCategoriesAndDocuments} from "../utils/firebase/firebase.util.js";

export const CategoriesContext = createContext({
    categoriesMap: {}, // -> to signify what we want
});

export const CategoriesProvider = ({children}) => {
    const [categoriesMap, setCategoriesMap] = useState({});

    useEffect(()=>{
        const getCategoriesMap = async() => {
            const categoryMap = await getCategoriesAndDocuments();
            console.log(categoryMap);
            setCategoriesMap(categoryMap);
        }
        getCategoriesMap();
        
    }, []);
    const value = {categoriesMap};
    return (
        <CategoriesContext.Provider value = {value}>{children}</CategoriesContext.Provider>
        // the value is where we are going to store
    )
};
