import { Outlet } from "react-router-dom";
import { Fragment, useContext } from "react";
import { useSelector } from "react-redux";

import { selectCurrentUser } from "../../store/user/user.selector";

import {ReactComponent as CrwnLogo} from '../../assets/crown.svg';
import {NavigationContainer, NavLinks, NavLink, LogoContainer} from './navigation.styles.jsx';

import { signOutUser } from "../../utils/firebase/firebase.util";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import {CartContext} from '../../contexts/cart.context';

const Navigation=()=>{
    const currentUser = useSelector(selectCurrentUser);
    const { cart } = useContext(CartContext);

    return (
      <Fragment>
        <NavigationContainer>
            <LogoContainer to='/'>
                <CrwnLogo className="logo"/>
                <span>Crown Clothing</span>
            </LogoContainer>
            {/* <span>Crown Clothing</span> */}
            <NavLinks>
                <NavLink to='/shop'>
                    SHOP
                </NavLink>
                {currentUser ? (
                    <NavLink as='span' onClick={signOutUser}>SIGN OUT</NavLink>
                ) : (
                    <NavLink to='/auth'>
                        SIGN IN
                    </NavLink>
                )}
                <CartIcon/>
            </NavLinks>
            {cart && <CartDropdown/>}
        </NavigationContainer>
        <Outlet/>
      </Fragment>
    );
  };
  export default Navigation;