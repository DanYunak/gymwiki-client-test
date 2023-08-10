import DeleteIcon from '@mui/icons-material/Delete'
import { FC } from 'react'
import { useAppDispatch } from '../../../redux/store'
import { actions } from '../../../widgets/Products/model/productsActions'
import { ProductType } from '../../Product/model/types'
import './WishListProduct.scss'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { cartActions } from '../../../features/CartWindow/model/cartActions'
import { useSelector } from 'react-redux'
import { getCartProducts } from '../../../features/CartWindow/model/cartSelectors'
import { Button } from '@mui/material'
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout'

type PropsType = {
    product: ProductType
    handleClose: () => void
    handleOpenCartWindow: () => void
}

export const WishListProduct: FC<PropsType> = ({ product, handleClose, handleOpenCartWindow }) => {
    const cartProducts = useSelector(getCartProducts)

    const dispatch = useAppDispatch()

    const removeProductFromWishList = () => {
        dispatch(actions.removeFromWishList(product._id))
    }

    const addToCart = () => {
        dispatch(cartActions.addToCart(product._id))
        handleOpenCartWindow()
        handleClose()
    }

    const openCart = () => {
        handleOpenCartWindow()
    }

    return (
        <div className='wish__product'>
            <div className='wish__product_img'>
                <img src={product.img} alt='product img' width='100' height='125' />
            </div>
            <div className='wish__product_name'>{product.name}</div>
            <div className='wish__product_price'>{product.price}$</div>
            <div className='wish__product_delete' onClick={removeProductFromWishList}>
                <DeleteIcon />
            </div>
        </div>
    )
}