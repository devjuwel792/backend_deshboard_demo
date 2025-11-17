
import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './features/counter/counterSlice'
import sidebarReducer from './features/sidebar/sidebarSlice'
import themeReducer from './features/theme/themeSlice'
import { apiSlice } from './features/api/apiSlice'

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        sidebar: sidebarReducer,
        theme: themeReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
})
