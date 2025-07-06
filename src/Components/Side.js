import React from "react";
import { Link } from "react-router-dom";
import "../Css/AdminDash.css"

const Side = ({ email }) => {
  return (
    <div>
      <div id="sidebar">
        <div className="profile">
          <p>Welcome,</p>
          <p className="user-email">{email}</p>
        </div>
        <ul className="nav-list">
          <li className="nav-item">
            <Link className="side-text-link" to="/admindash/adminexternalinternship">External Internships</Link>
          </li>
          <li className="nav-item">
            <Link className="side-text-link" to="/admindash/admininternalinternship">Internal Internships</Link>
          </li>
          <li className="nav-item">
            <Link className="side-text-link" to="/admindash/adminexternalmembership">External Memberships</Link>
          </li>
          <li className="nav-item">
            <Link className="side-text-link" to="/admindash/adminstaffmembership">Staff Memberships</Link>
          </li>
          <li className="nav-item">
            <Link className="side-text-link" to="/admindash/adminstudentmembership">Student Memberships</Link>
          </li>
          <li className="nav-item">
            <Link className="side-text-link" to="/admindash/adminstudentproject">Add Student Projects</Link>
          </li>
          <li className="nav-item">
            <Link className="side-text-link" to="/admindash/adminviewstudentprojects">View Student Projects</Link>
          </li>
          <li className="nav-item">
            <Link className="side-text-link" to="/admindash/adminprojectinformation">Add Student Projects Information</Link>
          </li>
          <li className="nav-item">
            <Link className="side-text-link" to="/admindash/adminviewprojectinformation">View Student Projects Information</Link>
          </li>
          <li className="nav-item">
            <Link className="side-text-link" to="/admindash/adminprojectpayment">Add Student Projects Fee</Link>
          </li>
          <li className="nav-item">
            <Link className="side-text-link" to="/admindash/adminviewprojectpayment">View Student Projects Fee</Link>
          </li>
          <li className="nav-item">
            <Link className="side-text-link" to="/admindash/adminviewreceipts">View Student Projects Receipts</Link>
          </li>
          <li className="nav-item">
            <Link className="side-text-link" to="/admindash/adminviewstudents">View Students Payment Status</Link>
          </li>
          <li className="nav-item">
            <Link className="side-text-link" to="/admindash/adminprojectuploads">View Project Uploads</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Side;
