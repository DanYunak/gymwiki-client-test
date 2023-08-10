import { FC } from 'react'
import { ProductCategory } from '../../../entities/ProductCategory'
import { categories } from '../model/categories'
import './ProductCategories.scss'

type PropsType = {
    changeCurrentPage: () => void
}

export const ProductCategories: FC<PropsType> = ({ changeCurrentPage }) => {
    return (
        <div className='product__categories'>
            <div className='product__categories_list'>
                {categories.map(category => (
                    <ProductCategory category={category} changeCurrentPage={changeCurrentPage} />
                ))}
            </div>
        </div>
    )
}