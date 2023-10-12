//This is what all users see when loading up the website

import React from "react";
import { Outlet } from "react-router-dom";

//Component Imports
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

//Utility Imports
import ScrollToTop from "../utility/ScrollToTop";
import { UseStateContext } from "../contexts/ContextProvider";

function Client() {
  const { admin } = UseStateContext();
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
