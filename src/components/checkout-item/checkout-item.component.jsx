import { useDispatch, useSelector } from "react-redux";
import { addItemCart, removeItemCart, deleteCartItem} from "../../store/cart/cart.action";
import { selectCartItems } from "../../store/cart/cart.selector";

import {
    CheckoutItemContainer, 
    BaseSpan, 
    ImageContainer, 
    Value, 
    Arrow, 
    RemoveButton, 
    Quantity
} from './checkout-item.styles.jsx';

const CheckoutItem = ({item}) => {
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);
    const {name, imageUrl, price, quantity} = item;
    // const addItemToCart = dispatch(addItemCart(cartItems,item));
    // const removeItemToCart = dispatch(removeItemCart(cartItems,item));
    // const deleteCartToItem = dispatch(deleteCartItem(cartItems,item));

    const deleteCartItemHandler = () => dispatch(deleteCartItem(cartItems,item));
    const addItemHandler = () => dispatch(addItemCart(cartItems,item));
    const decreaseItemHandler = () => dispatch(removeItemCart(cartItems,item));

    return(
        <CheckoutItemContainer>
            <ImageContainer>
                <img src={imageUrl} alt={`${name}`}/>
            </ImageContainer>
            <BaseSpan>{name}</BaseSpan>
            <Quantity>
                <Arrow onClick={decreaseItemHandler}>
                    &#10094;
                </Arrow>
                <Value>{quantity}</Value>
                <Arrow onClick={addItemHandler}>
                    &#10095;
                </Arrow>
            </Quantity>
            <BaseSpan>{price}</BaseSpan>
            <RemoveButton onClick={deleteCartItemHandler}>&#10005;</RemoveButton>
        </CheckoutItemContainer>
    )
}
export default CheckoutItem;