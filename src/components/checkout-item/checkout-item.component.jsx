import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

import './checkout-item.styles.scss';

const CheckoutItem = ({item}) => {
    const {name, imageUrl, price, quantity} = item;
    const {addItemToCart, removeItemToCart, deleteCartItem} = useContext(CartContext);

    const deleteCartItemHandler = () => deleteCartItem(item);
    const addItemHandler = () => addItemToCart(item);
    const decreaseItemHandler = () => removeItemToCart(item);

    return(
        <div className='checkout-item-container'>
            <div className='image-container'>
                <img src={imageUrl} alt={`${name}`}/>
            </div>
            <span className='name'>{name}</span>
            <span className='quantity'>
                <div className="arrow" onClick={decreaseItemHandler}>
                    &#10094;
                </div>
                <span className="value">{quantity}</span>
                <div className="arrow" onClick={addItemHandler}>
                    &#10095;
                </div>
            </span>
            <span className='price'>{price}</span>
            <div className='remove-button' onClick={deleteCartItemHandler}>&#10005;</div>
        </div>
    )
}
export default CheckoutItem;