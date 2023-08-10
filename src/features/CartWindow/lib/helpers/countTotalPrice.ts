import { CartProductType } from '../../model/types'

export const countTotalPrice = (cartProducts: CartProductType[]) => {
    const totalPrice = cartProducts.reduce((accumulator, product) => {
        const productTotal = product.productId.price * product.quantity
        return accumulator + productTotal
    }, 0)
    
    return totalPrice
}