import React from "react";
import "./DoctorCard.css";

const doc = {
  name: "Dr. Jiao Yang",
  ratings: "⭐⭐⭐⭐⭐",
  experience: 9,
  speciality: "Dentist",
};

const DoctorCard = (props) => {
  const doctor = { ...doc, ...props };
  return (
    <div className="doctor-card">
      <div className="doctor-card-upper">
        <img
          src="/female-doctor.svg"
          alt="Doctor Profile"
          className="doctor-image"
        />
        <div className="doctor-info">
          <h3 className="doctor-name">{doctor.name}</h3>
          <p className="doctor-speciality">{doctor.speciality}</p>
          <p className="doctor-experience">{doctor.experience} years of experience</p>
          <p className="doctor-ratings">Ratings: {doctor.ratings}</p>
        </div>
      </div>
        <div className="doctor-card-lower">
            <button className="book-appointment-button">Book Appointment <br /> No booking fees!</button>
        </div>
    </div>
  );
};

export default DoctorCard;
