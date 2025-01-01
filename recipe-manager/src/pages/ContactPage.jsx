import React, { useState } from "react";
import axios from "axios";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    subject: "",
    email: "",
    message: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/messages", formData)
      .then(() => {
        setSuccessMessage("Message sent successfully!");
        setErrorMessage("");
        setFormData({ subject: "", email: "", message: "" }); // Reset form
      })
      .catch(() => {
        setErrorMessage("Failed to send the message. Please try again.");
        setSuccessMessage("");
      });
  };

  return (
    <div>
      <h1>Contact Me</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label>Subject:</label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            required
            style={{ marginLeft: "10px", width: "300px" }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            style={{ marginLeft: "10px", width: "300px" }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label>Message:</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            required
            style={{ marginLeft: "10px", width: "300px", height: "100px" }}
          ></textarea>
        </div>
        <button type="submit" style={{ marginRight: "10px" }}>
          Send
        </button>
      </form>
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </div>
  );
};

export default ContactPage;
