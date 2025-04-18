import { createSlice } from "@reduxjs/toolkit";

export const authorizeSlice = createSlice({
  name: "auth",
  initialState: { isLoggedIn: false },
  reducers: {
    login: (state) => {
      state.isLoggedIn = true; // Giriş durumu true
    },
    logout: (state) => {
      state.isLoggedIn = false; // Giriş durumu false
    },
  },
  
});

export const { login, logout } = authorizeSlice.actions;
export default authorizeSlice.reducer;
