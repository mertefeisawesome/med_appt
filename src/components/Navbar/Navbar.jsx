import React from "react";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import nurseHeadIcon from "@/assets/nurse-head.svg";
import ProfileCard from "@/components/ProfileCard/ProfileCard";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => !!sessionStorage.getItem("email"),
  );
  const [username] = useState(() => sessionStorage.getItem("email") || "");
  const [showProfileCard, setShowProfileCard] = useState(false);
  const profileButtonRef = useRef(null);
  const profileWrapperRef = useRef(null);

  const handleLogout = () => {
    sessionStorage.removeItem("auth-token");
    sessionStorage.removeItem("name");
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("phone");
    localStorage.removeItem("doctorData");
    localStorage.removeItem("appointments");
    setIsLoggedIn(false);
    setShowProfileCard(false);

    // Remove the reviewFormData from local storage
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith("reviewFormData_")) {
        localStorage.removeItem(key);
      }
    }
    window.location.reload();
  };

  const toggleProfileCard = () => {
    setShowProfileCard((current) => !current);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        showProfileCard &&
        profileWrapperRef.current &&
        !profileWrapperRef.current.contains(event.target) &&
        profileButtonRef.current &&
        !profileButtonRef.current.contains(event.target)
      ) {
        setShowProfileCard(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showProfileCard]);

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
            <Link to="/reviews">Reviews</Link>
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
                <span className="greeting-text">
                  Hello,{" "}
                  <button
                    ref={profileButtonRef}
                    onClick={toggleProfileCard}
                    id="profile-button"
                  >
                    {username}
                  </button>
                  !
                </span>
                <button onClick={handleLogout} id="logout-button">
                  Logout
                </button>
                {showProfileCard && (
                  <div className="profile-card-wrapper" ref={profileWrapperRef}>
                    <ProfileCard
                      onClose={() => setShowProfileCard(false)}
                    />
                  </div>
                )}
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
