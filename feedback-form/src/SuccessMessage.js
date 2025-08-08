import React from "react";

const SuccessMessage = ({ name }) => {
  return (
    <div style={{ color: "green" }}>
      <h2>✅ Thank you, {name}!</h2>
      <p>Your feedback has been submitted successfully.</p>
    </div>
  );
};

export default SuccessMessage;
