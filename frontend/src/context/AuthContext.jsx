import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    if (typeof window !== "undefined") {
      try {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
      } catch (e) {
        console.error("Failed to parse user from localStorage", e);
        return null;
      }
    }
    return null;
  });

 useEffect(() => {
  if (user !== null) {
    localStorage.setItem("user", JSON.stringify(user));
  } else {
    localStorage.removeItem("user");
  }
}, [user]);


  const login = (userdata) => setUser(userdata);
  const logout = () => { localStorage.clear();setUser(null);localStorage.removeItem('user')};

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
