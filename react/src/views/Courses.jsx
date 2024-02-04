import React, {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";
import {useStateContext} from "../contexts/ContextProvider.jsx";
import Sidebar from "../components/Sidebar.jsx";
import './CSS/courses.css';

export default function Courses() {

  const {user, token, setUser, setToken} = useStateContext();
  const [student, setStudent] = useState(null);
  const [courses, setCourses] = useState([{
    id: null,
    title: "",
    instructor: {name: ""},
    description: "",
    cover_image: "",
    created_at: "",
  },]);


  if (!user) {
    return <div>Loading...</div>;
  }

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        let profileEndpoint = '';
        if (user?.type === 'student') {
          profileEndpoint = '/student-profile';
        } else if (user?.type === 'instructor') {
          profileEndpoint = '/instructor-profile';
        }

        if (profileEndpoint) {
          const response = await axiosClient.get(profileEndpoint);
          setStudent(response.data);
        }
      } catch (error) {
        console.error(`Error fetching ${user?.type} profile:`, error);
      }
    };

    const fetchCourses = async () => {
      try {
        const response = await axiosClient.get("/courses");
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchUserProfile().then(r => r).catch(e => e);
    fetchCourses().then(r => r).catch(e => e);
  }, [user]);

  function formatDate(dateString) {
    const options = {year: 'numeric', month: 'long', day: 'numeric'};
    return new Date(dateString).toLocaleDateString(undefined, options);
  }


  return (<>
    <Sidebar/>
    <main className="content">
      <div>
        <h1 style={{marginBottom: '0'}}>Courses</h1>
        <span style={{display: 'inline-block'}}>
              Here you can see the complete list of courses available.
            </span>
        <br/>
      </div>
      <div className="course-list">
        {courses.length > 0 ? (
          <div className="course-grid">
            {courses.map((course) => (
              <div className="course-card" key={course.id}>
                <img
                  className="course-image"
                  src={course.cover_image}
                  alt={`Cover for ${course.title}`}
                />
                <div className="course-details">
                  <h3>{course.title}</h3>
                  <p className="instructor">Instructor: {course.instructor.name}</p>
                  <p className="description">Description: {course.description}</p>
                  <p className="created-date">Created Date: {formatDate(course.created_at)}</p>
                </div>
              </div>
            ))}
          </div>) : (
          <div>
            <h2>No courses available</h2>
          </div>
        )}
        Like to add a new course? <a href="/courses/new">Click here</a>
      </div>
    </main>
  </>)
}
