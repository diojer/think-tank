import React from "react";
import "./App.css";
import { useEffect } from "react";
import axios from "axios";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//Component Imports
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

//Webpage Imports
import Home from "./components/pages/Home/Home";
import AboutUs from "./components/pages/AboutUs/AboutUs";
import Team from "./components/pages/Team/Team";
import Articles from "./components/pages/Articles/Articles";
import Events from "./components/pages/Events/Events";
import Reports from "./components/pages/Reports/Reports";
import Login from "./components/pages/Login/Login";
import Register from "./components/pages/Register/Register";
import Upload from "./components/pages/Upload/Upload";
import Sponsors from "./components/pages/Sponsors/Sponsors";

//FA Imports
import { fab } from "@fortawesome/free-brands-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faMagnifyingGlass,
  faTimes,
  faBars,
  faUser,
  faPencil,
} from "@fortawesome/free-solid-svg-icons";

//utility Imports
import ScrollToTop from "./utility/ScrollToTop";
import { URLS } from "./utility/URLS";
const VPS = URLS.VPS;

library.add(fab, faMagnifyingGlass, faTimes, faBars, faUser, faPencil);

function App() {
  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get(`${VPS}/users/login`).then((response) => {});
  }, []);
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
            <Route path="/events" exact element={<Events />}></Route>
            <Route path="/articles" exact element={<Articles />}></Route>
            <Route path="/articles/:id" exact element={<Articles />}></Route>
            <Route path="/reports" exact element={<Reports />}></Route>
            <Route path="/sponsors" exact element={<Sponsors />}></Route>
            <Route path="/resources" exact element={<AboutUs />}></Route>
            <Route path="/login" exact element={<Login />}></Route>
            <Route path="/register" exact element={<Register />}></Route>
            <Route path="/upload" exact element={<Upload />}></Route>
            <Route path="/upload/:id" exact element={<Upload />}></Route>
          </Routes>
        </div>
        <Footer />
      </Router>
    </>
  );
}

export default App;
