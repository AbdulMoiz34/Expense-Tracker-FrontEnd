import { createSlice } from "@reduxjs/toolkit";

const initialUser = (() => {
  try {
    const raw = localStorage.getItem("auth");
    return raw ? JSON.parse(raw) : { user: null, token: null };
  } catch {
    return { user: null, token: null };
  }
})();

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: initialUser.user,
    token: initialUser.token,
  },
  reducers: {
    setCredentials(state, action) {
      const { user, token } = action.payload || {};
      state.user = user || null;
      state.token = token || null;
      try {
        if (state.user && state.token) {
          localStorage.setItem(
            "auth",
            JSON.stringify({ user: state.user, token: state.token })
          );
        } else {
          localStorage.removeItem("auth");
        }
      } catch {}
    },
    logout(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem("auth");
    },
  },
});

export const { logout, setCredentials } = authSlice.actions;
export default authSlice.reducer;



