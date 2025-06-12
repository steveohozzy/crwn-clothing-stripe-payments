import { useDispatch, useSelector } from 'react-redux';

import { addItemToCart } from '../../store/cart/cartAction';
import { selectCartItems } from '../../store/cart/cartSelector';

import Button, { BUTTON_TYPE_CLASSES } from '../button/Button'
import { Footer, Name, Price, ProductCardContainer } from './productCardStyles';


const ProductCard = ({product}) => {
    const { name, price, imageUrl } = product;
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems)
    
    const addProductToCart = () => dispatch(addItemToCart(cartItems, product));

    const addItemToCartHandler = () => {
        addProductToCart(product)
    }
    return (
        <ProductCardContainer>
            <img src={imageUrl} alt={name} />
            <Footer>
                <Name>{name}</Name>
                <Price>{price}</Price>
            </Footer>

            <Button onClick={addItemToCartHandler} buttonType={BUTTON_TYPE_CLASSES.inverted}>Add to cart</Button>
        </ProductCardContainer>
    )
}

export default ProductCard
