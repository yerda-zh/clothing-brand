import { createSelector } from "reselect";

const selectCartReducer = (state) => state.cart;

export const selectCartItems = createSelector(
    [selectCartReducer],
    (cart)=>cart.cartItems
);

export const selectCart = createSelector(
    [selectCartReducer],
    (cart) => cart.cart
);

export const selectCartTotal = createSelector(
    [selectCartItems],
    (cartItems)=>cartItems.reduce((acc, item)=>acc+item.quantity, 0)
); 

export const selectPriceTotal = createSelector(
    [selectCartItems],
    (cartItems)=>cartItems.reduce((acc, item)=>item.price * item.quantity + acc,0)
); 