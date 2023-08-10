import { call, put, takeEvery } from '@redux-saga/core/effects'
import { message } from 'antd'
import { deleteProductAPI } from '../../api/deleteProduct'
import { DELETE_PRODUCT, DELETE_PRODUCT_ERROR } from '../../consts'
import { actions } from '../productsActions'

type ActionType = {
    productId: string
}

function* deleteProduct(action: ActionType | any) {
    try {
        yield call(deleteProductAPI, action.productId)
        yield put(actions.getAllProducts())
        message.success('Product successfully deleted')
    } catch {
        yield put({ type: DELETE_PRODUCT_ERROR, error: 'Error fetching delete product' })
    }
}

export function* watchDeleteProduct() {
    yield takeEvery(DELETE_PRODUCT, deleteProduct)
}