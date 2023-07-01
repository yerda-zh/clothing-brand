import { Fragment } from "react";

import CategoryPreview from "../../components/category-preview/category-preview.component";
import { useSelector } from "react-redux";
import { selectCategoriesMap, selectIsCategoriesLoading } from "../../store/categories/category.selector";
import Spinner from "../../components/spinner/spinner.component";

const CategoriesPreview =() => {
    const categoriesMap = useSelector(selectCategoriesMap);
    const isLoading = useSelector(selectIsCategoriesLoading);
    return(
        <Fragment>
            { isLoading ? (<Spinner/>) : (
                Object.keys(categoriesMap).map(title => {
                const products = categoriesMap[title];

                return <CategoryPreview key={title} title={title} products={products}/>
                })
            )}
        </Fragment>
    );
};
export default CategoriesPreview;