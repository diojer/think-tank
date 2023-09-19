import React from "react";
import "./App.css";
import { useEffect } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//Component Imports
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

//Webpage Imports
import Home from "./components/pages/Home/Home";
import AboutUs from "./components/pages/AboutUs/AboutUs";
import Team from "./components/pages/Team/Team";
import Articles from "./components/pages/Articles/Articles";
import Reports from "./components/pages/Reports/Reports";
import Login from "./components/pages/Login/Login";

//FA Imports
import { fab } from "@fortawesome/free-brands-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faMagnifyingGlass,
  faTimes,
  faBars,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

//utility Imports
import ScrollToTop from "./utility/ScrollToTop";

library.add(fab, faMagnifyingGlass, faTimes, faBars, faUser);

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <ScrollToTop />
        <div className="page-wrapper">
          <Routes>
            <Route path="/" exact element={<Home />}></Route>
            <Route path="/aboutus" exact element={<AboutUs />}></Route>
            <Route path="/team" exact element={<Team />}></Route>
            {/* <Route path="/events" exact element={<Events />}></Route> */}
            <Route path="/articles" exact element={<Articles />}></Route>
            <Route path="/reports" exact element={<Reports />}></Route>
            <Route path="/sponsors" exact element={<AboutUs />}></Route>
            <Route path="/resources" exact element={<AboutUs />}></Route>
            <Route path="/login" exact element={<Login />}></Route>
          </Routes>
        </div>
        <Footer />
      </Router>
    </>
  );
}

export default App;
