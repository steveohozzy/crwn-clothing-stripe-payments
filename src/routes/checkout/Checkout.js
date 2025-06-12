import { useSelector } from 'react-redux';

import { selectCartItems, selectCartTotal } from '../../store/cart/cartSelector';

import CheckoutItem from '../../components/checkoutItem/CheckoutItem';
import { CheckoutContainer, CheckoutHeader, HeaderBlock, Total } from './checkoutStyles';

const Checkout = () => {
    const cartItems = useSelector(selectCartItems)
    const cartTotal = useSelector(selectCartTotal)

    return (
        <CheckoutContainer>
            <CheckoutHeader>
                <HeaderBlock>
                    <span>Product</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Description</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Quantity</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Price</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Remove</span>
                </HeaderBlock>
            </CheckoutHeader>
            {cartItems.map(item =>
                <CheckoutItem checkoutItem={item} key={item.id} />
            )}
            <Total>Total: ${cartTotal}</Total>
        </CheckoutContainer>
    )
}

export default Checkout
