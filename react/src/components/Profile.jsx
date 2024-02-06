import React, {useState, useEffect} from "react";
import axiosClient from "../axios-client.js";
import Sidebar from "./Sidebar.jsx";
import "./profile.css";

const Profile = ({userType}) => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    bio: "",
    avatar: "",
    education: "",
    occupation: "",
    phone: "",
  });

  useEffect(() => {
    let endpoint;
    if (userType === 'instructor') {
      endpoint = '/instructor-profile';
    } else if (userType === 'student') {
      endpoint = '/student-profile';
    } else {
      console.error(`Invalid userType: ${userType}`);
      return;
    }
    axiosClient.get(endpoint)
      .then(response => {
          setUserData(response.data);
        }
      )
      .catch(error => console.error(`Error fetching ${userType} profile:`, error));
  }, [userType]);


  const {
    name,
    email,
    bio,
    education,
    occupation,
    phone,
  } = userData;

  return (
    <>
      <Sidebar/>
      <main className="content">
        <div className="profile-header">
          <div className="profile-info">
            <h1>{name}</h1>
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
