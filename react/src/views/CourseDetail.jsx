import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axiosClient from "../axios-client.js";
import Sidebar from "../components/Sidebar.jsx";

export default function CourseDetail() {
  const {id} = useParams();
  const [course, setCourse] = useState(null);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchCourseDetail = async () => {
      try {
        const response = await axiosClient.get(`/courses/${id}`);
        setCourse(response.data);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setError("Course not found");
        } else {
          setError("Error fetching course details");
        }
      }
    };

    fetchCourseDetail();
  }, [id]);

  return (
    <>
      <Sidebar/>
      <main className="content">
        {course ? (
          <div className="course-detail">
            <h2>{course.title}</h2>
            <p>Instructor: {course.instructor.name}</p>
            <p>Description: {course.description}</p>
            <img
              src={course.cover_image}
              alt={`Cover for ${course.title}`}
              style={{maxWidth: "100%", maxHeight: "400px"}}
            />
          </div>
        ) : (
          <div>
            {error ? (
              <h2>{error}</h2>
            ) : (
              <h2>Loading...</h2>
            )}
          </div>
        )}
      </main>
    </>
  );
}
