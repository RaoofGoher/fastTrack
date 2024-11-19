import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null, // Holds user data
    isAuthenticated: false,
    token: null, // Holds the auth token
  },
  reducers: {
    setUser(state, action) {
      const { admin, token } = action.payload;
      state.user = {
        ...admin,
        role: admin.is_Admin ? 'admin' : 'user', // Map is_Admin to a role
      };
      state.isAuthenticated = true;
      state.token = token;
    },
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.token = null;
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
