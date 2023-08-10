import { AppStateType } from '../../../redux/store'

export const getAllProducts = (state: AppStateType) => {
    return state.productsPage.products
}

export const getIsCartOpen = (state: AppStateType) => {
    return state.productsPage.isCartOpen
}

export const getIsWishListOpen = (state: AppStateType) => {
    return state.productsPage.isWishListOpen
}

export const getWishList = (state: AppStateType) => {
    return state.productsPage.wishList
}

export const getIsOrderWindowOpen = (state: AppStateType) => {
    return state.productsPage.isOrderWindowOpen
}

export const getIsFilterWindowOpen = (state: AppStateType) => {
    return state.productsPage.isFilterWindowOpen
}

export const getIsCreateWindowOpen = (state: AppStateType) => {
    return state.productsPage.isCreateWindowOpen
}