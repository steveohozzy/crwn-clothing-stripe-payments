import { useDispatch, useSelector } from 'react-redux';

import { selectCartItems } from '../../store/cart/cartSelector';
import { addItemToCart, removeItemFromCart, clearItemFromCart } from '../../store/cart/cartAction';

import { Arrow, BaseSpan, CheckoutItemContainer, ImageContainer, Quantity, RemoveButton, Value } from './checkoutItemStyles';


const CheckoutItem = ({checkoutItem}) => {
    const {name, quantity, imageUrl, price} = checkoutItem;

    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems)

    const ReduceQuantityHandler = () => {
        dispatch(removeItemFromCart(cartItems, checkoutItem));
    }

    const IncreaseQuantityHandler = () => {
        dispatch(addItemToCart(cartItems, checkoutItem));
    }

    const DeleteItemHandler = () => dispatch(clearItemFromCart(cartItems, checkoutItem));
        
    return (
        <CheckoutItemContainer>
            <ImageContainer>
                <img src={imageUrl} alt={name} />
            </ImageContainer>
            <BaseSpan>{name}</BaseSpan>
            <Quantity>
                <Arrow onClick={ReduceQuantityHandler}>
                    &#10094;
                </Arrow>
                <Value>
                    {quantity}
                </Value>
                <Arrow onClick={IncreaseQuantityHandler}>
                    &#10095;
                </Arrow>
            </Quantity>
            <BaseSpan>{price}</BaseSpan>
            <RemoveButton onClick={DeleteItemHandler}>&#10005;</RemoveButton>
        </CheckoutItemContainer>
    )
}

export default CheckoutItem
