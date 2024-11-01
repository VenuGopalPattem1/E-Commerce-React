import { configureStore } from '@reduxjs/toolkit';
import barReducer from './barSlice'; // Make sure to import the reducer correctly
import searchReducer from './searchSlice'
import cartReducer from './cartSlice' 
import userReducer from'./userSlice'
const store = configureStore({
    reducer: {
        navbar: barReducer, // Use the reducer function here
        search:searchReducer,
        cart:cartReducer,
        user:userReducer
    },
});

export default store;
