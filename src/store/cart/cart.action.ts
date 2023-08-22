import { CategoryItem } from "../categories/category.types";
import { CART_ACTION_TYPES, CartItem } from "./cart.types";
import {
  createAction,
  withMatcher,
  Action,
  ActionWithPayload,
} from "../../utils/reducer/reducer.utils";

const addCartItem = (
  cartItems: CartItem[],
  productToAdd: CategoryItem
): CartItem[] => {
  //return whether to add a new product card or increase the existing cart quantity

  const existingCartItem = cartItems.find(
    (item) => item.id === productToAdd.id
  );

  if (existingCartItem) {
    return cartItems.map((item) =>
      item.id === productToAdd.id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const decreaseItem = (
  cartItems: CartItem[],
  cartItem: CartItem
): CartItem[] => {
  const existingCartItem = cartItems.find((item) => item.id === cartItem.id);

  if (existingCartItem && existingCartItem.quantity === 1) {
    return cartItems.filter((item) => item.id !== cartItem.id);
  }

  return cartItems.map((item) =>
    item.id === cartItem.id ? { ...item, quantity: item.quantity - 1 } : item
  );
};

const deleteItem = (cartItems: CartItem[], cartItem: CartItem): CartItem[] =>
  cartItems.filter((item) => item.id !== cartItem.id);

export type SetCartOpen = ActionWithPayload<
  CART_ACTION_TYPES.SET_CART,
  boolean
>;

export type SetCartItems = ActionWithPayload<
  CART_ACTION_TYPES.SET_CART_ITEMS,
  CartItem[]
>;

export const setCartOpen = withMatcher(
  (boolean: boolean): SetCartOpen =>
    createAction(CART_ACTION_TYPES.SET_CART, boolean)
);

export const SetCartItems = withMatcher(
  (cartItems: CartItem[]): SetCartItems =>
    createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems)
);

export const addItemCart = (cartItems: CartItem[], product: CategoryItem) => {
  const newCartItems = addCartItem(cartItems, product);
  return SetCartItems(newCartItems);
};

export const removeItemCart = (cartItems: CartItem[], cartItem: CartItem) => {
  const newCartItems = decreaseItem(cartItems, cartItem);
  return SetCartItems(newCartItems);
};

export const deleteCartItem = (cartItems: CartItem[], cartItem: CartItem) => {
  const newCartItems = deleteItem(cartItems, cartItem);
  return SetCartItems(newCartItems);
};
