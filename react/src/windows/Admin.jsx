//This is the admin dashboard window. Only authorised people will be able to access this.

import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { UseStateContext } from "../contexts/ContextProvider";
import ScrollToTop from "../utility/ScrollToTop";

function Admin() {
  const { admin } = UseStateContext();
  if (!admin) {
    return <Navigate to="/login" />;
  }
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

export default Admin;
