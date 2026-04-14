import React from "react";
import "./Reviews.css";
import { useState } from "react";
import ReviewForm from "@/components/ReviewForm/ReviewForm";

const Reviews = () => {
  const [appointments] = useState(() => {
    const data = localStorage.getItem("appointments");
    return data ? JSON.parse(data) : [];
  });
  const [reviewData, setReviewData] = useState(() => {
    const data = localStorage.getItem("reviewData");
    return data ? JSON.parse(data) : [];
  });
  const [selectedDoctor, setSelectedDoctor] = useState("");

  const handleReviewSaved = () => {
    setSelectedDoctor("");
    const data = localStorage.getItem("reviewData");
    if (data) {
      setReviewData(JSON.parse(data));
    }
  };

  return (
    <div className="reviews">
      <h1>Reviews</h1>
      <table>
        <thead>
          <tr>
            <th>Doctor Name</th>
            <th>Speciality</th>
            <th>Provide Feedback</th>
            <th>Review Given</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => {
            const doctorReviews = reviewData.filter(
              (review) => review.doctor === appointment.doctor,
            );
            return (
              <tr key={appointment.id}>
                <td>{appointment.doctor}</td>
                <td>{appointment.speciality}</td>
                <td>
                  <button onClick={() => setSelectedDoctor(appointment.doctor)}>
                    Provide Feedback
                  </button>
                </td>
                <td>
                  {doctorReviews.length > 0 ? (
                    doctorReviews.map((review, index) => (
                      <div key={index}>
                        <p>
                          <strong>Rating:</strong> {review.rating} / 5
                        </p>
                        <p>{review.review}</p>
                      </div>
                    ))
                  ) : (
                    <p>No review given yet.</p>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {selectedDoctor && (
        <div className="review-form-section">
          <h2>Leave a review for {selectedDoctor}</h2>
          <ReviewForm doctor={selectedDoctor} onClose={handleReviewSaved} />
        </div>
      )}
    </div>
  );
};

export default Reviews;
