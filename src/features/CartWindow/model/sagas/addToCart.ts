import { call, put, takeEvery } from '@redux-saga/core/effects'
import { ADD_TO_CART_ERROR, ADD_TO_CART } from '../../consts'
import { addToCartAPI } from '../../api/addToCart'
import Cookies from 'js-cookie'

type ActionType = {
    productId: number
}

function* addToCart(action: ActionType | any) {
    try {
        const userId = Cookies.get('userId')
        // @ts-ignore
        yield call(addToCartAPI, userId, action.productId)
    } catch {
        yield put({ type: ADD_TO_CART_ERROR, error: 'Error fetching adding to cart' })
    }
}

export function* watchAddToCart() {
    yield takeEvery(ADD_TO_CART, addToCart)
}