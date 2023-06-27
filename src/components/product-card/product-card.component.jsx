import {ProductCardContainer, Name, Price, Footer} from './product-card.styles.jsx';

import Button, {BUTTON_TYPE_CLASSES} from '../button/button.component';

import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

const ProductCard = ({product}) => {
    const {name, price, imageUrl} = product;
    const { addItemToCart } = useContext(CartContext);

    const addProductItem = () => addItemToCart(product);

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