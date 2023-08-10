import { all, fork } from '@redux-saga/core/effects'
import { exercisesRootSaga } from './exercisesRootSaga'
import { productsRootSaga } from './productsRootSaga'
import { userRootSaga } from './userRootSaga'
import { cartRootSaga } from './cartRootSaga'

export function* rootSaga() {
    yield all([
        fork(exercisesRootSaga),
        fork(productsRootSaga),
        fork(userRootSaga),
        fork(cartRootSaga)
    ])
}