import { useDispatch, useSelector} from 'react-redux'

import { selectCartCount, selectIsCartOpen } from '../../store/cart/cart.selector'

import { CartIconContainer, ItemCount, ShoppingIcon } from './cart-icon.styles'
import { setIsCartOpen } from '../../store/cart/cart.action';


const CartIcon = () => {
    
    const dispatch = useDispatch();

    const isCartOpen = useSelector(selectIsCartOpen);
    const cartCount = useSelector(selectCartCount);

    const toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen))

    return (
        <CartIconContainer>

            <ShoppingIcon onClick={toggleIsCartOpen} />
            <ItemCount>{cartCount}</ItemCount>
        </CartIconContainer>
    )
}

export default CartIcon