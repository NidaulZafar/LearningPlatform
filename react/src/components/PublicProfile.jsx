import React, { useState, useEffect } from 'react';
import axiosClient from "../axios-client.js";
import Sidebar from "./Sidebar.jsx";
import "./styles/profile.css";
import { useStateContext } from "../contexts/ContextProvider.jsx";
import {useParams} from "react-router-dom";

const PublicProfile = () => {

  const { user, setUser } = useStateContext();
  const { instructorId } = useParams();
  const [instructor, setInstructor] = useState(null);

  useEffect(() => {
    const fetchPublicProfile = async () => {
      try {
        const response = await axiosClient.get(`/instructors/${instructorId}`);
        console.log(response.data);
        setInstructor(response.data);
      } catch (error) {
        console.error('Error fetching instructor:', error);
      }
    };

    fetchPublicProfile();
  }, [instructorId]);

  if (!instructor) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Sidebar/>
      <main className="content">
        <div className="profile">
          <div className="profile-header">
            <img src={instructor.avatar} alt={instructor.name}/>
            <h1>{instructor.name}</h1>
          </div>
          <div className="profile-info">
            <p><strong>Email:</strong></p><p>{instructor.email}</p>
            <p><strong>Phone:</strong></p><p>{instructor.phone}</p>
            <p><strong>Education:</strong></p><p>{instructor.education}</p>
            <p><strong>Occupation:</strong></p><p>{instructor.occupation}</p>
          </div>
          <div className="profile-bio">
            <p><strong>Bio:</strong></p><p>{instructor.bio}</p>
          </div>
        </div>
      </main>
    </>
  );
};

export default PublicProfile;
