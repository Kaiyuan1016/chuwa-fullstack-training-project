import {
    createSlice,
    createAsyncThunk
} from '@reduxjs/toolkit';
import { fetchProducts, fetchProductById, createProduct, updateProduct } from '../../services/products';
import { removeError, addError } from '../errorSlice';

const initialState = {
    products:[],
    product:null,
    error:null,
    isAuthenticated: false,
    status: 'idle'
};

export const fetchProductsAction = createAsyncThunk("products/fetchProducts", async (data) => {
    try {
       const products = await fetchProducts(data);
        // console.log('this is response ', response.data);
        // thunkAPI.dispatch(removeError());
        return products;
    } catch(error) {
        const { message } = error;
        console.log('Error fetching product data', message);
        // thunkAPI.dispatch(addError(message));
        // return thunkAPI.rejectWithValue(message);
    }
})

export const fetchProductByIdAction = createAsyncThunk("products/fetchProductById", async (data, thunkAPI) => {
    try {
        const product = await fetchProductById(data);
        thunkAPI.dispatch(removeError());
        return product;
    } catch(error) {
        const { message } = error;
        thunkAPI.dispatch(addError(message));
        return thunkAPI.rejectWithValue(message);
    }
});

export const updateProductAction = createAsyncThunk("products/updateProduct", async (data, thunkAPI) => {
    try {
        const product = await updateProduct(data);
        thunkAPI.dispatch(removeError());
        return product;
    } catch(error) {
        const { message } = error;
        thunkAPI.dispatch(addError(message));
        return thunkAPI.rejectWithValue(message);
    }
});

export const createProductAction = createAsyncThunk("products/createProduct", async (data, thunkAPI) => {
    try {
        const product = await createProduct(data);
        thunkAPI.dispatch(removeError());
        return product;
    } catch(error) {
        const { message } = error;
        thunkAPI.dispatch(addError(message));
        return thunkAPI.rejectWithValue(message);
    }
});

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
        .addCase(fetchProductsAction.fulfilled, (state, action) => {
            state.products = action.payload;
            state.status = "succeeded";
        })
        .addCase(fetchProductsAction.pending, (state) => {
            state.status = "pending";
        })
        .addCase(fetchProductsAction.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        })
        .addCase(fetchProductByIdAction.fulfilled, (state, action) => {
            state.product = action.payload;
            state.status = "succeeded";
        })
        .addCase(fetchProductByIdAction.pending, (state) => {
            state.status = "pending";
        })
        .addCase(fetchProductByIdAction.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        })
        .addCase(updateProductAction.fulfilled, (state, action) => {
            state.product = action.payload;
            state.status = "succeeded";
        })
        .addCase(updateProductAction.pending, (state) => {
            state.status = "pending";
        })
        .addCase(updateProductAction.rejected, (state) => {
            state.status = "failed";
        })
        .addCase(createProductAction.fulfilled, (state, action) => {
            state.product = action.payload;
            state.status = "succeeded";

        })
        .addCase(createProductAction.pending, (state) => {
            state.status = "pending";
        })
        .addCase(createProductAction.rejected, (state) => {
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