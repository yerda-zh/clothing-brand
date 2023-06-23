import { createContext, useState } from "react";

import PRODUCTS from '../shop-data.json';

export const ProductsContext = createContext({
    products: [], // -> to signify what we want
});

export const ProductsProvider = ({children}) => {
    const [products, setProducts] = useState(PRODUCTS);
    const value = {products};

    return (
        <ProductsContext.Provider value = {value}>{children}</ProductsContext.Provider>
        // the value is where we are going to store
    )
};
