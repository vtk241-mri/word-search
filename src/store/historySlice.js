import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  byUserId: {},
};

function loadFromStorage(userId) {
  try {
    const raw = localStorage.getItem(`wordsearch:history:${userId}`);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveToStorage(userId, arr) {
  try {
    localStorage.setItem(`wordsearch:history:${userId}`, JSON.stringify(arr));
  } catch {}
}

const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    loadHistoryForUser: (state, action) => {
      const userId = action.payload;
      state.byUserId[userId] = loadFromStorage(userId);
    },
    addResult: (state, action) => {
      const { userId, result } = action.payload;
      const arr = state.byUserId[userId]
        ? [...state.byUserId[userId]]
        : loadFromStorage(userId);
      arr.unshift(result);
      const maxLen = 50;
      const trimmed = arr.slice(0, maxLen);
      state.byUserId[userId] = trimmed;
      saveToStorage(userId, trimmed);
    },
    clearHistoryForUser: (state, action) => {
      const userId = action.payload;
      state.byUserId[userId] = [];
      try {
        localStorage.removeItem(`wordsearch:history:${userId}`);
      } catch {}
    },
  },
});

export const { loadHistoryForUser, addResult, clearHistoryForUser } =
  historySlice.actions;
export default historySlice.reducer;
