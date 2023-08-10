import { put, takeEvery } from '@redux-saga/core/effects'
import { ADD_TO_WISH_LIST, ADD_TO_WISH_LIST_ERROR } from '../../../../widgets/Products/consts'
import { actions } from '../../../../widgets/Products/model/productsActions'
import { ProductType } from '../types'

type ActionType = {
    product: ProductType
}

function* addToWishList(action: ActionType | any) {
    try {
        const newWishListItem = action.product

        const wishListString = localStorage.getItem('wishList')
        const wishListParse = wishListString ? JSON.parse(wishListString) : []

        const isProductInWishList = wishListParse.some((item: ProductType) => item._id === newWishListItem._id)

        if (isProductInWishList) {
            yield put(actions.addToWishListSuccess(newWishListItem))
            return
        }

        const updatedWishList = [...wishListParse, newWishListItem]

        localStorage.setItem('wishList', JSON.stringify(updatedWishList))

        yield put(actions.addToWishListSuccess(newWishListItem))
    } catch {
        yield put({ type: ADD_TO_WISH_LIST_ERROR, error: 'Error fetching adding to wish list' })
    }
}

export function* watchAddToWishList() {
    yield takeEvery(ADD_TO_WISH_LIST, addToWishList)
}