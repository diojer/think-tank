import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from "js-cookie";
import axios from "axios";
import { UseStateContext } from "../contexts/ContextProvider";

function Navbar() {
  const { admin } = UseStateContext();
  return (
    <>
      <nav>
        <div className="wrapper">
          <div className="logo">
            <Link to="/" className="logo-wrapper">
              <img className="navbar-logo" src="/images/img-20.png" />
              <p className="logo-text">Leeds Think Tank</p>
            </Link>
          </div>
          <input type="radio" name="slider" id="menu-btn" />
          <input type="radio" name="slider" id="close-btn" />
          <ul className="nav-links">
            <label htmlFor="close-btn" className="btn close-btn">
              <FontAwesomeIcon icon="fa-times" />
            </label>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/aboutus">About Us</Link>
            </li>
            <li>
              <Link to="/team">Team</Link>
            </li>
            <li>
              <a
                href="https://engage.luu.org.uk/groups/26GTR/leeds-think-tank-society/events"
                target="_blank"
              >
                Events
              </a>
            </li>
            <li>
              <Link to="/articles">Articles</Link>
            </li>
            <li>
              <Link to="/reports">Reports</Link>
            </li>
            <li>
              <Link to="/sponsors">Sponsors</Link>
            </li>
            {/* Login Page */}
            <li>
              <Link to="/login">
                <FontAwesomeIcon icon="fa-solid fa-user" />
              </Link>
            </li>
            {/* Searchbar */}
            <li>
              <Link>
                <FontAwesomeIcon icon="fa-magnifying-glass" />
              </Link>
            </li>
            {admin && (
              <li>
                <Link to="/portal/upload">
                  <FontAwesomeIcon icon="fa-solid fa-pencil" />
                </Link>
              </li>
            )}
          </ul>
          <label htmlFor="menu-btn" className="btn menu-btn">
            <FontAwesomeIcon icon="fa-bars" />
          </label>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
