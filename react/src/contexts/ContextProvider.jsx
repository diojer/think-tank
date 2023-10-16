//This file informs the admin page of the roll of the user
//  attempting to access.

import { createContext, useContext, useEffect, useState } from "react";
import axiosClient from "../utility/axios-client";

//if a localStorage ACCESS_TOKEN exists, move it into sessionStorage
//  this way, we only ever have to look at sessionStorage to see user perms
if (
  localStorage.getItem("ACCESS_TOKEN") &&
  !sessionStorage.getItem("ACCESS_TOKEN")
) {
  sessionStorage.setItem("ACCESS_TOKEN", localStorage.getItem("ACCESS_TOKEN"));
}

const StateContext = createContext({
  user: null,
  admin: false,
  token: null,
  setUser: () => {},
  setToken: () => {},
  setAdmin: () => {},
});

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [token, _setToken] = useState(sessionStorage.getItem("ACCESS_TOKEN"));
  const [admin, _setAdmin] = useState(false);
  const setToken = (token, rememberMe) => {
    _setToken(token);
    if (token) {
      if (rememberMe) {
        localStorage.setItem("ACCESS_TOKEN", token);
      }
      sessionStorage.setItem("ACCESS_TOKEN", token);
    } else {
      localStorage.removeItem("ACCESS_TOKEN");
      sessionStorage.removeItem("ACCESS_TOKEN");
    }
  };

  const setAdmin = (admin, update) => {
    _setAdmin(admin);
    if (update) {
      if (!admin) {
        //api to remove admin status
      } else {
        //api to grant admin status
      }
    }
  };

  return (
    <StateContext.Provider
      value={{
        user,
        token,
        admin,
        setUser,
        setToken,
        setAdmin,
      }}
    >
      {children}
    </StateContext.Provider>
  );
}; //we use this if we want all contexts, so any new contexts must be added here.

export const UseStateContext = () => useContext(StateContext); //we use this if we want only to know if the user is an admin/guest
