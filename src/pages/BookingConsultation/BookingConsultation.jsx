import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import DoctorCard from "@/components/DoctorCard/DoctorCard";
import "./BookingConsultation.css";
import FindDoctorSearch from "@/components//FindDoctorSearch/FindDoctorSearch";

const BookingConsultation = () => {
  const [searchParams] = useSearchParams();
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [isSearched, setIsSearched] = useState(false);

  const getDoctorsDetails = () => {
    fetch("https://api.npoint.io/9a5543d36f1460da2f63")
      .then((res) => res.json())
      .then((data) => {
        if (searchParams.get("speciality")) {
          // window.reload()
          const filtered = data.filter(
            (doctor) =>
              doctor.speciality.toLowerCase() ===
              searchParams.get("speciality").toLowerCase(),
          );

          setFilteredDoctors(filtered);

          setIsSearched(true);
          window.reload();
        } else {
          setFilteredDoctors([]);
          setIsSearched(false);
        }
        setDoctors(data);
      })
      .catch((err) => console.log(err));
  };
  const handleSearch = (searchText) => {
    if (searchText === "") {
      setFilteredDoctors([]);
      setIsSearched(false);
    } else {
      const filtered = doctors.filter((doctor) =>
        //
        doctor.speciality.toLowerCase().includes(searchText.toLowerCase()),
      );

      setFilteredDoctors(filtered);
      setIsSearched(true);
      window.location.reload();
    }
  };
  const navigate = useNavigate();
  useEffect(() => {
    getDoctorsDetails();
    const authtoken = sessionStorage.getItem("auth-token");
    if (!authtoken) {
      navigate("/login");
    }
  }, [searchParams]);
  return (
    <div className="searchpage-container">
      <FindDoctorSearch onSearch={handleSearch} />
      <div className="search-results-container">
        {isSearched ? (
          <>
            <h2>{filteredDoctors.length} doctors found</h2>
            {filteredDoctors.length > 0 ? (
              <div className="doctors-list">
                {filteredDoctors.map((doctor) => (
                  <DoctorCard key={doctor.name} doctor={doctor} />
                ))}
              </div>
            ) : (
              <p>No doctors found.</p>
            )}
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default BookingConsultation;
