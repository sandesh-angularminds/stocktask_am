import { getData } from "@/services/http-config";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

let AuthContext = createContext();

const ACCESS_TOKEN_KEY = "accessToken";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  //set user totalBalance
  const setNewTotalBalance = async () => {
    setTimeout(async () => {
      const bankData = await getData("/bank");
      console.log("set balance", bankData);
      setUser((prev) => {
        return { ...prev, totalBalance: bankData.data.totalBalance };
      });
    }, 2000);
  };

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
    <AuthContext.Provider
      value={{ user, login, logout, setUser, setNewTotalBalance }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
