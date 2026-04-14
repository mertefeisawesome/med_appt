import React, { useState } from "react";
import "./AppointmentForm.css";

const AppointmentForm = ({ onSubmit }) => {
  const today = new Date().toISOString().split("T")[0];
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState(today);
  const [time, setTime] = useState("08:30");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, phone, date, time });
    setName("");
    setPhone("");
    setDate(today);
    setTime("08:30");
  };

  return (
    <div className="appointment-form">
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label htmlFor="phone">Phone Number:</label>
        <input
          type="tel"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <label htmlFor="date">Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <label htmlFor="time">Time:</label>
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        />
        <button type="submit">Book Appointment</button>
      </form>
    </div>
  );
};

export default AppointmentForm;
