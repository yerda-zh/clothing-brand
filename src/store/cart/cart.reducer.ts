import { AnyAction } from "redux";

import { setCartOpen, SetCartItems } from "./cart.action";

import { CartItem } from "./cart.types";

export type CartState = {
  readonly cart: boolean;
  readonly cartItems: CartItem[];
};

export const CART_INITIAL_STATE: CartState = {
  cart: false,
  cartItems: [],
};

export const cartReducer = (
  state = CART_INITIAL_STATE,
  action: AnyAction
): CartState => {
  if (setCartOpen.match(action)) {
    return {
      ...state,
      cart: action.payload,
    };
  }

  if (SetCartItems.match(action)) {
    return {
      ...state,
      cartItems: action.payload,
    };
  }

  return state;
};
