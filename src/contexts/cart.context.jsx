import { createContext, useReducer } from "react";

import { createAction } from "../utils/reducer/reducer.utils";

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

export const CART_ACTION_TYPES = {
    SET_CART_ITEMS: 'SET_CART_ITEMS',
    SET_CART: 'SET_CART'
}

const cartReducer = (state, action) => {
    const {type, payload} = action;

    switch(type){
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                ...payload
            }
        case CART_ACTION_TYPES.SET_CART:
            return {
                ...state,
                cart: payload
            }
        default:
            throw new Error(`Unhandled type of ${type} in cartReducer`);
    }
}

const INITIAL_STATE = {
    cart: false,
    cartItems: [],
    cartTotal: 0,
    priceTotal: 0,
}

export const CartProvider = ({children}) => {
    const [{cart, cartItems, cartTotal, priceTotal}, dispatch] = useReducer(cartReducer, INITIAL_STATE);

    const updateCartItemsReducer = (newCartItems) => {
        const newCartTotal = newCartItems.reduce((acc, item)=>acc+item.quantity, 0);
    
        const newPriceTotal = newCartItems.reduce((acc, item)=>item.price * item.quantity + acc,0);

        dispatch(
            createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
                cartItems: newCartItems, 
                cartTotal: newCartTotal, 
                priceTotal: newPriceTotal
            })
        );
        
    }
    const setCart = (payload) => {
        dispatch(
            createAction(
                CART_ACTION_TYPES.SET_CART,
                payload
            )
        );
    }

    const addItemToCart = (product) => {
        const newCartItems = addCartItem(cartItems, product);
        updateCartItemsReducer(newCartItems);
    }

    const removeItemToCart = (cartItem) => {
        const newCartItems = decreaseItem(cartItems, cartItem);
        updateCartItemsReducer(newCartItems);
    }

    const deleteCartItem = (cartItem) => {
        const newCartItems = deleteItem(cartItems, cartItem);
        updateCartItemsReducer(newCartItems);
    }

    const value = {
        cart, 
        setCart, 
        addItemToCart, 
        cartItems, 
        cartTotal, 
        priceTotal, 
        removeItemToCart, 
        deleteCartItem
    };
    return (
        <CartContext.Provider value = {value}>{children}</CartContext.Provider>
        // the value is where we are going to store
    )
};