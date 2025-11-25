import React from "react";

const STORAGE_KEY = "wordsearch:user";

const UserContext = React.createContext({
  user: null,
  setUser: () => {},
  clearUser: () => {},
});

export function UserProvider({ children }) {
  const [user, setUserState] = React.useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  const setUser = (u) => {
    setUserState(u);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
    } catch {}
  };

  const clearUser = () => {
    setUserState(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
  };

  return (
    <UserContext.Provider value={{ user, setUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return React.useContext(UserContext);
}
