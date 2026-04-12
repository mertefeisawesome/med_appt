import React from "react";
import { Link } from "react-router-dom";
import "./Login.css";

const Login = () => {
  return (
    <div className="form-container">
      <div className="form-header">
        <h1>Login</h1>
        <span>
          Not a member? <Link to="/signup">Sign Up Here</Link>
        </span>
      </div>
      <form>
        <span>
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
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
