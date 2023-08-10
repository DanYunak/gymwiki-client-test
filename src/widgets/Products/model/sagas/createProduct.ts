import { call, put, takeEvery } from '@redux-saga/core/effects'
import { message } from 'antd'
import { FormDataType } from '../../../../entities/Product/model/types'
import { createProductAPI } from '../../api/createProduct'
import { CREATE_PRODUCT, CREATE_PRODUCT_ERROR } from '../../consts'
import { actions } from '../productsActions'
import { actions as appActions } from '../../../../app/model/appActions'

type ActionType = {
    formData: FormDataType
}

function* createProduct(action: ActionType | any) {
    try {
        yield call(createProductAPI, action.formData)
        yield put(appActions.setIsLoading(true))
        yield put(actions.getAllProducts())
        yield put(actions.setIsCreateWindowOpen(false))
        yield put(appActions.setIsLoading(false))
        message.success('Product successfully created')
    } catch {
        yield put({ type: CREATE_PRODUCT_ERROR, error: 'Error fetching create product' })
    }
}

export function* watchCreateProduct() {
    yield takeEvery(CREATE_PRODUCT, createProduct)
}