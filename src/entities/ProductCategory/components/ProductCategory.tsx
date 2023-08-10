import { FC } from 'react'
import { CategoryType } from '../../../features/ProductCategories'
import './ProductCategory.scss'
import axios from 'axios'
import { useAppDispatch } from '../../../redux/store'
import { actions } from '../../../widgets/Products/model/productsActions'

type PropsType = {
    category: CategoryType
    changeCurrentPage: () => void
}


export const ProductCategory: FC<PropsType> = ({ category, changeCurrentPage }) => {
    const dispatch = useAppDispatch()

    const getProductsByCategory = () => {
        dispatch(actions.getProductsByCategory(category.name))
        changeCurrentPage()
    }

    return (
        <div className='product__category' onClick={getProductsByCategory}>
            <div className='product__category_img'>
                <img src={category.img} alt='category img' />
            </div>
            <div className='product__category_name'>{category.name}</div>
        </div>
    )
}