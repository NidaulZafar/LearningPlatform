import React, {useState, useEffect} from "react";
import axiosClient from "../axios-client.js";
import Sidebar from "./Sidebar.jsx";
import './default.css';

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

  return (
    <>
      <Sidebar/>
      <main className="content">
        <div>
          <h1 style={{marginBottom: '0'}}>{userType === 'instructor' ? 'Instructor' : 'Student'} Profile</h1>
          <span style={{display: 'inline-block'}}>
              Here you can see your {userType} profile.
            </span>
        </div>
        <br/>
        <img
          src={userData.avatar || "default-avatar.jpg"}
          alt={`${userData.name}'s Avatar`}
          className="img-fluid rounded-circle"
        />
        <div>
          <h2>Dashboard</h2>
          <ul>
            <li><strong>Name:</strong> {userData.name}</li>
            <li><strong>Email:</strong> {userData.email}</li>
            <li><strong>Education:</strong> {userData.education || 'Not provided'}</li>
            <li><strong>Phone:</strong> {userData.phone || 'Not provided'}</li>
            <li><strong>Bio:</strong> {userData.bio || 'Not provided'}</li>
          </ul>
        </div>
      </main>
    </>
  );
};

export default Profile;
