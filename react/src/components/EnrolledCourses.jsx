import {useStateContext} from "../contexts/ContextProvider.jsx";
import {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";
import Sidebar from "./Sidebar.jsx";

export default function EnrolledCourses() {
  const userContext = useStateContext();
  const [user, setUser] = useState({});
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");


  useEffect(() => {
    fetchStudentData();
    fetchEnrolledCourses();
  }, []);

  const fetchStudentData = async () => {
    try {
      const response = await axiosClient.get('/student-profile');
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching student data:', error);
    }
  };

  const fetchEnrolledCourses = async () => {
    try {
      const response = await axiosClient.get('/enrolled-courses');
      if (Array.isArray(response.data)) {
        console.log('Enrolled courses:', response.data);
        setEnrolledCourses(response.data);
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      console.error('Error fetching enrolled courses', error);
    }
  };

  return (
    <>
      <Sidebar/>
      <h1>Enrolled Courses</h1>
      <div>
        <p>Welcome, {user.name}!</p>
        {errorMessage ? (
          <p>{errorMessage}</p>
        ) : (
          <>
            <p>Your enrolled courses:</p>
            <ul>
              {enrolledCourses.map((enrollment) => (
                <li key={enrollment.id}>
                  <strong>Course Title:</strong> {enrollment.course.title}<br />
                  <strong>Course Description:</strong> {enrollment.course.description}<br />
                  <strong>Enrolled At:</strong> {enrollment.enrolled_at}<br />
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </>
  )
}
