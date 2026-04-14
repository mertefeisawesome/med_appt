import React, { useState, useEffect } from "react";
import "./Notifications.css";
import Navbar from "@/components/Navbar/Navbar";

const Notifications = ({ children }) => {
  // Following code has been commented with appropriate comments for your reference.

  // Function component Notification to display user notifications

  // State variables to manage user authentication, username, doctor data, and appointment data
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [appointmentData, setAppointmentData] = useState(null);

  // useEffect hook to perform side effects in the component
  useEffect(() => {
    // Retrieve stored username, doctor data, and appointment data from sessionStorage and localStorage
    const storedUsername = sessionStorage.getItem("email");
    const storedAppointmentData = JSON.parse(
      localStorage.getItem("appointments"),
    );

    // Set isLoggedIn state to true and update username if storedUsername exists
    if (storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    }

    // Set appointmentData state if storedAppointmentData exists
    if (storedAppointmentData) {
      setAppointmentData(storedAppointmentData);
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
