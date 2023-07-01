import {CartIconContainer, ItemCount, ShoppingIcon} from './cart-icon.styles.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { 
    selectCart, 
    selectCartTotal 
} from '../../store/cart/cart.selector';
import { setCartOpen } from '../../store/cart/cart.action';

const CartIcon =() => {
    const cart = useSelector(selectCart);
    const cartTotal = useSelector(selectCartTotal);
    const dispatch = useDispatch();

    const toggleIsCartOpen = () => dispatch(setCartOpen(!cart));

    return (
        <CartIconContainer onClick={toggleIsCartOpen}>
            <ShoppingIcon/>
            <ItemCount>{cartTotal}</ItemCount>
        </CartIconContainer>
    );
};
export default CartIcon;