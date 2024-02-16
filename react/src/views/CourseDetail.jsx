import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axiosClient from "../axios-client.js";
import Sidebar from "../components/Sidebar.jsx";
import './CSS/courseDetail.css';
import {useStateContext} from "../contexts/ContextProvider.jsx";

export default function CourseDetail() {
  const {user} = useStateContext();
  const {id} = useParams();
  const [course, setCourse] = useState({
    title: "",
    instructor: {name: ""},
    cover_image: "",
    description: "",
    price: 0,
    modules: [],
  });
  const [error, setError] = useState(null);
  const [enrolled, setEnrolled] = useState(false);
  const [message, setMessage] = useState(null);
  const [enrollmentId, setEnrollmentId] = useState(null);


  useEffect(() => {
    const fetchCourseDetail = async () => {
      try {
        const response = await axiosClient.get(`/courses/${id}`);
        setCourse(response.data);
        if (user && user.type === 'student' && response.data.enrolled) {
          setEnrolled(true);
          setEnrollmentId(response.data.enrollments[0].id);
        } else {
          setEnrolled(false);
          setEnrollmentId(null);
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setError("Course not found");
        } else {
          setError("Error fetching course details");
        }
      }
    };

    fetchCourseDetail();
  }, [id, user]);

  const handleEnroll = async (courseId) => {
    try {
      const response = await axiosClient.post('/enroll', {course_id: courseId});
      console.log('Enrollment response:', response.data);
      const {enrollment_id} = response.data;
      setEnrollmentId(enrollment_id);
      setEnrolled(true);
      localStorage.setItem(`enrolled_${enrollment_id}`, "true");
      setMessage("You have successfully enrolled in the course");
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    } catch (error) {
      console.error('Error enrolling in the course:', error);
      setMessage(error.response.data.message);
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    }
  }


  const handleUnenroll = async (enrollmentId) => {
    try {
      await axiosClient.delete(`/enroll/${enrollmentId}`);
      setEnrolled(false);
      localStorage.removeItem(`enrolled_${enrollmentId}`);
      setMessage("You have successfully dis-enrolled from the course");
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    } catch (error) {
      console.error('Error dis-enrolling from the course:', error);
      setError("Error dis-enrolling from the course");
    }
  }


  if (!course) {
    return (
      <>
        <Sidebar/>
        <main className="content">
          {error ? (
            <div>
              <h2>Error: {error}</h2>
            </div>
          ) : (
            <div>
              <h2>Loading...</h2>
            </div>
          )}
        </main>
      </>
    );
  }


  const {
    title,
    instructor: {name: instructorName},
    cover_image,
    description,
    price,
    modules,
  } = course;

  return (
    <>
      <Sidebar/>
      <main className="content">
        {course ? (
          <div className="course-detail">
            <img
              src={cover_image}
              alt={`Cover for ${title}`}
            />
            <h2>{title}</h2>
            <p>Instructor: {instructorName}</p>
            <p>Description: {description}</p>
            <p>Price: ${price}</p>
            {modules.length > 0 && (
              <>
                <h3>Modules</h3>
                <p>This course has the following {modules.length} Modules:</p>
                <ul>
                  {modules.map((module) => (
                    <li key={module.id}>{module.title}</li>
                  ))}
                </ul>
              </>
            )}
            {user && user.type === 'student' && (
              <div>
                {!enrolled ? (
                  <button
                    type="button"
                    className="enroll-button"
                    onClick={() => handleEnroll(course.id)}
                  >
                    Enroll Now
                  </button>
                ) : (
                  <button
                    type="button"
                    className="enroll-button"
                    onClick={() => handleUnenroll(enrollmentId)}
                  >
                    Dis-enroll
                  </button>
                )}
              </div>
            )}
            {message && (
              <div className="message">
                {message}
              </div>
            )}
          </div>
        ) : (
          <div>
            {error ? (
              <h2>Error: {error}</h2>
            ) : (
              <h2>Loading...</h2>
            )}
          </div>
        )}
      </main>
    </>
  );
}
