import {AnyAction} from 'redux';
import { Category } from "./category.types";

import {
  fetchCategoriesStart,
  fetchCategoriesFailed,
  fetchCategoriesSuccess,
} from "./category.action";

export type CategoriesState = {
    readonly categories: Category[];
    readonly isLoading: boolean;
    readonly error: Error | null;
}

export const CATEGORIES_INITIAL_STATE = {
    categories: [],
    isLoading: false,
    error: null,
}

export const categoriesReducer = (
  state = CATEGORIES_INITIAL_STATE,
  action: AnyAction
): CategoriesState => {
  if(fetchCategoriesStart.match(action)) {
    return { ...state, isLoading: true };
  }

  if(fetchCategoriesSuccess.match(action)) {
    return {
      ...state,
      categories: action.payload,
      isLoading: false,
    };
  }

  if(fetchCategoriesFailed.match(action)) {
    return { ...state, error: action.payload, isLoading: false };
  }

  return state;

  // if our fetching is successful then we will put payload
  // into categories
};