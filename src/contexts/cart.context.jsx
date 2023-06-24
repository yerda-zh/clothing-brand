import { createContext, useState } from "react";

export const addCartItem = (cartItems, productToAdd) => {
    //return whether to add a new product card or increase the existing cart quantity

    const existingCartItem = cartItems.find(item => item.id === productToAdd.id);

    if(existingCartItem) {
        return cartItems.map(item => item.id === productToAdd.id ? {...item, quantity: item.quantity+1}: item);
    }

    return [...cartItems, {...productToAdd, quantity: 1}];
};

export const addCartTotal = (cartItems) => {
    return cartItems.reduce((accumulator, item) => accumulator+item.quantity, 0);
}

export const CartContext = createContext({
    cart: false,
    setCart: () => {},
    cartItems: [],
    addItemToCart: () => {},
    cartTotal: 0,
    makeCartTotal: () => {},
});

export const CartProvider = ({children}) => {
    const [cart, setCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);

    const addItemToCart = (product) => setCartItems(addCartItem(cartItems, product));

    const makeCartTotal = (cartItems) => setCartTotal(addCartTotal(cartItems));

    const value = {cart, setCart, addItemToCart, cartItems, cartTotal, makeCartTotal};

    return (
        <CartContext.Provider value = {value}>{children}</CartContext.Provider>
        // the value is where we are going to store
    )
};