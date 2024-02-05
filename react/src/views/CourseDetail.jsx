import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axiosClient from "../axios-client.js";
import Sidebar from "../components/Sidebar.jsx";
import './CSS/courseDetail.css';

export default function CourseDetail() {
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


  useEffect(() => {
    const fetchCourseDetail = async () => {
      try {
        const response = await axiosClient.get(`/courses/${id}`);
        setCourse(response.data);
        console.log('resp', response.data);
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
              style={{maxWidth: "100%", maxHeight: "400px"}}
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
            <button
              type="button"
              className="enroll-button"
              onClick={() => handleEnroll(course.id)}
            >
              Enroll Now
            </button>
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
