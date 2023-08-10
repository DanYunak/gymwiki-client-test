import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import RemoveIcon from '@mui/icons-material/Remove'
import { Fab } from '@mui/material'
import Cookies from 'js-cookie'
import { FC, useEffect, useState } from 'react'
import { cartActions } from '../../../features/CartWindow/model/cartActions'
import { CartProductType } from '../../../features/CartWindow/model/types'
import { useAppDispatch } from '../../../redux/store'
import { instance } from '../../../shared/api/axiosInstance'
import { actions } from '../../../widgets/Products/model/productsActions'
import './CartProduct.scss'

type PropsType = {
    product: CartProductType
    setIsProductRemovedFromCart: () => void
}

export const CartProduct: FC<PropsType> = ({ product, setIsProductRemovedFromCart }) => {
    const [quantity, setQuantity] = useState(product.quantity)
    const [totalPrice, setTotalPrice] = useState(product.productId.price * quantity)

    const dispatch = useAppDispatch()

    const userId = Cookies.get('userId')

    const increaseQuantity = async () => {
        await instance.put(`/products/cart/increase/${product.productId._id}`, { userId })
        setQuantity(quantity + 1)

        dispatch(cartActions.getCartProducts())
    }

    const decreaseQuantity = async () => {
        await instance.put(`/products/cart/decrease/${product.productId._id}`, { userId })

        if (quantity === 1) {
            removeProductFromCart()
            localStorage.setItem('isCartOpen', JSON.stringify(false))
            dispatch(actions.setIsCartOpen(false))
        } else {
            setQuantity(quantity - 1)
        }

        dispatch(cartActions.getCartProducts())
        dispatch(actions.getAllProducts())
    }

    const removeProductFromCart = async () => {
        await instance.delete(`/products/cart/remove/${product.productId._id}`, { data: { userId } })
        dispatch(cartActions.removeProductFromCart(product.productId._id))
        setIsProductRemovedFromCart()

        dispatch(cartActions.getCartProducts())
        dispatch(actions.getAllProducts())
    }

    useEffect(() => {
        setTotalPrice(product.productId.price * quantity)
    }, [quantity, product.productId.price])

    return (
        <div className='cart__product'>
            <div className='cart__product_img'>
                <img src={product.productId.img} alt='product img' width='100' height='125' />
            </div>
            <div className='cart__product_info'>
                <div className='cart__product_name'>{product.productId.name}</div>
                <div className='cart__product_price'>${product.productId.price}</div>
            </div>
            <div className='cart__product_quantity'>
                <Fab size='small' aria-label='Remove' onClick={decreaseQuantity}>
                    <RemoveIcon />
                </Fab>
                <span>{quantity}</span>
                <Fab size='small' aria-label='Add' onClick={increaseQuantity}>
                    <AddIcon />
                </Fab>
            </div>
            <div className='cart__product_total_price'>${totalPrice}</div>
            <div className='cart__product_delete' onClick={removeProductFromCart}>
                <DeleteIcon />
            </div>
        </div>
    )
}