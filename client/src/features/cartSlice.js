import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCart, updateCart } from "../services/user";

const initialState = {
    items: [], // [id: 'id_123', quantity: 3, productInfo: {...}] 3 quantity of item id_123 in cart
};

export const getItemQuantity = (state, itemId) => {
    if(!Array.isArray(state.items)) return 0;
    const item = state.items.find(item => item.id === itemId);
    return item !== undefined ? item.quantity : 0;
};

export const fetchCart = (userId) => async (dispatch) => {
    try {
      const cartData = await getCart(userId); // assuming this function fetches cart data from server
      dispatch(initializeCart(cartData));
    } catch (error) {
      console.log('Error fetch cart:', error);
      return undefined;
    }
};

export const updateCartInDatabase = createAsyncThunk(
    'cart/updateCartInDatabase',
    async (_, { getState, dispatch}) => {
      const state = getState();
      const cartItems = state.cart.items.map((item) => ({
          productId: item.id,
          quantity: item.quantity
        }));
      const userId = state.user.user.id;
      try {
        const response = await updateCart(userId, cartItems);
        return response.data;
      } catch(err) {
        throw err;
      }
    }
);

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        initializeCart(state, action) {
            state.items = action.payload;
        },
        addItemToCart(state, action) {
            const newItem = action.payload;
            const existingItem = state.items.find(item => item.id === newItem.id);
            if(existingItem) {
                existingItem.quantity += newItem.quantity;
            } else {
                state.items.push(newItem);
            }
            localStorage.setItem('cart', JSON.stringify(state.items));
        },
        decrementItemQuantity(state, action) {
            const {id, quantity, productInfo} = action.payload;
            const itemToRemoveIdx = state.items.findIndex(item => item.id === id);

            if(itemToRemoveIdx !== -1) {
                const existingItem = state.items[itemToRemoveIdx];
                if(existingItem.quantity > quantity) {
                    existingItem.quantity -= quantity;
                    if(existingItem.quantity <= 0) {
                        state.items.splice(itemToRemoveIdx, 1);
                    }
                } else {
                    state.items.splice(itemToRemoveIdx, 1);
                }
            }
            localStorage.setItem('cart', JSON.stringify(state.items));
        },
        removeItemFromCart(state, action) {
            const {id} = action.payload;
            const itemToRemoveIdx = state.items.findIndex(item => item.id === id);
            if(itemToRemoveIdx !== -1) {
                state.items.splice(itemToRemoveIdx, 1);
            }
            localStorage.setItem('cart', JSON.stringify(state.items));
        }
    }
});

export const { initializeCart, addItemToCart, decrementItemQuantity, removeItemFromCart } = cartSlice.actions;
export default cartSlice.reducer;