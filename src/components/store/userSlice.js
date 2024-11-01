// src/redux/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    email: null,
    role: null,
    active:false,
  },
  reducers: {
    setUser: (state, action) => {
      const { email, role } = action.payload;
      state.email = email;
      state.role = role;
      state.active = true
    },
    clearUser: (state) => {
      state.email = null;
      state.role = null;
      state.active = false
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
