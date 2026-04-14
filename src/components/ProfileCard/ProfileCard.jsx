import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./ProfileCard.css";
import { API_URL } from "@/../config";

const ProfileCard = ({ onClose }) => {
  // Set up state variables using the useState hook
  const [userDetails, setUserDetails] = useState({});
  const [updatedDetails, setUpdatedDetails] = useState({});
  const [editMode, setEditMode] = useState(false);

  // Access the navigation functionality from React Router
  const navigate = useNavigate();

  // Function to fetch user profile data from the API
  const fetchUserProfile = useCallback(async () => {
    const storedName = sessionStorage.getItem("name");
    const storedPhone = sessionStorage.getItem("phone");
    const storedEmail = sessionStorage.getItem("email");

    if (storedName && storedPhone && storedEmail) {
      const user = { name: storedName, phone: storedPhone, email: storedEmail };
      setUserDetails(user);
      setUpdatedDetails(user);
    } else {
      try {
        const authtoken = sessionStorage.getItem("auth-token");
        const email = sessionStorage.getItem("email");

        if (!authtoken) {
          navigate("/login");
        } else {
          const response = await fetch(`${API_URL}/api/auth/user`, {
            headers: {
              Authorization: `Bearer ${authtoken}`,
              Email: email,
            },
          });
          if (response.ok) {
            const user = await response.json();
            setUserDetails(user);
            setUpdatedDetails(user);
            // Save to sessionStorage
            sessionStorage.setItem("name", user.name);
            sessionStorage.setItem("phone", user.phone);
            sessionStorage.setItem("email", user.email);
          } else {
            throw new Error("Failed to fetch user profile");
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
  }, [navigate]);

  // Use the useEffect hook to fetch user profile data when the component mounts or updates
  useEffect(() => {
    const authtoken = sessionStorage.getItem("auth-token");
    if (!authtoken) {
      navigate("/login");
    } else {
      fetchUserProfile();
    }
  }, [navigate, fetchUserProfile]);

  // Function to enable edit mode for profile details
  const handleEdit = (e) => {
    e.stopPropagation();
    setEditMode(true);
  };

  // Function to update state when user inputs new data
  const handleInputChange = (e) => {
    setUpdatedDetails({
      ...updatedDetails,
      [e.target.name]: e.target.value,
    });
  };

  // Function to handle form submission when user saves changes
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const authtoken = sessionStorage.getItem("auth-token");
      const email = sessionStorage.getItem("email"); // Get the email from session storage

      if (!authtoken || !email) {
        navigate("/login");
        return;
      }

      const payload = { ...updatedDetails };
      const response = await fetch(`${API_URL}/api/auth/user`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${authtoken}`,
          "Content-Type": "application/json",
          Email: email,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        // Update the user details in session storage
        sessionStorage.setItem("name", updatedDetails.name);
        sessionStorage.setItem("phone", updatedDetails.phone);

        setUserDetails(updatedDetails);
        setEditMode(false);
        // Display success message to the user
        alert(`Profile Updated Successfully!`);
        navigate("/");
      } else {
        // Handle error case
        throw new Error("Failed to update profile");
      }
    } catch (error) {
      console.error(error);
      // Handle error case
    }
  };

  return (
    <div
      className="profile-card-blob"
      id="profile-card"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="profile-card__header">
        <div>
          <div id="first-row">
            <h3>Profile</h3>
            <button className="edit-button" onClick={handleEdit}>
              Edit
            </button>
          </div>
          <p>{userDetails.name || userDetails.email}</p>
        </div>
      </div>
      {editMode ? (
        <form onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()}>
          <div className="profile-card__body">
            <p>
              <strong>Name:</strong>
              <input
                type="text"
                name="name"
                value={updatedDetails.name}
                onChange={handleInputChange}
              />
            </p>
            <p>
              <strong>Email:</strong>
              <input
                type="email"
                name="email"
                value={updatedDetails.email}
                onChange={handleInputChange}
              />
            </p>
            <p>
              <strong>Phone:</strong>
              <input
                type="tel"
                name="phone"
                value={updatedDetails.phone}
                onChange={handleInputChange}
              />
            </p>
          </div>
          <button type="submit">Save Changes</button>
        </form>
      ) : (
        <div
          className="profile-card__body"
          onClick={(e) => e.stopPropagation()}
        >
          <p>
            <strong>Email:</strong> {userDetails.email || "Not available"}
          </p>
          <p>
            <strong>Phone:</strong> {userDetails.phone || "Not set"}
          </p>
        </div>
      )}
    </div>
  );
};

export default ProfileCard;
