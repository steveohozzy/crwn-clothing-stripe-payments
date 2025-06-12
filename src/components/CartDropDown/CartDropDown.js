import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Button from '../button/Button'
import CartItem from '../cartItem/CartItem'
import { selectCartItems } from '../../store/cart/cartSelector';

import './cartDropDownStyles.js'
import { CartDropDownContainer, EmptyMessage, CartItems } from './cartDropDownStyles.js';

const CartDropDown = () => {
    const cartItems = useSelector(selectCartItems);
    const navigate = useNavigate();

    const goToCheckoutHandler = () => {
        navigate('/checkout');
    }

    return (
        <CartDropDownContainer>
            <CartItems>
                {
                    cartItems.length ? 
                    cartItems.map(item =>
                        <CartItem cartItem={item} key={item.id} />
                    ) : (
                        <EmptyMessage>Your cart is empty</EmptyMessage>
                    )
                }
            </CartItems>
            <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
        </CartDropDownContainer>
    )
}

export default CartDropDown
