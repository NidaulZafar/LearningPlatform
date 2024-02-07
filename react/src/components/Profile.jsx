import React, {useState, useEffect} from "react";
import axiosClient from "../axios-client.js";
import Sidebar from "./Sidebar.jsx";
import "./profile.css";
import {useStateContext} from "../contexts/ContextProvider.jsx";

const Profile = ({userType}) => {
  const {user} = useStateContext();

  const {
    name,
    email,
    bio,
    education,
    occupation,
    phone,
  } = user;

  return (
    <>
      <Sidebar/>
      <main className="content">
        <div className="profile-header">
          <div className="profile-info">
            <h1>{name}</h1><h3>({userType} Profile)</h3>
            <p>{occupation || 'Occupation Not provided'}</p>
          </div>
        </div>
        <div className="profile-details">
          <h2>About Me</h2>
          <p>{bio || "Bio not provided"}</p>
          <h2>Contact Information</h2>
          <ul>
            <li>
              <strong>Email:</strong> {email}
            </li>
            <li>
              <strong>Phone:</strong>{" "}
              {phone || "Phone number not provided"}
            </li>
          </ul>
          {userType === "instructor" && (
            <>
              <h2>Teaching Experience</h2>
              <p>{bio || "Not available"}</p>
            </>
          )}
          <h2>Education</h2>
          <p>{education || "Education not provided"}</p>
        </div>
      </main>
    </>
  );
};

export default Profile;
