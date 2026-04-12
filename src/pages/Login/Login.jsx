import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "@/../config";
import { Link } from "react-router-dom";
import "./Login.css";

const Login = () => {
  // State variables for email and password
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  // Get navigation function from react-router-dom
  const navigate = useNavigate();

  // Check if user is already authenticated, then redirect to home page
  useEffect(() => {
    if (sessionStorage.getItem("auth-token")) {
      navigate("/");
    }
  }, []);

  // Function to handle login form submission
  const login = async (e) => {
    e.preventDefault();
    // Send a POST request to the login API endpoint
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    // Parse the response JSON
    const json = await res.json();
    if (json.authtoken) {
      // If authentication token is received, store it in session storage
      sessionStorage.setItem("auth-token", json.authtoken);
      sessionStorage.setItem("email", email);

      // Redirect to home page and reload the window
      navigate("/");
      window.location.reload();
    } else {
      // Handle errors if authentication fails
      if (json.errors) {
        for (const error of json.errors) {
          alert(error.msg);
        }
      } else {
        alert(json.error);
      }
    }
  };

  return (
    <div className="form-container">
      <div className="form-header">
        <h1>Login</h1>
        <span>
          Not a member? <Link to="/signup">Sign Up Here</Link>
        </span>
      </div>
      <form onSubmit={login}>
        <span>
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </span>

        <span>
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </span>
        <div className="button-container">
          <button type="submit" id="submit">
            Login
          </button>
          <button type="reset" id="reset">
            Reset
          </button>
        </div>
      </form>
      <div className="form-footer">
        <span>
          <a href="#">Forgot Password?</a>
        </span>
      </div>
    </div>
  );
};

export default Login;
