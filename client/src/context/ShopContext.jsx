import { createContext } from "react";
import React from "react";
export const ShopContext = createContext();

export const ShopContextProvider = (props) => {
  const backendUrl = "http://localhost:5000";
  const value = {
    backendUrl,
  };
  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};
