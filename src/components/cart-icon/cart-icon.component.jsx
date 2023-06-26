import {CartIconContainer, ItemCount, ShoppingIcon} from './cart-icon.styles.jsx';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

const CartIcon =() => {
    const {cart, setCart, cartTotal} = useContext(CartContext);

    const toggleIsCartOpen = () => setCart(!cart);

    return (
        <CartIconContainer onClick={toggleIsCartOpen}>
            <ShoppingIcon/>
            <ItemCount>{cartTotal}</ItemCount>
        </CartIconContainer>
    );
};
export default CartIcon;