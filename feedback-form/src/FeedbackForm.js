import React, { useState } from "react";
import SuccessMessage from "./SuccessMessage";

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    department: "",
    rating: "",
    comments: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    return (
      formData.name.trim() &&
      formData.department.trim() &&
      formData.rating.trim()
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      alert("Please fill all required fields.");
      return;
    }

    
    try {
      await fetch("http://localhost:3001/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      setSubmitted(true);
    } catch (error) {
      alert("Failed to submit: " + error.message);
    }
  };

  if (submitted) {
    return <SuccessMessage name={formData.name} />;
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "500px" }}>
      <label>
        Name:
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <label>
        Department:
        <input
          name="department"
          value={formData.department}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <label>
        Rating (1-5):
        <input
          name="rating"
          type="number"
          min="1"
          max="5"
          value={formData.rating}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <label>
        Comments:
        <textarea
          name="comments"
          value={formData.comments}
          onChange={handleChange}
        />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default FeedbackForm;
