import { CartProductType } from './types'
import { InferActionsTypes } from '../../../redux/store'
import { cartActions } from './cartActions'

const initialState = {
    cartProducts: [] as CartProductType[]
}

type InitialStateType = typeof initialState
type ActionsTypes = InferActionsTypes<typeof cartActions>

export const cartReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch(action.type) {
        case 'CART/SET_CART_PRODUCTS':
            return {
                ...state,
                cartProducts: [...action.products]
            }

        case 'CART/REMOVE_PRODUCT_FROM_CART':
            return {
                ...state,
                cartProducts: state.cartProducts.filter(product => product.productId._id !== action.productId)
            }

        default: return state
    }
}