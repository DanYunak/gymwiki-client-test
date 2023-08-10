import { ProductType } from '../../../entities/Product'
import { InferActionsTypes } from '../../../redux/store'
import { actions } from './productsActions'

const wishListString = localStorage.getItem('wishList')
const wishListParse = wishListString ? JSON.parse(wishListString) : []

const isCartOpenString = localStorage.getItem('isCartOpen')
const isCartOpenParse = isCartOpenString ? JSON.parse(isCartOpenString) : false

const isOrderWindowOpenString = localStorage.getItem('isOrderWindowOpen')
const isOrderWindowOpenParse = isOrderWindowOpenString ? JSON.parse(isOrderWindowOpenString) : false

const initialState = {
    products: [] as ProductType[],
    wishList: wishListParse as ProductType[],
    isLoading: false,
    isCartOpen: isCartOpenParse,
    isWishListOpen: false,
    isOrderWindowOpen: isOrderWindowOpenParse,
    isFilterWindowOpen: false,
    isCreateWindowOpen: false
}

type InitialStateType = typeof initialState
type ActionsTypes = InferActionsTypes<typeof actions>

export const productsReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'PRODUCTS/SET_ALL_PRODUCTS':
            return {
                ...state,
                products: [...action.products]
            }

        case 'PRODUCTS/ADD_TO_WISH_LIST_SUCCESS':
            const wishListItem = action.product

            const isProductInWishList = state.wishList.some(item => item._id === wishListItem._id)

            if (isProductInWishList) {
                return state
            }

            return {
                ...state,
                wishList: [...state.wishList, wishListItem]
            }

        case 'PRODUCTS/REMOVE_FROM_WISH_LIST_SUCCESS':
            return {
                ...state,
                wishList: action.wishList
            }

        case 'PRODUCTS/SET_IS_CART_OPEN':
            return {
                ...state,
                isCartOpen: action.boolean
            }

        case 'PRODUCTS/SET_IS_WISH_LIST_OPEN':
            return {
                ...state,
                isWishListOpen: action.boolean
            }

        case 'PRODUCTS/SET_IS_ORDER_WINDOW_OPEN':
            return {
                ...state,
                isOrderWindowOpen: action.boolean
            }

        case 'PRODUCTS/SET_IS_FILTER_WINDOW_OPEN':
            return {
                ...state,
                isFilterWindowOpen: action.boolean
            }

        case 'PRODUCTS/SET_IS_CREATE_WINDOW_OPEN':
            return {
                ...state,
                isCreateWindowOpen: action.boolean
            }

        default: return state
    }
}