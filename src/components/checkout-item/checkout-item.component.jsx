import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
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
    const {name, imageUrl, price, quantity} = item;
    const {addItemToCart, removeItemToCart, deleteCartItem} = useContext(CartContext);

    const deleteCartItemHandler = () => deleteCartItem(item);
    const addItemHandler = () => addItemToCart(item);
    const decreaseItemHandler = () => removeItemToCart(item);

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