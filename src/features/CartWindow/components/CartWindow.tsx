import { Button } from '@mui/material'
import { FC, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { CartProduct } from '../../../entities/CartProduct'
import { Close } from '../../../entities/Close/components/Close'
import { useAppDispatch } from '../../../redux/store'
import { actions } from '../../../widgets/Products/model/productsActions'
import { countTotalPrice } from '../lib/helpers/countTotalPrice'
import { cartActions } from '../model/cartActions'
import { getCartProducts } from '../model/cartSelectors'
import { CartProductType } from '../model/types'
import './CartWindow.scss'

type PropsType = {
    handleClose: () => void
    setIsProductRemovedFromCart: () => void
}

export const CartWindow: FC<PropsType> = ({ handleClose, setIsProductRemovedFromCart }) => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(cartActions.getCartProducts())
    }, [])

    const cartProducts = useSelector(getCartProducts)

    const order = () => {
        localStorage.setItem('isOrderWindowOpen', JSON.stringify(true))
        localStorage.setItem('isCartOpen', JSON.stringify(false))
        dispatch(actions.setIsOrderWindowOpen(true))
        dispatch(actions.setIsCartOpen(false))
    }

    const [totalPrice, setTotalPrice] = useState(countTotalPrice(cartProducts))

    useEffect(() => {
        setTotalPrice(countTotalPrice(cartProducts))
    }, [cartProducts])

    return (
        <div className='cart__window'>
            <div onClick={handleClose}>
                <Close />
            </div>
            {cartProducts.length !== 0
                ? <div className='cart__products_list'>
                    {cartProducts
                        .map((product: CartProductType) => (
                            <CartProduct product={product} setIsProductRemovedFromCart={setIsProductRemovedFromCart} />
                        ))}
                </div>
                : <div className='cart__empty'>The cart is empty</div>
            }
            {cartProducts.length !== 0 &&
                <div className='order'>
                    <Button variant='contained' onClick={order}>Order</Button>
                </div>
            }
            <div className='total__price'>${totalPrice}</div>
        </div>
    )
}