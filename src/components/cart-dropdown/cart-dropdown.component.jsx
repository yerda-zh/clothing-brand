import {CartDropdownContainer, EmptyMessage, CartItems} from './cart-dropdown.styles.jsx';
import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import { useNavigate } from "react-router-dom";

const CartDropdown =()=>{
    const {cartItems} = useContext(CartContext);
    const navigate = useNavigate();

    const goToCheckoutHandler = () => {
        navigate('/checkout')
    }
    return (
        <CartDropdownContainer>
            <CartItems>
                {cartItems.length ? (
                    cartItems.map(item => <CartItem key={item.id} cartItem={item}/>)
                ) : (
                    <EmptyMessage>Your card is empty</EmptyMessage>
                )}
            </CartItems>
            <Button onClick={goToCheckoutHandler}>Go the checkout</Button>
        </CartDropdownContainer>
    )
};
export default CartDropdown;