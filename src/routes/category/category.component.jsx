import { useParams } from 'react-router-dom';
import { useState, useEffect, Fragment } from 'react';

import { useSelector } from 'react-redux';
import { selectCategoriesMap } from '../../store/categories/category.selector.js';

import {CategoryContainer, CategoryTitle} from './category.styles.jsx';
import ProductCard from '../../components/product-card/product-card.component';
import { selectIsCategoriesLoading } from '../../store/categories/category.selector.js';
import Spinner from '../../components/spinner/spinner.component.jsx';

const Category=()=>{
    const {category} = useParams();
    const categoriesMap=useSelector(selectCategoriesMap);
    const isLoading = useSelector(selectIsCategoriesLoading);
    const [products, setProducts] = useState(categoriesMap[category]);
    
    useEffect(()=>{
        setProducts(categoriesMap[category]);
    }, [category, categoriesMap]);

    return (
        <Fragment>
            <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
            {isLoading ? (<Spinner/>) : (
            <CategoryContainer>
                {products && products.map((product)=><ProductCard key={product.id} product={product}/>)}
            </CategoryContainer>)}            
        </Fragment>
        
    )
};
export default Category;