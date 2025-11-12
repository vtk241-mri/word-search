import React from "react";

const STORAGE_KEY = "wordsearch:settings";

const defaultSettings = {
  difficulty: "medium",
  boardSize: 5,
  wordsCount: 4,
  timerSeconds: 0,
  speed: "normal",
};

const SettingsContext = React.createContext({
  settings: defaultSettings,
  setSettings: () => {},
  resetSettings: () => {},
});

export function SettingsProvider({ children }) {
  const [settings, setSettingsState] = React.useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : defaultSettings;
    } catch {
      return defaultSettings;
    }
  });

  const setSettings = (next) => {
    setSettingsState((prev) => {
      const resolved = typeof next === "function" ? next(prev) : next;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(resolved));
      return resolved;
    });
  };

  const resetSettings = () => {
    localStorage.removeItem(STORAGE_KEY);
    setSettingsState(defaultSettings);
  };

  return (
    <SettingsContext.Provider value={{ settings, setSettings, resetSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  return React.useContext(SettingsContext);
}
