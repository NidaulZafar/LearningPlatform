import {useStateContext} from "../contexts/ContextProvider.jsx";
import {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";
import Sidebar from "./Sidebar.jsx";
import {Link} from "react-router-dom";

export default function EnrolledCourses() {
  const {user} = useStateContext();
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");


  useEffect(() => {
    fetchEnrolledCourses().then(r => r).catch(e => e);
  }, []);

  const fetchEnrolledCourses = async () => {
    try {
      const response = await axiosClient.get('/enrolled-courses');
      if (Array.isArray(response.data)) {
        setEnrolledCourses(response.data);
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      console.error('Error fetching enrolled courses', error);
    }
  };

  function formatDate(dateString) {
    const options = {year: 'numeric', month: 'long', day: 'numeric'};
    return new Date(dateString).toLocaleDateString(undefined, options);
  }


  return (<>
    <Sidebar/>
    <main className="content">
      <h1>Enrolled Courses</h1>
      <div className="course-list">
        <p>Welcome, {user.name}!</p>
        {errorMessage ? (<p>{errorMessage}</p>) : (<>
          <p>Here are the courses you have already enrolled:</p>
          <div className="course-grid">
            {enrolledCourses.map((enrollment) => (
              <Link to={`/courses/${enrollment.course.id}`} key={enrollment.course.id}>
                <div key={enrollment.course.id} className="course-card">
                  <img className="course-image"
                       src={enrollment.course.cover_image} alt={enrollment.course.title}/>
                  <div className="course-details">
                    <h3>{enrollment.course.title}</h3>
                    <p>Enrolled on: {formatDate(enrollment.created_at)}</p>
                  </div>
                </div>
              </Link>))}
          </div>
        </>)}
      </div>
    </main>
  </>)
}
