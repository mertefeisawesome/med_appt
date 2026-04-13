import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import DoctorCard from "./DoctorCard";
import "@testing-library/jest-dom";

describe("DoctorCard Component", () => {
  const mockDoctor = {
    name: "Dr. John Smith",
    speciality: "Cardiologist",
    experience: 10,
    ratings: "⭐⭐⭐⭐⭐",
  };

  it("should render the doctor card without crashing", () => {
    render(<DoctorCard doctor={mockDoctor} />);
    expect(
      screen.getByRole("img", { name: /Doctor Profile/i }),
    ).toBeInTheDocument();
  });

  it("should display the doctor's name", () => {
    render(<DoctorCard doctor={mockDoctor} />);
    expect(screen.getByText("Dr. John Smith")).toBeInTheDocument();
  });

  it("should display the doctor's speciality", () => {
    render(<DoctorCard doctor={mockDoctor} />);
    expect(screen.getByText("Cardiologist")).toBeInTheDocument();
  });

  it("should display the doctor's experience", () => {
    render(<DoctorCard doctor={mockDoctor} />);
    expect(screen.getByText("10 years of experience")).toBeInTheDocument();
  });

  it("should display the doctor's ratings", () => {
    render(<DoctorCard doctor={mockDoctor} />);
    expect(screen.getByText(/Ratings: ⭐⭐⭐⭐⭐/)).toBeInTheDocument();
  });

  it("should display a book appointment button", () => {
    render(<DoctorCard doctor={mockDoctor} />);
    const button = screen.getByRole("button", { name: /Book Appointment/i });
    expect(button).toBeInTheDocument();
  });

  it("should render correctly with different doctor info", () => {
    const differentDoctor = {
      name: "Dr. Sarah Johnson",
      speciality: "Dentist",
      experience: 5,
      ratings: "⭐⭐⭐⭐",
    };
    render(<DoctorCard doctor={differentDoctor} />);
    expect(screen.getByText("Dr. Sarah Johnson")).toBeInTheDocument();
    expect(screen.getByText("Dentist")).toBeInTheDocument();
    expect(screen.getByText("5 years of experience")).toBeInTheDocument();
  });
});
