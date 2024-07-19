import { createContext, useState } from "react";

export const CartContext = createContext({
    isCartOpen: 0, 
    setIsCartOpen: () => {},
    cartItems: [],
    addItemsToCart: () => {}
})
g
export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false)

    const value = { isCartOpen, setIsCartOpen }
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}