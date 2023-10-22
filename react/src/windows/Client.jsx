//This is what all users see when loading up the website

import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";

//Component Imports
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

//Utility Imports
import ScrollToTop from "../utility/ScrollToTop";
import { UseStateContext } from "../contexts/ContextProvider";
import axiosClient from "../utility/axios-client";

function Client() {
  const { token, setUser, setAdmin } = UseStateContext();
  useEffect(() => {
    if (token) {
      axiosClient.get("/me").then(({ data }) => {
        setUser(data.user);
        setAdmin(data.admin);
      });
    }
  }, []);
  return (
    <div>
      <Navbar />
      <ScrollToTop />
      <div className="page-wrapper">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default Client;
