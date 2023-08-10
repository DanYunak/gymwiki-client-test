import { AppStateType } from '../../../redux/store'

export const getCartProducts = (state: AppStateType) => {
    return state.cart.cartProducts    
}