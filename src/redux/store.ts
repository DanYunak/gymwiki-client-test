import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { combineReducers } from 'redux'
import { rootSaga } from './sagas/rootSaga'
import createSagaMiddleware from 'redux-saga'
import { exercisesReducer } from '../widgets/Exercises/model/exercisesReducer'
import { productsReducer } from '../widgets/Products/model/productsReducer'
import { userReducer } from '../features/User/model/userReducer'
import { cartReducer } from '../features/CartWindow/model/cartReducer'
import { appReducer } from '../app/model/appReducer'

const rootReducer = combineReducers({
    app: appReducer,
    exercisesPage: exercisesReducer,
    productsPage: productsReducer,
    user: userReducer,
    cart: cartReducer
})

type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>

export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()

export type InferActionsTypes<T> = T extends { [key: string]: (...args: any[]) => infer U } ? U : never

const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
    devTools: false
})

sagaMiddleware.run(rootSaga)