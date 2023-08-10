import { all } from '@redux-saga/core/effects'
import { watchAddToCart } from '../../features/CartWindow/model/sagas/addToCart'
import { watchGetCartProducts } from '../../features/CartWindow/model/sagas/getCartProducts'
import { watchClearCart } from '../../features/CartWindow/model/sagas/clearCart'

export function* cartRootSaga() {
    yield all([
        watchAddToCart(),
        watchGetCartProducts(),
        watchClearCart()
    ])
}