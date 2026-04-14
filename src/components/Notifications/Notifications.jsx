import React, { useState, useEffect } from "react";
import "./Notifications.css";
import Navbar from "@/components/Navbar/Navbar";

const Notifications = ({ children }) => {
  // Following code has been commented with appropriate comments for your reference.

  // Function component Notification to display user notifications

  // State variables to manage user authentication, username, doctor data, and appointment data
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [appointmentData] = useState(() => {
    const storedAppointments = localStorage.getItem("appointments");
    let parsedAppointments = [];

    try {
      const data = storedAppointments ? JSON.parse(storedAppointments) : [];
      parsedAppointments = Array.isArray(data) ? data : [data];
    } catch (error) {
      parsedAppointments = [];
    }

    return parsedAppointments;
  });

  useEffect(() => {
    const storedUsername = sessionStorage.getItem("email");

    if (storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    }
  }, []); // Empty dependency array ensures useEffect runs only once after initial render

  // Return JSX elements to display Navbar, children components, and appointment details if user is logged in
  return (
    <div>
      {/* Render Navbar component */}
      <Navbar />
      {/* Render children components */}
      {children}
      {/* Display appointment details if user is logged in and appointmentData is available */}
      {isLoggedIn &&
        appointmentData &&
        appointmentData.map((appointment) => (
          <div className="appointment-card" key={appointment.id}>
            <div className="appointment-card__content">
              {/* Display title for appointment details */}
              <h3 className="appointment-card__title">Appointment Details</h3>
              <p className="appointment-card__message">
                {/* Display doctor's name from doctorData */}
                <strong>Doctor:</strong> {appointment.doctor}
                <br />
                <strong>Speciality:</strong> {appointment.speciality}
                <br />
                <strong>Date:</strong> {appointment.date}
                <br />
                <strong>Time:</strong> {appointment.time}
                <br />
              </p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Notifications;
