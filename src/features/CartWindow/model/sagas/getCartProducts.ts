import { call, put, takeEvery } from '@redux-saga/core/effects'
import { GET_CART_PRODUCTS_ERROR, GET_CART_PRODUCTS } from '../../consts'
import Cookies from 'js-cookie'
import { AxiosResponse, getCartProductAPI } from '../../api/getCartProducts'
import { cartActions } from '../cartActions'

function* getCartProducts() {
    try {
        const userId = Cookies.get('userId')
        // @ts-ignore
        const res: AxiosResponse = yield call(getCartProductAPI, userId)
        yield put(cartActions.setCartProducts(res.data))
    } catch {
        yield put({ type: GET_CART_PRODUCTS_ERROR, error: 'Error getting cart products' })
    }
}

export function* watchGetCartProducts() {
    yield takeEvery(GET_CART_PRODUCTS, getCartProducts)
}