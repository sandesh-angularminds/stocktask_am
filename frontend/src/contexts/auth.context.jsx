import { getData } from "@/services/http-config";
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

let AuthContext = createContext();

const ACCESS_TOKEN_KEY = "accessToken";

export const AuthProvider = ({ children }) => {


  
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const login = (userData) => {
    console.log("userData", userData);
    setUser(userData.user);
    localStorage.setItem(ACCESS_TOKEN_KEY, userData?.token ?? "null");
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    navigate("/auth/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
