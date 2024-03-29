import {
    createSlice,
    createAsyncThunk
} from '@reduxjs/toolkit';
import axios from 'axios';
 
const initialState = {
    products:[],
    product:null,
    error:null,
    isAuthenticated: false,
    status: 'idle'
};

export const fetchProducts = createAsyncThunk("products/fetchProducts", async ({sortBy='createTime', sortOrder='asc', page=1, pageSize=10}) => {
    try {
        const response = await axios.get('http://localhost:8080/products', {
            params: {
                sortBy,
                sortOrder,
                page,
                pageSize
            }
        });
        // console.log('this is response ', response.data);
        return response.data;
    } catch(err) {
        //TODO: error handler
        console.error('Error fetching products', err);
    }
})

export const fetchProductById = createAsyncThunk("products/fetchProductById", async (productId) => {
    try {
        const response = await axios.get(`http://localhost:8080/products/${productId}`);
        return response.data;
    } catch(err) {
        //TODO: error handler
        console.error('Error fetching products', err);
    }
});

export const updateProduct = createAsyncThunk("products/updateProduct", async ({productId, updatedData}) => {
    try {
        const response = await axios.put(`http://localhost:8080/products/${productId}`, updatedData);
        return response.data;
    } catch (err) {
        console.error('Error updating product', err);
    }
});

export const createProduct = createAsyncThunk("products/createProduct", async (product) => {
    try {
        const response = await axios.post(`http://localhost:8080/products/`, product);
        return response.data;
    } catch (err) {
        console.error('Error updating product by ID', err);
    }
});

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
        .addCase(fetchProducts.fulfilled, (state, action) => {
            state.products = action.payload;
            state.status = "succeeded";
        })
        .addCase(fetchProducts.pending, (state) => {
            state.status = "pending";
        })
        .addCase(fetchProducts.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        })
        .addCase(fetchProductById.fulfilled, (state, action) => {
            state.product = action.payload;
            state.status = "succeeded";
        })
        .addCase(fetchProductById.pending, (state) => {
            state.status = "pending";
        })
        .addCase(fetchProductById.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        })
        .addCase(updateProduct.fulfilled, (state, action) => {
            state.product = action.payload;
            state.status = "succeeded";
        })
        .addCase(updateProduct.pending, (state) => {
            state.status = "pending";
        })
        .addCase(updateProduct.rejected, (state) => {
            state.status = "failed";
        })
        .addCase(createProduct.fulfilled, (state, action) => {
            state.product = action.payload;
            state.status = "succeeded";

        })
        .addCase(createProduct.pending, (state) => {
            state.status = "pending";
        })
        .addCase(createProduct.rejected, (state) => {
            state.status = "failed";
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