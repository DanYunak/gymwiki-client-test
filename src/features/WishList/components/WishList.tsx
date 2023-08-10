import { FC } from 'react'
import { Close } from '../../../entities/Close/components/Close'
import { ProductType } from '../../../entities/Product'
import './WishList.scss'
import { useSelector } from 'react-redux'
import { getWishList } from '../../../widgets/Products/model/productsSelectors'
import { WishListProduct } from '../../../entities/WishListProduct/components/WishListProduct'
import { useAppDispatch } from '../../../redux/store'
import { actions } from '../../../widgets/Products/model/productsActions'

type PropsType = {
    handleOpenCartWindow: () => void
}

export const WishList: FC<PropsType> = ({ handleOpenCartWindow }) => {
    const dispatch = useAppDispatch()

    const wishList = useSelector(getWishList)

    const handleClose = () => {
        dispatch(actions.setIsWishListOpen(false))
    }

    return (
        <div className='wish__list_window'>
            <span>Wish List</span>
            <div onClick={handleClose}>
                <Close />
            </div>
            {wishList.length !== 0
                ? <div className='wish__list_products'>
                    {wishList
                        .map((product: ProductType) => (
                            <WishListProduct
                                product={product}
                                handleClose={handleClose}
                                handleOpenCartWindow={handleOpenCartWindow}
                            />
                        ))
                    }
                </div>
                : <div className='wish__list_empty'>The wish list is empty</div>
            }
        </div>
    )
}