import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import searchIcon from "@/assets/search.svg";
import "./FindDoctorSearch.css";

const FindDoctorSearch = () => {
  const initSpecialities = [
    "Dentist",
    "Gynecologist/obstetrician",
    "General Physician",
    "Dermatologist",
    "Ear-nose-throat (ent) Specialist",
    "Homeopath",
    "Ayurveda",
  ];
  const [doctorResultHidden, setDoctorResultHidden] = useState(true);
  const [searchDoctor, setSearchDoctor] = useState("");
  const [specialities, setSpecialities] = useState(initSpecialities);
  const navigate = useNavigate();
  const handleDoctorSelect = (speciality) => {
    setSearchDoctor(speciality);
    setDoctorResultHidden(true);
    navigate(`/booking-consultation?speciality=${speciality}`);
    window.location.reload();
  };
  return (
    <div className="find-doctor">
      <div className="find-doctor-header">
        <h1>Find a doctor at your own ease</h1>
        <img src="/doctors.svg" alt="Find Doctor Header" />
      </div>
      <div className="find-doctor-body">
        <div className="search-container">
          <input
            type="search"
            placeholder="Search doctors, clinics, hospitals, etc."
            onFocus={() => setDoctorResultHidden(false)}
            onBlur={() => setDoctorResultHidden(true)}
            value={searchDoctor}
            onChange={(e) => setSearchDoctor(e.target.value)}
          />
          <button className="search-button">
            <img src={searchIcon} alt="Search" />
          </button>
        </div>
        <div className="results-container">
          <div
            className="search-doctor-input-results"
            hidden={doctorResultHidden}
          >
            {specialities.map((speciality) => (
              <div
                className="search-doctor-result-item"
                key={speciality}
                onMouseDown={() => handleDoctorSelect(speciality)}
              >
                <span>
                  <img
                    src={searchIcon}
                    alt=""
                    style={{ height: "10px", width: "10px" }}
                    width="12"
                  />
                </span>
                <span>{speciality}</span>
                <span>SPECIALITY</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindDoctorSearch;
