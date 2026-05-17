import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Restore user from localStorage when app loads
  useEffect(() => {
    const storedUser = localStorage.getItem("userInfo");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Login user
  const login = (data) => {
    localStorage.setItem("userInfo", JSON.stringify(data));
    setUser(data);
  };

  // Logout user
  const logout = () => {
    localStorage.removeItem("userInfo");
    setUser(null);
  };

  // Update user profile
  const updateUser = (updatedData) => {
    localStorage.setItem("userInfo", JSON.stringify(updatedData));
    setUser(updatedData);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = () => useContext(AuthContext);