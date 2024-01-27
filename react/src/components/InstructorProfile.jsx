import React, {useState, useEffect} from "react";
import axiosClient from "../axios-client.js";
import Sidebar from "./Sidebar.jsx";

const InstructorProfile = () => {
  const [instructorData, setInstructorData] = useState({
    name: "",
    email: "",
    bio: "",
    avatar: "",
    education: "",
    occupation: "",
    phone: "",
  });

  useEffect(() => {
    axiosClient.get("/instructor-profile").then((response) => {
      setInstructorData(response.data);
    });
  }, []);

  return (
    <div className="layout has-sidebar fixed-sidebar fixed-header">
      <Sidebar/>
      <div id="overlay" className="overlay"></div>
      <div className="layout">
        <main className="content">
          <div>
            <a id="btn-toggle" href="#" className="sidebar-toggler break-point-sm">
              <i className="ri-menu-line ri-xl"></i>
            </a>
            <h1 style={{marginBottom: '0'}}>Instructor Profile</h1>
            <span style={{display: 'inline-block'}}>
              Here you can see your instructor profile.
            </span>
            <br/>
            <img
              src={instructorData.avatar || "default-avatar.jpg"}
              alt={`${instructorData.name}'s Avatar`}
              className="img-fluid rounded-circle"
            />
          </div>
          <div>
            <h2>Dashboard</h2>
            <ul>
              <li><strong>Name:</strong> {instructorData.name}</li>
              <li><strong>Email:</strong> {instructorData.email}</li>
              <li><strong>Education:</strong> {instructorData.education || 'Not provided'}</li>
              <li><strong>Phone:</strong> {instructorData.phone || 'Not provided'}</li>
              <li><strong>Bio:</strong> {instructorData.bio || 'Not provided'}</li>
            </ul>
          </div>
        </main>
      </div>
    </div>
  );
};

export default InstructorProfile;
