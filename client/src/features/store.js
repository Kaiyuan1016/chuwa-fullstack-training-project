import { configureStore } from "@reduxjs/toolkit";
import productsReducer from './product/productsSlice';
import cartReducer from './cart/cartSlice';
import userSlice from "./userSlice";

const store = configureStore({
    reducer: {
        products: productsReducer,
        cart: cartReducer,
        user: userSlice
    },
});

export default store;