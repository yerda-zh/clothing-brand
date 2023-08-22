import { CATEGORIES_ACTION_TYPE, Category } from "./category.types";
import { createAction, Action, ActionWithPayload, withMatcher } from "../../utils/reducer/reducer.utils";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.util";

export type FetchCategoriesStart = Action<CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_START>;

export type FetchCategoriesSuccess = ActionWithPayload<CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_SUCCESS, Category[]>;

export type FetchCategoriesFailed = ActionWithPayload<CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_FAILED, Error>;

export const fetchCategoriesStart = withMatcher((): FetchCategoriesStart => 
    createAction(CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_START));

export const fetchCategoriesSuccess = withMatcher((categoriesArray: Category[]): FetchCategoriesSuccess => 
    createAction(
        CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_SUCCESS,
        categoriesArray));

export const fetchCategoriesFailed = withMatcher((error: Error): FetchCategoriesFailed => 
    createAction(
        CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_FAILED,
        error));