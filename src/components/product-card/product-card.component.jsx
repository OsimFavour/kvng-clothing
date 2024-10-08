
import { useDispatch, useSelector } from 'react-redux'

import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component'

import { addItemToCart } from '../../store/cart/cart.action'

import { 
    Footer, 
    Name, 
    Price, 
    ProductCardContainer 
} from './product-card.styles'
import { selectCartItems } from '../../store/cart/cart.selector'

const ProductCard = ({ product }) => {
    const dispatch = useDispatch()

    const { name, price, imageUrl } = product

    const cartItems = useSelector(selectCartItems)

    const addProductToCart = () => dispatch(addItemToCart(cartItems, product))
    
    return (
        <ProductCardContainer>
            <img src={imageUrl} alt={`${name}`}/>
            <Footer>
                <Name>{name}</Name>
                <Price>{price}</Price>
            </Footer>
            <Button 
                onClick={addProductToCart} 
                buttonType={BUTTON_TYPE_CLASSES.inverted}
            >
                Add to cart
            </Button>
        </ProductCardContainer>
    )
}

export default ProductCard