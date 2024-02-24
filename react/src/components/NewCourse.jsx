import Sidebar from "./Sidebar.jsx";
import {useState} from "react";
import axiosClient from "../axios-client.js";
import {useStateContext} from "../contexts/ContextProvider.jsx";

const NewCourse = () => {
  const initialCourseData = {
    title: "",
    code: "",
    description: "",
    coverImage: "",
    price: 0,
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
  };
  const {user} = useStateContext();
  const [courseData, setCourseData] = useState(initialCourseData);

  if (user.type !== 'instructor') {
    return (

      <>
        <Sidebar/>
        <main className="content">
          <h1>Access Denied</h1>
          <p>
            You don't have permission to access this page.
          </p>
        </main>
      </>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('courseData', courseData);
    const response = await axiosClient.post("/courses", courseData);
    console.log(courseData);
    console.log('response', response);
    setCourseData({...initialCourseData})
  };

  const handleCourseDataChange = e => {
    const {name, value} = e.target;
    setCourseData({...courseData, [name]: value});
  };

  const handleModuleDataChange = (index, e) => {
    const { name, value } = e.target;
    const modules = [...courseData.modules];
    modules[index][name] = value;
    setCourseData({ ...courseData, modules });
  };

  const handleVideoDataChange = (moduleIndex, videoIndex, e) => {
    const { name, value } = e.target;
    const modules = [...courseData.modules];
    modules[moduleIndex].videos[videoIndex][name] = value;
    setCourseData({ ...courseData, modules });
  };

  const addModule = () => {
    setCourseData({
      ...courseData,
      modules: [...courseData.modules, {...initialCourseData.modules[0], videos: [initialCourseData.modules[0].videos[0]]}]
    });
  }

  const addVideo = (moduleIndex) => {
    const modules = [...courseData.modules];
    modules[moduleIndex].videos.push({ ...initialCourseData.modules[0].videos[0] });
    setCourseData({ ...courseData, modules });
  };

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
