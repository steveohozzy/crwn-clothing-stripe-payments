import { createContext, useReducer } from "react";
import {createAction} from '../utils/reducer/reducer.utils'
// before reducer and unused vars
//import { createContext, useEffect, useState, useReducer } from "react"

const addCartItem = (cartItems, productToAdd) => {
    //find if cartItems contains productToAdd
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToAdd.id
    );

    //If found, imcrement quantity
    if(existingCartItem) {
        return (
            cartItems.map((cartItem) => 
                cartItem.id === productToAdd.id
                    ? {...cartItem, quantity: cartItem.quantity + 1}
                    : cartItem
            )
        )
    }

    //return new array with modified cartItems/new cart item
    return [
        ...cartItems, {...productToAdd, quantity: 1}
    ]
}

const removeCartItem = (cartItems, cartItemToRemove) => {
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === cartItemToRemove.id
    );

    //If quantity was 1 remove as it is now 0
    if(existingCartItem.quantity === 1) {
        return (
            cartItems.filter((cartItem) => 
                cartItem.id !== cartItemToRemove.id)
        )
    }

    // if quantity was more than 1 reduce quantity
    return (
        cartItems.map((cartItem) => 
            cartItem.id === cartItemToRemove.id
                ? {...cartItem, quantity: cartItem.quantity - 1}
                : cartItem
        )
    )
}

const deleteCartItem = (cartItems, cartItemToDelete) => {
    return (
        cartItems.filter((cartItem) => 
            cartItem.id !== cartItemToDelete.id)
    )
}

// as the actual value you want to access
export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    cartCount: 0,
    removeItemFromCart: () => {},
    deleteItemFromCart: () => {},
    cartTotal: 0
})

const CART_ACTION_TYPES = {
    SET_CART_ITEMS: 'SET_CART_ITEMS',
    SET_IS_CART_OPEN: 'SET_IS_CART_OPEN'
}

const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0
};

const cartReducer = (state, action) => {
    const { type, payload } = action;

    switch(type) {
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                ...payload
            }

        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return {
                ...state,
                isCartOpen: payload
            }
            
        default: 
            throw new Error (`unhandle type of ${type} in cartReducer`)
    }
}

export const CartProvider = ({children}) => {
    // before reducer work
    // const [isCartOpen, setIsCartOpen] = useState(false);
    // const [cartItems, setCartItems] = useState([]);
    // const [cartCount, setCartCount] = useState(0);
    // const [cartTotal, setCartTotal] = useState(0);

    // useEffect(() => {
    //     const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
    //     setCartCount(newCartCount)
    // }, [cartItems])

    // useEffect(() => {
    //     const newCartTotal = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0)
    //     setCartTotal(newCartTotal)
    // }, [cartItems])

    const [{cartItems, isCartOpen, cartCount, cartTotal}, dispatch] = useReducer(cartReducer, INITIAL_STATE);

    const updateCartItemReducer = (newCartItems) => {
        const newCartCount = newCartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
        
        const newCartTotal = newCartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0);

        dispatch(
            createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
                cartItems: newCartItems,
                cartTotal: newCartTotal,
                cartCount: newCartCount
            })
        )
    }

    const addItemToCart = (productToAdd) => {
        const newCartItems = addCartItem(cartItems, productToAdd);
        updateCartItemReducer(newCartItems);
    }

    const removeItemFromCart = (productToRemove) => {
        const newCartItems = removeCartItem(cartItems, productToRemove);
        updateCartItemReducer(newCartItems);
    }

    const deleteItemFromCart = (productToDelete) => {
        const newCartItems = deleteCartItem(cartItems, productToDelete);
        updateCartItemReducer(newCartItems);
    }

    const setIsCartOpen = (bool) => {
        dispatch(
            createAction( CART_ACTION_TYPES.SET_IS_CART_OPEN, bool )
        )
    }

    // before reducer changes
    // const addItemToCart = (productToAdd) => {
    //     setCartItems(addCartItem(cartItems, productToAdd))
    // }

    // const removeItemFromCart = (productToRemove) => {
    //     setCartItems(removeCartItem(cartItems, productToRemove))
    // }

    // const deleteItemFromCart = (productToDelete) => {
    //     setCartItems(deleteCartItem(cartItems, productToDelete))
    // }

    const value = { isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount, removeItemFromCart, deleteItemFromCart, cartTotal };
    
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}