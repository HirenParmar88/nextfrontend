//src/context/UserContext.js

"use client";
import { createContext, useState, useContext } from "react";
import Cookies from "js-cookie";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const cookieUser = Cookies.get('user');
  const [user, setUser] = useState(cookieUser ? JSON.parse(cookieUser) : null);
  console.log({ user });
  
  // Function to log out user
  const logout = () => {
    Cookies.remove("token");
    Cookies.remove("user")
    //localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) throw Error("Use useUser inside the UserContext");
  return context;
};