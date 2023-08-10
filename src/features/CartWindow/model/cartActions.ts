import { ADD_TO_CART, CLEAR_CART, GET_CART_PRODUCTS, REMOVE_PRODUCT_FROM_CART, SET_CART_PRODUCTS } from '../consts';
import { CartProductType } from './types';

export const cartActions = {
    addToCart: (productId: string) => ({ type: ADD_TO_CART, productId } as const),
    getCartProducts: () => ({ type: GET_CART_PRODUCTS } as const),
    setCartProducts: (products: CartProductType[]) => ({ type: SET_CART_PRODUCTS, products } as const),
    removeProductFromCart: (productId: string) => ({ type: REMOVE_PRODUCT_FROM_CART, productId } as const),
    clearCart: () => ({ type: CLEAR_CART } as const)
}