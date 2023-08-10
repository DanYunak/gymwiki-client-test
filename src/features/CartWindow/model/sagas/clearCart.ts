import { call, put, takeEvery } from '@redux-saga/core/effects'
import { message } from 'antd'
import Cookies from 'js-cookie'
import { clearCartAPI } from '../../api/clearCart'
import { CLEAR_CART, CLEAR_CART_ERROR } from '../../consts'
import { cartActions } from '../cartActions'

function* clearCart() {
    try {
        const userId = Cookies.get('userId')
        yield call(clearCartAPI, userId)
        message.success('Order successfully accepted')
        yield put(cartActions.setCartProducts([]))
        window.location.reload()
    } catch {
        yield put({ type: CLEAR_CART_ERROR, error: 'Error fetching clear cart' })
    }
}

export function* watchClearCart() {
    yield takeEvery(CLEAR_CART, clearCart)
}