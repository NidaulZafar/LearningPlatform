import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {useStateContext} from "../contexts/ContextProvider.jsx";
import Sidebar from "../components/Sidebar.jsx";
import axiosClient from "../axios-client.js";
import './CSS/courseDetail.css';

const fetchCourseDetail = async (id, setCourse, setError) => {
  try {
    const response = await axiosClient.get(`/courses/${id}`);
    const courseData = response.data;
    const moduleIds = courseData.modules.map(module => module.id);
    const studentModuleResponse = await axiosClient.get('/student_module', {
      params: {
        module_ids: moduleIds.join(','),
      },
    });
    const studentModules = studentModuleResponse.data;
    courseData.modules.forEach((module) => {
      const studentModule = studentModules.find((sm) => sm.module_id === module.id);
      module.status = studentModule ? studentModule.status : "incomplete";
    });
    setCourse(courseData);
  } catch (error) {
    if (error.response && error.response.status === 404) {
      setError("Course not found");
    } else {
      setError("Error fetching course details");
    }
  }
};

const enrollInCourse = async (courseId, setEnrolled, setMessage, setEnrollmentId) => {
  try {
    const response = await axiosClient.post('/enroll', {course_id: courseId});
    const {enrollment_id} = response.data;
    setEnrollmentId(enrollment_id);
    setEnrolled(true);
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
};

const disEnrollFromCourse = async (enrollmentId, setEnrolled, setMessage, setError) => {
  try {
    await axiosClient.delete(`/enroll/${enrollmentId}`);
    setEnrolled(false);
    setMessage("You have successfully dis-enrolled from the course");
    setTimeout(() => {
      setMessage(null);
    }, 3000);
  } catch (error) {
    console.error('Error dis-enrolling from the course:', error);
    setError("Error dis-enrolling from the course");
  }
}

const CourseDetailComponent = ({
                                 course, enrolled, enrollmentId, handleEnroll, handleUnenroll, message, user
                               }) => {
  const {
    title, instructor: {name: instructorName}, cover_image, description, price, modules,
  } = course;


  return (<div className="course-detail">
    <img
      src={cover_image}
      alt={`Cover for ${title}`}
    />
    <h2>{title}</h2>
    <p>Instructor: {instructorName}</p>
    <p>Description: {description}</p>
    <p>Price: ${price}</p>
    {modules.length > 0 && (<>
      <h3>Modules</h3>
      <p>This course has the following {modules.length} Modules:</p>
      <ul>
        {modules.map((module) => (<li key={module.id}>
          {enrolled ? (<Link to={`/module/${module.id}`}>
            {module.title} - {module.status === "completed" ? "(Completed)" : "(Incomplete)"}
          </Link>) : (module.title)}
        </li>))}
      </ul>
    </>)}
    {user && user.type === 'student' && (
      <EnrollmentButton enrolled={enrolled} handleEnroll={handleEnroll} handleUnenroll={handleUnenroll}
                        courseId={course.id} enrollmentId={enrollmentId}/>)}
    {message && (<div className="message">
      {message}
    </div>)}
    <Link to={`/courses`}>
      <button>All Courses</button>
    </Link>
  </div>);
}

const EnrollmentButton = ({enrolled, handleEnroll, handleUnenroll, courseId, enrollmentId}) => {
  return (<div>
    {!enrolled ? (<button
      type="button"
      className="enroll-button"
      onClick={() => handleEnroll(courseId)}
    >
      Enroll Now
    </button>) : (<button
      type="button"
      className="enroll-button"
      onClick={() => handleUnenroll(enrollmentId)}
    >
      Dis-enroll
    </button>)}
  </div>);
}

const CourseDetail = () => {
  const {user} = useStateContext();
  const {id} = useParams();
  const [course, setCourse] = useState({
    title: "", instructor: {name: ""}, cover_image: "", description: "", price: 0, modules: [],
  });
  const [enrolled, setEnrolled] = useState(false);
  const [message, setMessage] = useState(null);
  const [enrollmentId, setEnrollmentId] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCourseDetail(id, setCourse, setError)
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          setError("Course not found");
        } else {
          console.error('Error fetching course details:', error);
          setError("Error fetching course details");
        }
      });
  }, [id]);

  useEffect(() => {
    if (course["enrollments"]) {
      const enrolledStatus = course["enrollments"].some(enrollment => enrollment.status === 'enrolled');
      if (user && user.type === 'student' && enrolledStatus) {
        setEnrolled(true);
        const enrolledEnrollment = course["enrollments"].find(enrollment => enrollment.status === 'enrolled');
        setEnrollmentId(enrolledEnrollment.id);
      } else {
        setEnrolled(false);
        setEnrollmentId(null);
      }
    }
  }, [course, user]);

  const handleEnroll = async (courseId) => {
    await enrollInCourse(courseId, setEnrolled, setMessage, setEnrollmentId, setError);
  }

  const handleUnenroll = async (enrollmentId) => {
    await disEnrollFromCourse(enrollmentId, setEnrolled, setMessage, setError);
  }

  return (<>
    <Sidebar/>
    <main className="content">
      {error ? (<div>
        <h2>Error: {error}</h2>
      </div>) : (<CourseDetailComponent course={course} enrolled={enrolled} enrollmentId={enrollmentId}
                                        handleEnroll={handleEnroll} handleUnenroll={handleUnenroll}
                                        message={message}
                                        error={error} user={user}/>)}
    </main>
  </>);
}
export default CourseDetail;
