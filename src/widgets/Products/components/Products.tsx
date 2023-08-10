import AddBoxIcon from '@mui/icons-material/AddBox'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FilterAlt from '@mui/icons-material/FilterAlt'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { Button, Pagination } from '@mui/material'
import { FC, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Product, ProductType } from '../../../entities/Product'
import { FormDataType } from '../../../entities/Product/model/types'
import { CartWindow } from '../../../features/CartWindow'
import { cartActions } from '../../../features/CartWindow/model/cartActions'
import { CreateProduct } from '../../../features/CreateProduct/components/CreateProduct'
import { DeleteProduct } from '../../../features/DeleteProduct'
import { FilterWindow } from '../../../features/FilterWindow/components/FilterWindow'
import { OrderWindow } from '../../../features/OrderWindow'
import { ProductCategories } from '../../../features/ProductCategories/components/ProductCategories'
import { WishList } from '../../../features/WishList'
import { useAppDispatch } from '../../../redux/store'
import { actions } from '../model/productsActions'
import { getAllProducts, getIsCartOpen, getIsCreateWindowOpen, getIsFilterWindowOpen, getIsOrderWindowOpen, getIsWishListOpen } from '../model/productsSelectors'
import './Products.scss'

export const Products: FC = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [isProductRemovedFromCart, setIsProductRemovedFromCart] = useState(false)
    const [deletedProduct, setDeletedProduct] = useState<ProductType | null>(null)
    const [isDeleteProductWindowOpen, setIsDeleteProductWindowOpen] = useState(false)

    const isCartOpen = useSelector(getIsCartOpen)
    const products = useSelector(getAllProducts)
    const isOrderWindowOpen = useSelector(getIsOrderWindowOpen)
    const isWishListOpen = useSelector(getIsWishListOpen)
    const isFilterWindowOpen = useSelector(getIsFilterWindowOpen)
    const isCreateWindowOpen = useSelector(getIsCreateWindowOpen)

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(actions.getAllProducts())
        dispatch(cartActions.getCartProducts())
    }, [])

    const handleCart = () => {
        if (!isCartOpen) {
            localStorage.setItem('isCartOpen', JSON.stringify(true))
            dispatch(actions.setIsCartOpen(true))
        } else {
            localStorage.setItem('isCartOpen', JSON.stringify(false))
            dispatch(actions.setIsCartOpen(false))
        }
    }

    const handleCloseCartWindow = () => {
        localStorage.setItem('isCartOpen', JSON.stringify(false))
        dispatch(actions.setIsCartOpen(false))
    }

    const handleOpenCartWindow = () => {
        localStorage.setItem('isCartOpen', JSON.stringify(true))
        dispatch(actions.setIsCartOpen(true))
    }

    const removeProductFromCart = () => {
        setIsProductRemovedFromCart(true)
    }

    const handleCreateProductWindow = () => {
        dispatch(actions.setIsCreateWindowOpen(!isCreateWindowOpen))
    }

    const handleFilterWIndow = () => {
        dispatch(actions.setIsFilterWindowOpen(!isFilterWindowOpen))
    }

    const onSubmit = async (formData: FormDataType) => {
        dispatch(actions.createProduct(formData))
    }

    const handleDeleteProduct = (product: ProductType) => {
        setDeletedProduct(product)
        setIsDeleteProductWindowOpen(true)
    }

    const handleCloseDeleteProductWindow = () => {
        setIsDeleteProductWindowOpen(false)
    }

    const onSubmitDelete = async () => {
        try {
            if (deletedProduct) {
                dispatch(actions.deleteProduct(deletedProduct._id))
                setIsDeleteProductWindowOpen(false)
                if (currentProducts.length === 1) {
                    setCurrentPage(currentPage - 1)
                }
            }
        } catch (e) {
            console.error(e)
        }
    }

    const handleWishListWindow = () => {
        dispatch(actions.setIsWishListOpen(!isWishListOpen))
    }

    const backToProducts = () => {
        dispatch(actions.getAllProducts())
    }

    const changeCurrentPage = () => {
        setCurrentPage(1)
    }

    const productsPerPage = 12

    const indexOfLastProduct = currentPage * productsPerPage
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct)

    const pageCount = Math.ceil(products.length / productsPerPage)

    return (
        <div className='products'>
            <div className='products__content'>
                <ProductCategories changeCurrentPage={changeCurrentPage} />
                {products.length !== 0
                    ? <div className='products__list'>
                        {currentProducts
                            .map((product: ProductType) => (
                                <Product key={product._id} product={product}
                                    handleOpenCartWindow={handleOpenCartWindow}
                                    isProductRemovedFromCart={isProductRemovedFromCart}
                                    handleDeleteProduct={handleDeleteProduct}
                                />
                            ))}
                    </div>
                    : <div className='products__list_empty'>
                        <span>There are no products of this type</span>
                        <Button variant='contained' onClick={backToProducts}>Back</Button>
                    </div>
                }
                <div className='products__actions'>
                    <div className='products__cart' onClick={handleCart}>
                        <ShoppingCartIcon />
                    </div>
                    <div className='create__product' onClick={handleCreateProductWindow}>
                        <AddBoxIcon />
                    </div>
                    <div className='wish__list' onClick={handleWishListWindow}>
                        <FavoriteIcon />
                    </div>
                    <div className='filter' onClick={handleFilterWIndow}>
                        <FilterAlt />
                    </div>
                </div>
            </div>
            {products.length !== 0 &&
                <div className='pagination'>
                    <Pagination count={pageCount}
                        color='primary'
                        onChange={(event, page) => setCurrentPage(page)}
                    />
                </div>
            }
            {isCartOpen && <CartWindow handleClose={handleCloseCartWindow} setIsProductRemovedFromCart={removeProductFromCart} />}
            {isCreateWindowOpen && <CreateProduct onSubmit={onSubmit} />}
            {isDeleteProductWindowOpen && <DeleteProduct product={deletedProduct} handleCloseWindow={handleCloseDeleteProductWindow} onSubmit={onSubmitDelete} />}
            {isWishListOpen && <WishList handleOpenCartWindow={handleOpenCartWindow} />}
            {isOrderWindowOpen && <OrderWindow />}
            {isFilterWindowOpen && <FilterWindow />}
        </div>
    )
}