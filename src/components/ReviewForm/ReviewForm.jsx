// Following code has been commented with appropriate comments for your reference.
import React, { useState } from "react";

// Function component for giving reviews
function ReviewForm({ doctor, onClose }) {
  // State variables using useState hook
  const [submittedMessage, setSubmittedMessage] = useState("");
  const [showWarning, setShowWarning] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    review: "",
    rating: 0,
  });
  const [reviewData, setReviewData] = useState(() => {
    const data = localStorage.getItem("reviewData");
    return data ? JSON.parse(data) : [];
  });

  // Function to handle form input changes
  const handleChange = (e) => {
    // Update the form data based on user input
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if all required fields are filled before submission
    if (doctor && formData.name && formData.review && formData.rating > 0) {
      const nextReviewData = [
        ...reviewData,
        {
          ...formData,
          doctor,
        },
      ];
      setReviewData(nextReviewData);
      localStorage.setItem("reviewData", JSON.stringify(nextReviewData));
      setSubmittedMessage(`Review submitted for ${doctor}`);
      setFormData({
        name: "",
        review: "",
        rating: 0,
      });
      setShowWarning(false);
      if (onClose) onClose();
    } else {
      setShowWarning(true);
    }
  };

  if (!doctor) {
    return <div>Please select a doctor to review.</div>;
  }

  return (
    <div>
      <h2>Form with Message</h2>
      <form onSubmit={handleSubmit}>
        <h2>Give Your Feedback</h2>
        {/* Display warning message if not all fields are filled */}
        {showWarning && <p className="warning">Please fill out all fields.</p>}
        <div>
          <label htmlFor="name">Your Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Doctor:</label>
          <div>{doctor || "No doctor selected"}</div>
        </div>
        <div>
          <label htmlFor="review">Review:</label>
          <textarea
            id="review"
            name="review"
            value={formData.review}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="rating">Rating:</label>
          <select
            id="rating"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
          >
            <option value={0}>Select Rating</option>
            <option value={1}>1 Star</option>
            <option value={2}>2 Stars</option>
            <option value={3}>3 Stars</option>
            <option value={4}>4 Stars</option>
            <option value={5}>5 Stars</option>
          </select>
        </div>
        {/* Submit button for form submission */}
        <button type="submit">Submit</button>
      </form>
      {/* Display the submitted message if available */}
      {submittedMessage && (
        <div>
          <h3>Submitted Message:</h3>
          <p>{submittedMessage}</p>
        </div>
      )}
    </div>
  );
}

export default ReviewForm;
