import React, {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";
import {useStateContext} from "../contexts/ContextProvider.jsx";
import Sidebar from "../components/Sidebar.jsx";

export default function Courses() {

  const {user, token, setUser, setToken} = useStateContext();
  const [student, setStudent] = useState(null);


  if (!user) {
    return <div>Loading...</div>;
  }

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        let profileEndpoint = '';
        if (user?.type === 'student') {
          profileEndpoint = '/student-profile';
        } else if (user?.type === 'teacher') {
          profileEndpoint = '/teacher-profile';
        }

        if (profileEndpoint) {
          const response = await axiosClient.get(profileEndpoint);
          setStudent(response.data);
        }
      } catch (error) {
        console.error(`Error fetching ${user?.type} profile:`, error);
      }
    };

    fetchUserProfile();
  }, [user]);


  return (
    <>
      <Sidebar/>
      <main className="content">
        <div>
          <h1 style={{marginBottom: '0'}}>Courses</h1>
          <span style={{display: 'inline-block'}}>
              Here you can see the complete list of courses available.
            </span>
          <br/>
        </div>
        <div>
          <ul>
            <li>Course 1</li>
            <li>Course 2</li>
            <li>Course 3</li>
          </ul>
          Like to add a new course? <a href="/courses/new">Click here</a>
        </div>
      </main>
    </>
  )
}
