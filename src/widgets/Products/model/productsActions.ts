import { GET_ALL_PRODUCTS, SET_ALL_PRODUCTS, ADD_TO_WISH_LIST, ADD_TO_WISH_LIST_SUCCESS, REMOVE_FROM_WISH_LIST, REMOVE_FROM_WISH_LIST_SUCCESS, SET_IS_CART_OPEN, SET_IS_ORDER_WINDOW_OPEN, GET_PRODUCTS_BY_CATEGORY, SET_IS_WISH_LIST_OPEN, SET_IS_FILTER_WINDOW_OPEN, SET_IS_CREATE_WINDOW_OPEN, CREATE_PRODUCT, DELETE_PRODUCT } from '../consts';
import { ProductType, FormDataType } from '../../../entities/Product/model/types';

export const actions = {
    getAllProducts: () => ({ type: GET_ALL_PRODUCTS } as const),
    setAllProducts: (products: any) => ({ type: SET_ALL_PRODUCTS, products } as const),

    deleteProduct: (productId: string) => ({ type: DELETE_PRODUCT, productId } as const),

    createProduct: (formData: FormDataType) => ({ type: CREATE_PRODUCT, formData } as const),

    addToWishList: (product: ProductType) => ({ type: ADD_TO_WISH_LIST, product } as const),
    addToWishListSuccess: (product: ProductType) => ({ type: ADD_TO_WISH_LIST_SUCCESS, product } as const),

    removeFromWishList: (id: string) => ({ type: REMOVE_FROM_WISH_LIST, id } as const),
    removeFromWishListSuccess: (wishList: ProductType[]) => ({ type: REMOVE_FROM_WISH_LIST_SUCCESS, wishList } as const),

    setIsCartOpen: (boolean: boolean) => ({ type: SET_IS_CART_OPEN, boolean } as const),

    setIsWishListOpen: (boolean: boolean) => ({ type: SET_IS_WISH_LIST_OPEN, boolean } as const),

    setIsOrderWindowOpen: (boolean: boolean) => ({ type: SET_IS_ORDER_WINDOW_OPEN, boolean } as const),

    setIsFilterWindowOpen: (boolean: boolean) => ({ type: SET_IS_FILTER_WINDOW_OPEN, boolean } as const),

    setIsCreateWindowOpen: (boolean: boolean) => ({ type: SET_IS_CREATE_WINDOW_OPEN, boolean } as const),

    getProductsByCategory: (category: string) => ({ type: GET_PRODUCTS_BY_CATEGORY, category } as const)
}