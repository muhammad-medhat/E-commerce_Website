import { configureStore } from "@reduxjs/toolkit";

import  productsSlice  from "./slice/productsSlice";

export const store = configureStore({
    reducer: {
        products: productsSlice
    },
})