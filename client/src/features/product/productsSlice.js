import {
    createSlice,
    createAsyncThunk
} from '@reduxjs/toolkit';
import axios from 'axios';
 
const initialState = {
    products:[],
    error:null,
    isAuthenticated: false,
    status: 'idle'
};

export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
    try {
        const response = await axios.get('http://localhost:8080/products');
        return response.data;
    } catch(err) {
        //TODO: error handler
        console.error('Error fetching products', err);
    }
})

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        // selectProduct: (state, action) => {
            
        // }
    },
    extraReducers: builder => {
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.products = action.payload;
            state.status = "succeeded";
        });
        builder.addCase(fetchProducts.pending, (state) => {
            state.status = "pending";
        });
        builder.addCase(fetchProducts.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        });
    }
});

export const selectProductById = (state, productId) => {
    console.log(productId);
    const product = state.products.products.find((product) => product._id === productId);
    console.log(product);
    return product;
}

export default productsSlice.reducer;