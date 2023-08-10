const wishListString = localStorage.getItem('wishList')

export const wishListParse = wishListString ? JSON.parse(wishListString) : []