import {ProductCardContainer, Name, Price, Footer} from './product-card.styles.jsx';

import Button, {BUTTON_TYPE_CLASSES} from '../button/button.component';

import { useDispatch, useSelector } from 'react-redux';
import { addItemCart } from '../../store/cart/cart.action.js';
import { selectCartItems } from '../../store/cart/cart.selector.js'

const ProductCard = ({product}) => {
    const dispatch = useDispatch();
    const {name, price, imageUrl} = product;
    const cartItems = useSelector(selectCartItems);

    const addProductItem = () => dispatch(addItemCart(cartItems,product));

    return (
        <ProductCardContainer>
            <img src={imageUrl} alt={`${name}`}/>
            <Footer>
                <Name>{name}</Name>
                <Price className='price'>{price}</Price>
            </Footer>
            <Button 
                buttonType={BUTTON_TYPE_CLASSES.inverted} 
                onClick={addProductItem}
            >Add to card
            </Button>
        </ProductCardContainer>
    );
};
export default  ProductCard;