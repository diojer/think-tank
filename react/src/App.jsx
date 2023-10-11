import React from "react";
import "./App.css";
import { useEffect } from "react";
import axios from "axios";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

//Webpage Imports
import Home from "./pages/Home/Home";
import AboutUs from "./pages/AboutUs/AboutUs";
import Team from "./pages/Team/Team";
import Articles from "./pages/Articles/Articles";
import Events from "./pages/Events/Events";
import Reports from "./pages/Reports/Reports";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Upload from "./pages/Upload/Upload";
import Sponsors from "./pages/Sponsors/Sponsors";

//Component Imports
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

//FA Imports
import { fab } from "@fortawesome/free-brands-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import * as faSolid from "@fortawesome/free-solid-svg-icons";

//utility Imports
import ScrollToTop from "./utility/ScrollToTop";

// library.add(fab, faSolid);

function App() {
    return (
        <>
            <Router>
                <Navbar />
                <ScrollToTop />
                <div className="page-wrapper">
                    <Routes>
                        <Route path="/" exact element={<Home />}></Route>
                        <Route
                            path="/aboutus"
                            exact
                            element={<AboutUs />}
                        ></Route>
                        <Route path="/team" exact element={<Team />}></Route>
                        <Route
                            path="/events"
                            exact
                            element={<Events />}
                        ></Route>
                        <Route
                            path="/articles"
                            exact
                            element={<Articles />}
                        ></Route>
                        <Route
                            path="/articles/:id"
                            exact
                            element={<Articles />}
                        ></Route>
                        <Route
                            path="/reports"
                            exact
                            element={<Reports />}
                        ></Route>
                        <Route
                            path="/sponsors"
                            exact
                            element={<Sponsors />}
                        ></Route>
                        <Route
                            path="/resources"
                            exact
                            element={<AboutUs />}
                        ></Route>
                        <Route path="/login" exact element={<Login />}></Route>
                        <Route
                            path="/register"
                            exact
                            element={<Register />}
                        ></Route>
                        <Route
                            path="/upload"
                            exact
                            element={<Upload />}
                        ></Route>
                        <Route
                            path="/upload/:id"
                            exact
                            element={<Upload />}
                        ></Route>
                    </Routes>
                </div>
                <Footer />
            </Router>
        </>
    );
}

export default App;
