import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import axiosClient from "../axios-client.js";
import {useStateContext} from "../contexts/ContextProvider.jsx";
import Sidebar from "../components/Sidebar.jsx";
import './CSS/courses.css';

export default function Courses() {

  const {user} = useStateContext();
  const [courses, setCourses] = useState([{
    id: null,
    title: "",
    instructor: {name: ""},
    description: "",
    cover_image: "",
    created_at: "",
  },]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axiosClient.get("/courses");
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
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
        <h1>Courses</h1>
        <p>
          Here you can see the complete list of courses available.
        </p>
        {user && user.type === "instructor" && (
          <p>
            You're logged in as an instructor. To enroll in a course, please sign in as a student.
            Like to add a new course? <a href="/courses/new">Click here</a>
          </p>
        )}
      </div>
      <div className="course-list">
        {courses.length > 0 ? (
          <div className="course-grid">
            {courses.map((course) => (
              <Link to={`/courses/${course.id}`} key={course.id}>
                <div className="course-card">
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
              </Link>
            ))}
          </div>) : (
          <div>
            <h2>No courses available</h2>
          </div>
        )}
      </div>
    </main>
  </>)
}
