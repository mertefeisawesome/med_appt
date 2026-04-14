import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, waitFor, cleanup } from "@testing-library/react";
import Notifications from "./Notifications";

vi.mock("@/components/Navbar/Navbar", () => ({
  default: () => <div data-testid="mock-navbar">Navbar</div>,
}));

describe("Notifications component", () => {
  beforeEach(() => {
    sessionStorage.clear();
    localStorage.clear();
  });

  afterEach(() => {
    cleanup();
    sessionStorage.clear();
    localStorage.clear();
  });

  it("shows appointment information when the user is logged in and appointments exist", async () => {
    sessionStorage.setItem("email", "user@example.com");
    const appointments = [
      {
        id: "1",
        doctor: "Dr. Maya Patel",
        speciality: "Dermatologist",
        date: "2026-05-12",
        time: "10:00 AM",
      },
    ];
    localStorage.setItem("appointments", JSON.stringify(appointments));

    render(
      <Notifications>
        <div>Child content</div>
      </Notifications>,
    );

    expect(screen.getByTestId("mock-navbar")).toBeInTheDocument();
    expect(screen.getByText("Child content")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/Appointment Details/i)).toBeInTheDocument();
    });

    expect(screen.getByText(/Dr\. Maya Patel/i)).toBeInTheDocument();
    expect(screen.getByText(/Dermatologist/i)).toBeInTheDocument();
    expect(screen.getByText(/2026-05-12/i)).toBeInTheDocument();
    expect(screen.getByText(/10:00 AM/i)).toBeInTheDocument();
  });
});
