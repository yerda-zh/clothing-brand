import { createSelector } from "reselect";

const selectCategoryReducer = (state) => state.categories;
// it takes the whole state, and then takes necessary values

export const selectCategories = createSelector(
    [selectCategoryReducer],
    (categoriesSlice)=>categoriesSlice.categories
);
// the first parameter of this selector is the input values, the second one is the output,
// the parameter of the output takes the input value and returns the categories.
// if the input is the same this function won't get to run

export const selectCategoriesMap = createSelector(
    [selectCategories],
    (categories)=>
    categories.reduce((acc, category)=>{
        const {title, items} = category;
        acc[title.toLowerCase()] = items;
        return acc;
    },{})
);

export const selectIsCategoriesLoading = createSelector(
    [selectCategoryReducer],
    (categoriesSlice)=>categoriesSlice.isLoading
);
