import React, { useState } from "react";
import "../Css/Register.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_ENDPOINT } from "./Config";

const AdminProjectPayment = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [fee, setFee] = useState("");
  const [link, setLink] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async () => {
    const url = API_ENDPOINT + "admin_project_payment.php";

    let fData = new FormData();
    fData.append("title", title);
    fData.append("description", description);
    fData.append("fee", fee);
    fData.append("link", link);

    try {
      const response = await axios.post(url, fData);
      setSuccess(response.data.message || "Submission successful.");
      setError("");

      // Clear form fields after successful submission
      setTitle("");
      setDescription("");
      setFee("");
      setLink("");
    } catch (error) {
      console.error(error);
      setError("An error occurred while submitting.");
      setSuccess("");
    }
  };

  return (
    <div id="content">
      <div className="formbody">
        <div className="form-container">
          <h2>Student Project Fees Upload</h2>
          <Link className="text-link button" to="/admindash">
            Back To Dashboard
          </Link>
          {error && <p style={{ color: "red", margin: 15 }}>{error}</p>}
          {success && <p style={{ color: "green", margin: 15 }}>{success}</p>}
          <form className="projectform">
            <div className="form-group">
              <label htmlFor="title">Project Fee Title:</label>
              <input
                id="title"
                name="title"
                placeholder="Enter Title"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Project Fee Description:</label>
              <textarea
                id="description"
                name="description"
                placeholder="Enter Description"
                rows="10"
                cols="50"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="fee">Fee Amount:</label>
              <input
                id="fee"
                name="fee"
                placeholder="Enter the Fee Amount"
                required
                value={fee}
                onChange={(e) => setFee(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="link">Project Fee Payment Link:</label>
              <input
                id="link"
                name="link"
                placeholder="Enter link"
                required
                value={link}
                onChange={(e) => setLink(e.target.value)}
              />
            </div>
            <div className="form-group">
              <button
                type="button"
                value="SEND"
                name="send"
                id="send"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminProjectPayment;
