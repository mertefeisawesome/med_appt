import React from "react";
import "./Sign_Up.css";

const Sign_Up = () => {
  return (
    <div className="form-container">
      <div className="form-header">
        <h1>Sign Up</h1>
        <span>
          Already a member? <a href="#">Login</a>
        </span>
      </div>
      <form>
        <span>
          <label for="role">Role</label>
          <select id="role" name="role" required>
            <option value="Patient">Patient</option>
            <option value="Doctor">Doctor</option>
            <option value="Admin">Admin</option>
          </select>
        </span>
        <span>
          <label for="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your name"
            required
          />
        </span>

        <span>
          <label for="phone">Phone</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="Enter your phone number"
            required
          />
        </span>

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
