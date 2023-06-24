import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import './checkout.styles.scss';

const CheckOut = () => {
    const {cartItems, cartTotal} = useContext(CartContext);
    
    return (
        <div>
            <div>
                {cartItems.map((item)=>(
                    <div key={item.id}>
                        <span className="name">{item.name}</span>
                        <button className="changer">{` < `}</button>
                        <span className="quantity">{item.quantity}</span>
                        <button className="changer">{` > `}</button>
                        <span className="price">{item.price}</span>
                        <span className="delete"> x </span> 
                    </div>       
                ))}     
            </div>
            <div>
                <h3 className="total">{cartTotal}</h3>
            </div>
            
        </div>
    );
}
export default CheckOut;