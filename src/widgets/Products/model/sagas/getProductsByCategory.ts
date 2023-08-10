import { call, put, takeEvery } from '@redux-saga/core/effects'
import { actions as appActions } from '../../../../app/model/appActions'
import { AxiosResponse, getProductsByCategoryAPI } from '../../api/getProductsByCategory'
import { GET_PRODUCTS_BY_CATEGORY, GET_PRODUCTS_BY_CATEGORY_ERROR } from '../../consts'
import { actions } from '../productsActions'

type ActionType = {
    category: string
}

function* getProductsByCategory(action: ActionType | any) {
    try {
        const res: AxiosResponse = yield call(getProductsByCategoryAPI, action.category)
        yield put(appActions.setIsLoading(true))
        yield put(actions.setAllProducts(res.data))
        yield put(appActions.setIsLoading(false))
    } catch {
        yield put({ type: GET_PRODUCTS_BY_CATEGORY_ERROR, error: 'Error fetching getting products by category' })
    }
}

export function* watchGetProductsByCategory() {
    yield takeEvery(GET_PRODUCTS_BY_CATEGORY, getProductsByCategory)
}