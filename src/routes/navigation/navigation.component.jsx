import { Outlet } from "react-router-dom";
import { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";

import { selectCurrentUser } from "../../store/user/user.selector";

import {ReactComponent as CrwnLogo} from '../../assets/crown.svg';
import {NavigationContainer, NavLinks, NavLink, LogoContainer} from './navigation.styles.jsx';

import { signOutStart } from "../../store/user/user.action";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { selectCart } from "../../store/cart/cart.selector";

const Navigation=()=>{
    const dispatch = useDispatch();
    const currentUser = useSelector(selectCurrentUser);
    const cart = useSelector(selectCart);

    const signOutUser = () =>dispatch(signOutStart());
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