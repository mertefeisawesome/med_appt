import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  cleanup,
} from "@testing-library/react";
import Reviews from "./Reviews";

vi.mock("@/components/ReviewForm/ReviewForm", () => ({
  default: ({ doctor, onClose }) => (
    <div data-testid="review-form">
      <p>Reviewing {doctor}</p>
      <button onClick={onClose} data-testid="close-review">
        Close
      </button>
    </div>
  ),
}));

describe("Reviews component", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    cleanup();
    localStorage.clear();
  });

  it("renders appointments table and filters reviews by doctor", () => {
    const appointments = [
      {
        id: "1",
        doctor: "Dr. Smith",
        speciality: "Cardiology",
      },
      {
        id: "2",
        doctor: "Dr. Jones",
        speciality: "Dermatology",
      },
    ];
    const reviewData = [
      {
        doctor: "Dr. Smith",
        name: "John",
        review: "Great doctor",
        rating: 5,
      },
      {
        doctor: "Dr. Jones",
        name: "Jane",
        review: "Okay",
        rating: 3,
      },
    ];

    localStorage.setItem("appointments", JSON.stringify(appointments));
    localStorage.setItem("reviewData", JSON.stringify(reviewData));

    render(<Reviews />);

    expect(screen.getByText("Reviews")).toBeInTheDocument();
    expect(screen.getByText("Dr. Smith")).toBeInTheDocument();
    expect(screen.getByText("Dr. Jones")).toBeInTheDocument();

    // Check reviews are filtered
    expect(screen.getByText("Great doctor")).toBeInTheDocument();
    expect(screen.getByText("Okay")).toBeInTheDocument();
  });

  it("shows review form when Provide Feedback is clicked", () => {
    const appointments = [
      {
        id: "1",
        doctor: "Dr. Smith",
        speciality: "Cardiology",
      },
    ];

    localStorage.setItem("appointments", JSON.stringify(appointments));

    render(<Reviews />);

    const button = screen.getByRole("button", { name: "Provide Feedback" });
    fireEvent.click(button);

    expect(screen.getByTestId("review-form")).toBeInTheDocument();
    expect(screen.getByText("Reviewing Dr. Smith")).toBeInTheDocument();
  });

  it("closes review form when onClose is called", async () => {
    const appointments = [
      {
        id: "1",
        doctor: "Dr. Smith",
        speciality: "Cardiology",
      },
    ];

    localStorage.setItem("appointments", JSON.stringify(appointments));

    render(<Reviews />);

    const button = screen.getByRole("button", { name: "Provide Feedback" });
    fireEvent.click(button);

    expect(screen.getByTestId("review-form")).toBeInTheDocument();

    const closeButton = screen.getByTestId("close-review");
    fireEvent.click(closeButton);

    await waitFor(() => {
      expect(screen.queryByTestId("review-form")).not.toBeInTheDocument();
    });
  });
});
