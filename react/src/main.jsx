import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ContextProvider } from "./contexts/ContextProvider";

//Router Imports
import { RouterProvider } from "react-router-dom";
import router from "./router.jsx";

//FA Imports
import { fab } from "@fortawesome/free-brands-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import * as Icons from "@fortawesome/free-solid-svg-icons";

const iconList = Object.keys(Icons)
  .filter((key) => key !== "fas" && key !== "prefix")
  .map((icon) => Icons[icon]);
library.add(fab, iconList);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ContextProvider>
      <RouterProvider router={router} />
    </ContextProvider>
  </React.StrictMode>
);
