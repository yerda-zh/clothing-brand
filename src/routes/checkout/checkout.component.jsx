import { useSelector } from 'react-redux';
import { selectCartItems, selectPriceTotal } from '../../store/cart/cart.selector';
import {CheckoutContainer, CheckoutHeader, HeaderBlock, Total} from './checkout.styles';
import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import PaymentForm from "../../components/payment-form/payment-form.component";

const CheckOut = () => {
    const cartItems = useSelector(selectCartItems);
    const priceTotal = useSelector(selectPriceTotal);
    
    return (
        <CheckoutContainer>
            <CheckoutHeader>
                <HeaderBlock>
                    <span>Product</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Description</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Quantity</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Price</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Remove</span>
                </HeaderBlock>
            </CheckoutHeader>
            {cartItems.map((item)=>(
                <CheckoutItem key={item.id} item={item}/>      
            ))}
            <Total>{`TOTAL: $${priceTotal}`}</Total>
            <PaymentForm />
        </CheckoutContainer>
    );
}
export default CheckOut;