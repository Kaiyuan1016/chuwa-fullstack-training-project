import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [], // [id: 'id_123', quantity: 3, productInfo: {...}] 3 quantity of item id_123 in cart
};

export const getItemQuantity = (state, itemId) => {
    if(!Array.isArray(state.items)) return 0;
    const item = state.items.find(item => item.id === itemId);
    return item !== undefined ? item.quantity : 0;
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
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
            const {id, quantityToRemove} = action.payload;
            const itemToRemoveIdx = state.items.findIndex(item => item.id === id);

            if(itemToRemoveIdx !== -1) {
                const existingItem = state.items[itemToRemoveIdx];
                if(existingItem.quantity > quantityToRemove) {
                    existingItem.quantity -= quantityToRemove;
                } else {
                    state.items.splice(itemToRemoveIdx, 1);
                }
            }
            localStorage.setItem('cart', JSON.stringify(state.items));
        }
    }
});

export const { addItemToCart, decrementItemQuantity } = cartSlice.actions;
export default cartSlice.reducer;