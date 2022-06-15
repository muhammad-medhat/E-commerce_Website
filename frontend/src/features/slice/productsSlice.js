import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
export const fetchAllProducts = createAsyncThunk("allProducts/fetchAllProducts", async () => {
        const res = await fetch("http://localhost:3001/api/products")
                    .then(res => res.json())
                    .then(data => data);
                    return res.products;
});

export const productsSlice = createSlice({
    name: 'products',
    initialState: {
        allProducts: false,
        selectedProduct: []
    },
    reducers: {
        addProductDetails: (state, action) => {
            state.selectedProduct = action.payload
        }
    },
    extraReducers: {
        [fetchAllProducts.pending]: () => {
            console.log("pending");
        },
        [fetchAllProducts.fulfilled]: (state, action) => {
            state.allProducts = action.payload
        },
        [fetchAllProducts.rejected]: () => {
            console.log("rejected");
        }
    }
});

export const {addProductDetails} = productsSlice.actions;
export default productsSlice.reducer;