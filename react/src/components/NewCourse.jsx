import Sidebar from "./Sidebar.jsx";
import {useState} from "react";

const NewCourse = () => {
  const initialCourseData = {
    title: "",
    code: "",
    description: "",
    coverImage: "",
    price: 0,
    instructorId: '',
    modules: [
      {
        title: "",
        description: "",
        duration: 0,
        content: "",
        videos: [
          {
            title: "",
            videoUrl: "",
            duration: 0,
            thumbnail: "",
            description: "",
            content: ""
          }
        ]
      }
    ]
  }
  const [courseData, setCourseData] = useState(initialCourseData);

  const handleSubmit = (e) => {
    e.preventDefault();
    // send courseData to the server

    console.log(courseData);
  //   reset the form
    setCourseData({...initialCourseData})
  };

  function handleCourseDataChange() {
    const {name, value} = e.target;
    setCourseData({...courseData, [name]: value});
  }

  return (
    <>
      <Sidebar/>
      <main className="content">
      <h1>New Course Form</h1>
        <p>
          Here you can add a new course.
        </p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={courseData.title}
            onChange={handleCourseDataChange}
          />

        </form>
      </main>
    </>
  );
};

export default NewCourse;
