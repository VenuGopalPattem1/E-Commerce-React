import { createSlice } from "@reduxjs/toolkit";

export const barSlice = createSlice({
    name: 'navbar',
    initialState: {
        venu: true,
    },
    reducers: {
        changeNavbar: (state) => {
            state.venu = !state.venu; // Toggles the value of venu
        },
    },
});

// Export the action
export const { changeNavbar } = barSlice.actions;

// Export the reducer as the default export
export default barSlice.reducer;
