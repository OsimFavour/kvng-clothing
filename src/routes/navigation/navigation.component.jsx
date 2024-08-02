import { Fragment, useContext } from 'react'
import { Outlet } from "react-router-dom"

import { UserContext } from '../../contexts/user.context'
import { CartContext } from '../../contexts/cart.context'

import CartIcon from '../../components/cart-icon/cart-icon.component'
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component'

import { ReactComponent as KvngLogo } from '../../assets/crown.svg'
import { signOutUser } from '../../utils/firebase/firebase.utils'

import { LogoContainer, NavigationContainer, Navlink, NavLinks } from './navigation.styles.jsx'

const Navigation = () => {
    const { currentUser } = useContext(UserContext)
    const { isCartOpen } = useContext(CartContext)

    return (
      <Fragment>
        <NavigationContainer>
            <LogoContainer to='/'>
                <KvngLogo className="logo" />
            </LogoContainer>
            
            <NavLinks>
                <Navlink to='/shop'>
                    SHOP
                </Navlink>

                { currentUser ? (
                    <Navlink as="span" onClick={signOutUser}>
                        SIGN OUT
                    </Navlink>
                ) : (
                    <Navlink to='/auth'>
                        SIGN IN
                    </Navlink>
                )}

                <CartIcon/>

            </NavLinks>

            {isCartOpen && <CartDropdown/>}
            
        </NavigationContainer> 

        <Outlet />
      </Fragment>
    )
}

export default Navigation