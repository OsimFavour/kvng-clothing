import { useContext } from 'react'
import { Link, Outlet } from "react-router-dom"

import { UserContext } from '../../contexts/user.context'
import { CartContext } from '../../contexts/cart.context'

import CartIcon from '../../components/cart-icon/cart-icon.component'
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component'

import { ReactComponent as KvngLogo } from '../../assets/crown.svg'
import { signOutUser } from '../../utils/firebase/firebase.utils'

import './navigation.styles.scss'

const Navigation = () => {
    const { currentUser } = useContext(UserContext)
    const { isCartOpen } = useContext(CartContext)

    return (
      <>
        <div className="navigation">
            <Link className="logo-container" to='/'>
                <KvngLogo className="logo" />
            </Link>
            
            <div className="nav-links-container">
                <Link className="nav-link" to='/shop'>
                    SHOP
                </Link>

                { currentUser ? (
                    <span className='nav-link' onClick={signOutUser}>
                        SIGN OUT
                    </span>
                ) : (
                    <Link className="nav-link" to='/auth'>
                        SIGN IN
                    </Link>
                )}

                <CartIcon/>

            </div>

            {isCartOpen && <CartDropdown/>}
            
        </div> 

        <Outlet />
      </>
    )
}

export default Navigation