import React from "react";
import "./Sign_Up.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../../config";

const Sign_Up = () => {
  // State variables using useState hook
  const [role, setRole] = useState("Patient");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState({}); // State for field-specific errors
  const navigate = useNavigate(); // Navigation hook from react-router

  // Function to handle form submission
  const register = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setFieldErrors({}); // Clear previous errors

    // API Call to register user
    const response = await fetch(`${API_URL}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        role: role,
        name: name,
        email: email,
        password: password,
        phone: phone,
      }),
    });

    const json = await response.json(); // Parse the response JSON

    if (json.authtoken) {
      console.log("Registration successful:", json.authtoken); // Log the response for debugging
      sessionStorage.setItem("auth-token", json.authtoken);
      sessionStorage.setItem("name", name);
      sessionStorage.setItem("phone", phone);
      sessionStorage.setItem("email", email);
      navigate("/");
      window.location.reload();
      return;
    }

    // Handle errors
    const errors = json.errors || json.error;
    if (Array.isArray(errors)) {
      const errorMap = {};
      errors.forEach((err) => {
        if (err.param) {
          errorMap[err.param] = err.msg;
        }
      });
      setFieldErrors(errorMap);
    } else {
      setFieldErrors({ general: errors || "Registration failed" });
    }
  };

  // JSX to render the Sign Up form
  return (
    <div className="form-container">
      <div className="form-header">
        <h1>Sign Up</h1>
        <span>
          Already a member? <Link to="/login">Login</Link>
        </span>
        {fieldErrors.general && (
          <div className="error-message">{fieldErrors.general}</div>
        )}
      </div>
      <form onSubmit={register}>
        <span>
          <label htmlFor="role">Role</label>
          <select
            id="role"
            name="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="Patient">Patient</option>
            <option value="Doctor">Doctor</option>
            <option value="Admin">Admin</option>
          </select>
        </span>
        <span>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setFieldErrors((prev) => ({ ...prev, name: "" }));
            }}
            required
          />
          {fieldErrors.name && (
            <div className="error-message">{fieldErrors.name}</div>
          )}
        </span>

        <span>
          <label htmlFor="phone">Phone</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="Enter your phone number"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              setFieldErrors((prev) => ({ ...prev, phone: "" }));
            }}
            required
          />
          {fieldErrors.phone && (
            <div className="error-message">{fieldErrors.phone}</div>
          )}
        </span>

        <span>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setFieldErrors((prev) => ({ ...prev, email: "" }));
            }}
            className="form-control"
            required
          />
          {fieldErrors.email && (
            <div className="error-message">{fieldErrors.email}</div>
          )}
        </span>

        <span>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setFieldErrors((prev) => ({ ...prev, password: "" }));
            }}
            className="form-control"
            required
          />
          {fieldErrors.password && (
            <div className="error-message">{fieldErrors.password}</div>
          )}
        </span>
        <div className="button-container">
          <button type="submit" id="submit">
            Sign Up
          </button>
          <button type="reset" id="reset">
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default Sign_Up;
