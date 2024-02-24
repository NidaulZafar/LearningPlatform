import Sidebar from "./Sidebar.jsx";
import {useState} from "react";

const NewCourse = () => {
  const [courseData, setCourseData] = useState({
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
  });

  return (
    <>
      <Sidebar/>
      <main className="content">
      <h1>New Course Form</h1>
        <p>
          Here you can add a new course.
        </p>
        <form>

        </form>
      </main>
    </>
  );
};

export default NewCourse;
