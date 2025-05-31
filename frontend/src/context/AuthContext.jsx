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
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  const login = (userdata) => setUser(userdata);
  const logout = () => { localStorage.clear();setUser(null)};

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
