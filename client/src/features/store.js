import { configureStore } from "@reduxjs/toolkit";
import productsReducer from './productsSlice';
import cartReducer from './cartSlice';
import userReducer  from "./userSlice";

const loadCartItemsFromLocalStorage = () => {
    try {
      const serializedCartItems = localStorage.getItem('cart');
      if (serializedCartItems === null || serializedCartItems === '[]') {
        return undefined; 
      }
      return JSON.parse(serializedCartItems);
    } catch (err) {
      return undefined;
    }
};
const loadedCartItems = loadCartItemsFromLocalStorage();
const preloadedState = loadedCartItems ? { cart: { items: loadedCartItems } } : {};

const store = configureStore({
    reducer: {
        products: productsReducer,
        cart: cartReducer,
        user: userReducer 
    },
    // preloadedState: preloadedState,
});

export default store;