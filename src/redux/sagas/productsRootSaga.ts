import { all } from '@redux-saga/core/effects'
import { watchHandleAllProducts } from '../../widgets/Products/model/sagas/handleAllProducts'
import { watchAddToWishList } from '../../entities/Product/model/sagas/addToWishList'
import { watchRemoveFromWishList } from '../../entities/Product/model/sagas/removeFromWishList'
import { watchGetProductsByCategory } from '../../widgets/Products/model/sagas/getProductsByCategory'
import { watchCreateProduct } from '../../widgets/Products/model/sagas/createProduct'
import { watchDeleteProduct } from '../../widgets/Products/model/sagas/deleteProduct'

export function* productsRootSaga() {
    yield all([
        watchHandleAllProducts(),
        watchCreateProduct(),
        watchDeleteProduct(),
        watchAddToWishList(),
        watchRemoveFromWishList(),
        watchGetProductsByCategory()
    ])
}