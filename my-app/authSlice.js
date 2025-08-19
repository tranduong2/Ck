// authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    user: null, // object { username }
    students: [], // nếu cần dùng số lượng sinh viên
  },
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.user = { username: action.payload.username }; // lưu object
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
