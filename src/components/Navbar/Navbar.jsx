import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import nurseHeadIcon from "@/assets/nurse-head.svg";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  const handleLogout = () => {
    sessionStorage.removeItem("auth-token");
    sessionStorage.removeItem("name");
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("phone");
    // remove email phone
    localStorage.removeItem("doctorData");
    setIsLoggedIn(false);
    // setUsername("");

    // Remove the reviewFormData from local storage
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith("reviewFormData_")) {
        localStorage.removeItem(key);
      }
    }
    window.location.reload();
  };

  useEffect(() => {
    const storedemail = sessionStorage.getItem("email");

    if (storedemail) {
      setIsLoggedIn(true);
      setUsername(storedemail);
    }
  }, []);

  return (
    <nav>
      <div className="left">
        <Link to="/">
          <div className="logo">
            <span>StayHealthy</span>
            <img src={nurseHeadIcon} alt="Nurse Head Icon" />
          </div>
        </Link>
      </div>
      <div className="right">
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <a href="#">Appointments</a>
          </li>
          <li>
            <a href="#">Health Blog</a>
          </li>
          <li>
            <a href="#">Reviews</a>
          </li>
          {isLoggedIn ? (
            <li>
              <Link to="/booking-consultation">Booking Consultation</Link>
            </li>
          ) : (
            ""
          )}
        </ul>
        <ul className="nav-buttons">
          {isLoggedIn ? (
            <>
              <li className="greeting">
                Hello, {username}!{" "}
                <button onClick={handleLogout} id="logout-button">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <button>
                  <Link to="/login">Login</Link>
                </button>
              </li>
              <li>
                <button>
                  <Link to="/signup">Sign Up</Link>
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
