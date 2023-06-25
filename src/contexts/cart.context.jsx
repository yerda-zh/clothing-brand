import { createContext, useState, useEffect } from "react";

export const addCartItem = (cartItems, productToAdd) => {
    //return whether to add a new product card or increase the existing cart quantity

    const existingCartItem = cartItems.find(item => item.id === productToAdd.id);

    if(existingCartItem) {
        return cartItems.map(item => item.id === productToAdd.id ? {...item, quantity: item.quantity+1}: item);
    }

    return [...cartItems, {...productToAdd, quantity: 1}];
};

export const decreaseItem = (cartItems, cartItem) => {
    const existingCartItem = cartItems.find(item => item.id === cartItem.id);

    if(existingCartItem.quantity === 1 ) {
        return cartItems.filter((item) => item.id !== cartItem.id);
    }

    return cartItems.map(item => item.id === cartItem.id ? {...item, quantity: item.quantity-1}: item);
};

export const deleteItem = (cartItems, cartItem) => cartItems.filter((item) => item.id !== cartItem.id)

export const CartContext = createContext({
    cart: false,
    setCart: () => {},
    cartItems: [],
    addItemToCart: () => {},
    cartTotal: 0,
    priceTotal: 0,
    removeItemToCart: () => {},
    deleteCartItem: () => {}
});

export const CartProvider = ({children}) => {
    const [cart, setCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);
    const [priceTotal, setPriceTotal] = useState(0);

    const addItemToCart = (product) => setCartItems(addCartItem(cartItems, product));

    const removeItemToCart = (cartItem) => setCartItems(decreaseItem(cartItems, cartItem));

    const deleteCartItem = (cartItem) => setCartItems(deleteItem(cartItems, cartItem));

    useEffect(()=>{
        const newCartTotal = cartItems.reduce((acc, item)=>acc+item.quantity, 0);
        setCartTotal(newCartTotal);
    },[cartItems]);

    useEffect(()=>{
        const newPriceTotal = cartItems.reduce((acc, item)=>item.price * item.quantity + acc,0);
        setPriceTotal(newPriceTotal);
    },[cartItems]);

    const value = {cart, setCart, addItemToCart, cartItems, cartTotal, priceTotal, removeItemToCart, deleteCartItem};

    return (
        <CartContext.Provider value = {value}>{children}</CartContext.Provider>
        // the value is where we are going to store
    )
};