import {CART_ACTION_TYPES} from './cart.types';
import { createAction } from "../../utils/reducer/reducer.utils";

const addCartItem = (cartItems, productToAdd) => {
    //return whether to add a new product card or increase the existing cart quantity

    const existingCartItem = cartItems.find((item) => item.id === productToAdd.id);

    if(existingCartItem) {
        return cartItems.map(item => item.id === productToAdd.id ? {...item, quantity: item.quantity+1}: item);
    }

    return [...cartItems, {...productToAdd, quantity: 1}];
};

const decreaseItem = (cartItems, cartItem) => {
    const existingCartItem = cartItems.find((item) => item.id === cartItem.id);

    if(existingCartItem.quantity === 1 ) {
        return cartItems.filter((item) => item.id !== cartItem.id);
    }

    return cartItems.map(item => item.id === cartItem.id ? {...item, quantity: item.quantity-1}: item);
};

const deleteItem = (cartItems, cartItem) => cartItems.filter((item) => item.id !== cartItem.id)


export const setCartOpen = (boolean) => createAction(CART_ACTION_TYPES.SET_CART, boolean);

export const addItemCart = (cartItems, product) => {
    const newCartItems = addCartItem(cartItems, product);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems );
}

export const removeItemCart = (cartItems, cartItem) => {
    const newCartItems = decreaseItem(cartItems, cartItem);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems );
}

export const deleteCartItem = (cartItems, cartItem) => {
    const newCartItems = deleteItem(cartItems, cartItem);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems );
}