import React, { useState, useEffect } from "react";
import axiosClient from "../axios-client.js";

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
    // Fetch instructor data from the server based on the user's ID or other identifier
    axiosClient.get("/instructor-profile").then((response) => {
      setInstructorData(response.data);
    });
  }, []); // Empty dependency array ensures the effect runs only once after the initial render

  return (
    <div>
      <h3>Instructor Profile</h3>
      <div className="row">
        <div className="col-md-4">
          <img
            src={instructorData.avatar || "default-avatar.jpg"}
            alt={`${instructorData.name}'s Avatar`}
            className="img-fluid rounded-circle"
          />
        </div>
        <div className="col-md-8">
          <h4>{instructorData.name}</h4>
          <p>Email: {instructorData.email}</p>
          <p>Bio: {instructorData.bio  || 'Not Provided'}</p>
          <p>Education: {instructorData.education || 'Not Provided'}</p>
          <p>Occupation: {instructorData.occupation || 'Not Provided'}</p>
          <p>Phone: {instructorData.phone || 'Not Provided'}</p>
        </div>
      </div>
    </div>
  );
};

export default InstructorProfile;
