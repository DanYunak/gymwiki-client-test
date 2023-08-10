import { put, takeEvery } from '@redux-saga/core/effects'
import { REMOVE_FROM_WISH_LIST, REMOVE_FROM_WISH_LIST_ERROR } from '../../../../widgets/Products/consts'
import { ProductType } from '../types'
import { actions } from '../../../../widgets/Products/model/productsActions'

type ActionType = {
    id: number
}

function* removeFromWishList(action: ActionType | any) {
    try {
        const wishListString = localStorage.getItem('wishList')
        const wishListParse = wishListString ? JSON.parse(wishListString) : []

        const item = wishListParse.find((item: ProductType) => item._id === action.id)

        if (item) {
            const updatedWishList = wishListParse.filter((item: ProductType) => item._id !== action.id)
            localStorage.setItem('wishList', JSON.stringify(updatedWishList))
            yield put(actions.removeFromWishListSuccess(updatedWishList))
        }
    } catch {
        yield put({ type: REMOVE_FROM_WISH_LIST_ERROR, error: 'Error fetching removing from wish list' })
    }
}

export function* watchRemoveFromWishList() {
    yield takeEvery(REMOVE_FROM_WISH_LIST, removeFromWishList)
}