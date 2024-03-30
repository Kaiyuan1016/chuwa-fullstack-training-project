import { configureStore } from "@reduxjs/toolkit";
import productsReducer from './product/productsSlice';
import cartReducer from './cart/cartSlice';

const store = configureStore({
    reducer: {
        products: productsReducer,
        cart: cartReducer
    },
});

export default store;