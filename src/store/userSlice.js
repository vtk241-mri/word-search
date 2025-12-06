import { createSlice } from "@reduxjs/toolkit";

const STORAGE_KEY = "wordsearch:user";

function loadInitial() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

const userSlice = createSlice({
  name: "user",
  initialState: loadInitial(),
  reducers: {
    setUser: (state, action) => {
      const u = action.payload;
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
      } catch {}
      return u;
    },
    clearUser: () => {
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {}
      return null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
