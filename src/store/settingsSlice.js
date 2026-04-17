import { createSlice } from "@reduxjs/toolkit";

const STORAGE_KEY = "wordsearch:settings";

const defaultSettings = {
  difficulty: "medium",
  boardSize: 5,
  wordsCount: 4,
  timerSeconds: 0,
  generatedWords: true,
};

function loadInitial() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : defaultSettings;
  } catch {
    return defaultSettings;
  }
}

const settingsSlice = createSlice({
  name: "settings",
  initialState: loadInitial(),
  reducers: {
    setSettings: (state, action) => {
      const next = { ...state, ...action.payload };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch (error) {
        console.warn("Failed to persist settings.", error);
      }
      return next;
    },
    resetSettings: () => {
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (error) {
        console.warn("Failed to clear saved settings.", error);
      }
      return defaultSettings;
    },
  },
});

export const { setSettings, resetSettings } = settingsSlice.actions;
export default settingsSlice.reducer;
