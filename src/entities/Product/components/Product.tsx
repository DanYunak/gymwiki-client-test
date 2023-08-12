import DeleteIcon from '@mui/icons-material/Delete'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout'
import { Button } from '@mui/material'
import { FC, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { cartActions } from '../../../features/CartWindow/model/cartActions'
import { getCartProducts } from '../../../features/CartWindow/model/cartSelectors'
import { getIsLoggedIn, getUsername } from '../../../features/User/model/userSelectors'
import { useAppDispatch } from '../../../redux/store'
import { actions } from '../../../widgets/Products/model/productsActions'
import { ProductType } from '../model/types'
import './Product.scss'

type PropsType = {
    product: ProductType
    handleOpenCartWindow: () => void
    isProductRemovedFromCart: boolean
    handleDeleteProduct: (product: ProductType) => void
}

export const Product: FC<PropsType> = ({ product, handleOpenCartWindow, isProductRemovedFromCart, handleDeleteProduct }) => {
    const dispatch = useAppDispatch()

    const isLoggedIn = useSelector(getIsLoggedIn)
    const cartProducts = useSelector(getCartProducts)
    const username = useSelector(getUsername)

    const { name, category, img, price, description } = product

    const [isHovered, setIsHovered] = useState(false)
    const [isActiveWish, setIsActiveWish] = useState(false)
    const [isAddedToCart, setIsAddedToCart] = useState(false)

    const handleMouseEnterProduct = () => {
        setIsHovered(true)
    }

    const handleMouseLeaveProduct = () => {
        setIsHovered(false)
    }

    const handleAddToWishList = () => {
        if (isLoggedIn) {
            setIsActiveWish(true)
            dispatch(actions.addToWishList(product))
        }
    }

    const handleRemoveFromWishList = () => {
        setIsActiveWish(false)
        dispatch(actions.removeFromWishList(product._id))
    }

    const wishListString = localStorage.getItem('wishList')
    const wishListParse = wishListString ? JSON.parse(wishListString) : []

    const isProductInWishList = wishListParse.some((item: ProductType) => item._id === product._id)

    const addToCart = () => {
        setIsAddedToCart(true)
        dispatch(cartActions.addToCart(product._id))
    }

    const openCart = () => {
        handleOpenCartWindow()
    }

    const findProduct = () => {
        return cartProducts.some(cartProduct => cartProduct.productId._id === product._id)
    }

    const isProductInCart = findProduct()

    useEffect(() => { setIsAddedToCart(false) }, [isProductRemovedFromCart])

    useEffect(() => {
        dispatch(cartActions.getCartProducts())
    }, [isLoggedIn, username])

    const handleDeleteClick = () => {
        handleDeleteProduct(product)
    }

    return (
        <div className='product' onMouseEnter={handleMouseEnterProduct}
            onMouseLeave={handleMouseLeaveProduct}>
            <div className='product__img'>
                <img src={img} alt='product img' width='125' height='150' />
            </div>
            {window.innerWidth >= 768
                ? <>
                    {isHovered && isLoggedIn &&
                        <div className='wish__item'>
                            {isProductInWishList || isActiveWish
                                ? <FavoriteIcon onClick={handleRemoveFromWishList} style={{ color: 'orange' }} />
                                : <FavoriteIcon onClick={handleAddToWishList} />}
                        </div>
                    }
                </>
                : <>
                    <div className='wish__item'>
                        {isProductInWishList || isActiveWish
                            ? <FavoriteIcon onClick={handleRemoveFromWishList} style={{ color: 'orange' }} />
                            : <FavoriteIcon onClick={handleAddToWishList} />}
                    </div>
                </>
            }
            <div className='product__name'>{name}</div>
            <div className='product__description'>{description}</div>
            <div className='product__price'>${price}</div>
            {window.innerWidth >= 768
                ? <>
                    {isHovered && isLoggedIn &&
                        <div className='product__buy'>
                            {isProductInCart || isAddedToCart
                                ? <Button variant='contained' size='large' onClick={openCart} style={{ backgroundColor: '#00a046' }}>
                                    <ShoppingCartCheckoutIcon />
                                </Button>
                                : <Button variant='contained' size='large' onClick={addToCart} className='add__cart'
                                    startIcon={<ShoppingCartIcon />}>
                                    Add to cart
                                </Button>
                            }
                        </div>
                    }
                </>
                : <>
                    {isLoggedIn &&
                        <div className='product__buy'>
                            {isProductInCart || isAddedToCart
                                ? <Button variant='contained' size='large' onClick={openCart} style={{ backgroundColor: '#00a046' }}>
                                    <ShoppingCartCheckoutIcon />
                                </Button>
                                : <Button variant='contained' size='large' onClick={addToCart} className='add__cart'
                                    startIcon={<ShoppingCartIcon />}>
                                    Add to cart
                                </Button>
                            }
                        </div>
                    }
                </>
            }
            <div className='product__delete'>
                <DeleteIcon onClick={handleDeleteClick} />
            </div>
        </div>
    )
}