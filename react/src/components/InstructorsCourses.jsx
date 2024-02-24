import Sidebar from "./Sidebar.jsx";
import {useStateContext} from "../contexts/ContextProvider.jsx";
import React, {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";
import {Link} from "react-router-dom";

const InstructorsCourses = () => {
  const {user} = useStateContext();
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axiosClient.get(`/courses/instructor/${user.id}`);
        setCourses(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };
    fetchCourses();
  }, [user.id]);

  const formatDate = dateString => {
    const options = {year: 'numeric', month: 'long', day: 'numeric'};
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (<>
    <Sidebar/>
    <main className="content">
      <h1>Your Courses</h1>
      <p>Here you will the courses created by you. </p>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="course-list">
          {courses.length > 0 ? (
            <div className="course-grid">
              {courses.map((course) => (
                <Link to={`/courses/${course.id}`} key={course.id}>
                  <div className="course-card">
                    <img
                      className="course-image"
                      src={course.cover_image || "https://via.placeholder.com/300x200"}
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
              <h2>Currently no courses authored by you available. <Link to="/courses/new">Click here</Link> to create your first course</h2>
            </div>
          )}
        </div>
      )}
    </main>
  </>)
};

export default InstructorsCourses;
