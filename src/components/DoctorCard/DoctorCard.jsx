import React, { useState } from "react";
import "./DoctorCard.css";
import AppointmentForm from "@/components/AppointmentForm/AppointmentForm";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { v4 as uuidv4 } from "uuid";

const DoctorCard = ({ doctor }) => {
  const [showModal, setShowModal] = useState(false);
  const [appointments, setAppointments] = useState(() => {
    const data = localStorage.getItem("appointments");
    return data ? JSON.parse(data) : [];
  });

  const doctorAppointments = appointments.filter(
    (appointment) => appointment.doctor === doctor.name,
  );

  const handleCancel = (appointmentId) => {
    const updatedAppointments = appointments.filter(
      (appointment) => appointment.id !== appointmentId,
    );
    setAppointments(updatedAppointments);
  };

  const handleFormSubmit = (appointmentData) => {
    const newAppointment = {
      id: uuidv4(),
      doctor: doctor.name,
      speciality: doctor.speciality,
      ...appointmentData,
    };
    const updatedAppointments = [...appointments, newAppointment];
    localStorage.setItem("appointments", JSON.stringify(updatedAppointments));
    setAppointments(updatedAppointments);
    setShowModal(false);
  };

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
          <p className="doctor-experience">
            {doctor.experience} years of experience
          </p>
          <p className="doctor-ratings">Ratings: {doctor.ratings}</p>
        </div>
      </div>
      <div className="doctor-card-lower">
        <Popup
          style={{ backgroundColor: "#FFFFFF" }}
          trigger={
            <button
              className={`book-appointment-button ${doctorAppointments.length > 0 ? "cancel-appointment" : ""}`}
            >
              {doctorAppointments.length > 0 ? (
                <>Cancel Appointment</>
              ) : (
                <>
                  Book Appointment <br /> No booking fees!
                </>
              )}
            </button>
          }
          modal
          open={showModal}
          onClose={() => setShowModal(false)}
        >
          {() => (
            <div
              className="doctorbg"
              style={{ height: "100vh", overflow: "scroll" }}
            >
              <div>
                <div className="doctor-card-profile-image-container">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="46"
                    height="46"
                    fill="currentColor"
                    className="bi bi-person-fill"
                    viewBox="0 0 16 16"
                  >
                    {" "}
                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />{" "}
                  </svg>
                </div>
                <div className="doctor-card-details">
                  <div className="doctor-card-detail-name">{doctor.name}</div>
                  <div className="doctor-card-detail-speciality">
                    {doctor.speciality}
                  </div>
                  <div className="doctor-card-detail-experience">
                    {doctor.experience} years experience
                  </div>
                  <div className="doctor-card-detail-consultationfees">
                    Ratings: {doctor.ratings}
                  </div>
                </div>
              </div>

              {doctorAppointments.length > 0 ? (
                <>
                  <h3 style={{ textAlign: "center" }}>Appointment Booked!</h3>
                  {doctorAppointments.map((appointment) => (
                    <div
                      className="bookedInfo"
                      style={{ textAlign: "center" }}
                      key={appointment.id}
                    >
                      <p>Name: {appointment.name}</p>
                      <p>Phone Number: {appointment.phone}</p>
                      <p>Date: {appointment.date}</p>
                      <p>Time: {appointment.time}</p>
                      <button onClick={() => handleCancel(appointment.id)}>
                        Cancel Appointment
                      </button>
                    </div>
                  ))}
                </>
              ) : (
                <AppointmentForm onSubmit={handleFormSubmit} />
              )}
            </div>
          )}
        </Popup>
      </div>
    </div>
  );
};

export default DoctorCard;
