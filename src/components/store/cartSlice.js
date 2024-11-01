import { createSlice } from "@reduxjs/toolkit";

const cartSlicer = createSlice({
    name: 'cart',
    initialState: {
        items: []
    },
    reducers: {
        addCartItem: (state, action) => {
            const existingItem = state.items.find(item => item.product_id === action.payload.product_id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({ ...action.payload, quantity: 1 });
            }
        },
        incrementQuantity: (state, action) => {
            const item = state.items.find(item => item.product_id === action.payload);
            if (item) {
                item.quantity += 1;
            }
        },
        decrementQuantity: (state, action) => {
            const item = state.items.find(item => item.product_id === action.payload);
            if (item && item.quantity > 1) {
                item.quantity -= 1;
            }
        },
        removeCartItem: (state, action) => {
            state.items = state.items.filter(item => item.product_id !== action.payload);
        },
        // Action to empty the entire cart
        emptyCart: (state) => {
            state.items = [];
        }

    }
});

export const { addCartItem, incrementQuantity, decrementQuantity, removeCartItem, emptyCart } = cartSlicer.actions;
export default cartSlicer.reducer;
