import React, {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";
import {useStateContext} from "../contexts/ContextProvider.jsx";
import Sidebar from "../components/Sidebar.jsx";

export default function Courses() {

  const {user, token, setUser, setToken} = useStateContext();
  const [student, setStudent] = useState(null);
  const [courses, setCourses] = useState([{
    id: null,
    title: "",
    instructor: { name: "" },
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
        console.log("Courses:", courses);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchUserProfile().then(r => r).catch(e => e);
    fetchCourses().then(r => r).catch(e => e);
  }, [user]);

  function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
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
      <div>
        {courses.length > 0 ? (
        <ul>
          {courses.map((course) => (
            <li key={course.id}>
              <div>
                <h3>{course.title}</h3>
                <p>Instructor: {course.instructor.name}</p>
                <p>Description: {course.description}</p>
                <img
                  src={course.cover_image}
                  alt={`Cover for ${course.title}`}
                  style={{ maxWidth: "100px", maxHeight: "100px" }}
                />
                <p>Created Date: {formatDate(course.created_at)}</p>
              </div>
            </li>
          ))}
        </ul>) : (
          <div>
            <h2>No courses available</h2>
          </div>
        )}
        Like to add a new course? <a href="/courses/new">Click here</a>
      </div>
    </main>
  </>)
}
