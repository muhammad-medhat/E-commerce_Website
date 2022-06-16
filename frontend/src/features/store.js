import { configureStore , getDefaultMiddleware} from "@reduxjs/toolkit";
import  productsSlice  from "./slice/productsSlice";
import storage from 'redux-persist/lib/storage';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';

// *** Hint **::--------------- The persistReducer is for saving the redux data in the localStorage
const persistConfig = {
    key: "root",
    storage,
}

const persistedReducer = persistReducer(persistConfig, productsSlice);

export const store = configureStore({
    reducer: {
        products: persistedReducer,
        middleware: getDefaultMiddleware({
            serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
    },
})

export const persistor = persistStore(store)