//This is the admin dashboard window. Only authorised people will be able to access this.

import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UseStateContext } from "../contexts/ContextProvider";

function Admin() {
  const { user, admin } = UseStateContext();
  if (!admin) {
    return <Navigate to="/login" />;
  }
  return (
    <div>
      <Outlet />
    </div>
  );
}

export default Admin;
