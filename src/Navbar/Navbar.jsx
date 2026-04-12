import React from "react";
import "./Navbar.css";
import nurseHeadIcon from "@/assets/nurse-head.svg";

const Navbar = () => {
  return (
    <nav>
      <div className="left">
        <div className="logo">
          <span>StayHealthy</span>
          <img src={nurseHeadIcon} alt="Nurse Head Icon" />
        </div>
      </div>
      <div className="right">
        <ul className="nav-links">
          <li>
            <a href="#">Home</a>
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
        </ul>
        <ul className="nav-buttons">
          <li>
            <button>Login</button>
          </li>
          <li>
            <button>Sign Up</button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
