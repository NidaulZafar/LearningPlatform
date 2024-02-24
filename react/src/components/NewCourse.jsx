import Sidebar from "./Sidebar.jsx";
import {useState} from "react";
import axiosClient from "../axios-client.js";
import {useStateContext} from "../contexts/ContextProvider.jsx";
import './styles/newCourse.css';

const NewCourse = () => {
  const initialCourseData = {
    title: "", code: "", description: "", coverImage: "", price: 0, modules: [{
      title: "", description: "", duration: 0, content: "", videos: [{
        title: "", video_url: "", duration: 0, thumbnail: "", description: "", content: ""
      }]
    }]
  };
  const {user} = useStateContext();
  const [courseData, setCourseData] = useState(initialCourseData);

  if (user.type !== 'instructor') {
    return (

      <>
        <Sidebar/>
        <main className="content">
          <div className="access-denied">
            <h1>Access Denied</h1>
            <p>
              You don't have permission to access this page.
            </p>
          </div>
        </main>
      </>);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosClient.post("/courses", courseData);
      setCourseData({...initialCourseData})
    }
    catch (error) {
      console.error(error);
    }
  };

  const handleCourseDataChange = e => {
    const {name, value} = e.target;
    setCourseData({...courseData, [name]: value});
  };

  const handleModuleDataChange = (index, e) => {
    const {name, value} = e.target;
    const modules = [...courseData.modules];
    modules[index][name] = value;
    setCourseData({...courseData, modules});
  };

  const handleVideoDataChange = (moduleIndex, videoIndex, e) => {
    const {name, value} = e.target;
    const modules = [...courseData.modules];
    modules[moduleIndex].videos[videoIndex][name] = value;
    setCourseData({...courseData, modules});
  };

  const addModule = () => {
    setCourseData({
      ...courseData, modules: [...courseData.modules, {
        ...initialCourseData.modules[0], videos: [initialCourseData.modules[0].videos[0]]
      }]
    });
  }

  const addVideo = (moduleIndex) => {
    const modules = [...courseData.modules];
    modules[moduleIndex].videos.push({...initialCourseData.modules[0].videos[0]});
    setCourseData({...courseData, modules});
  };

  return (<>
    <Sidebar/>
    <main className="content">
      <div className="new-course-form">
        <h1>New Course Form</h1>
        <p>Here you can add a new course.</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={courseData.title}
              onChange={handleCourseDataChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="code">Code:</label>
            <input
              type="text"
              id="code"
              name="code"
              value={courseData.code}
              onChange={handleCourseDataChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              value={courseData.description}
              onChange={handleCourseDataChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="coverImage">Cover Image:</label>
            <input
              type="text"
              id="coverImage"
              name="coverImage"
              value={courseData.coverImage}
              onChange={handleCourseDataChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price:</label>
            <input
              type="number"
              id="price"
              name="price"
              value={courseData.price}
              onChange={handleCourseDataChange}
            />
          </div>

          <h2>Modules</h2>
          {courseData.modules.map((module, moduleIndex) => (<div className="module" key={`module-${moduleIndex}`}>
            <h2>Module {moduleIndex + 1}</h2>
            <div className="form-group">
              <label htmlFor={`module-title-${moduleIndex}`}>Title:</label>
              <input
                type="text"
                id={`module-title-${moduleIndex}`}
                name="title"
                value={module.title}
                onChange={(e) => handleModuleDataChange(moduleIndex, e)}
              />
            </div>
            <div className="form-group">
              <label htmlFor={`module-description-${moduleIndex}`}>Description:</label>
              <textarea
                id={`module-description-${moduleIndex}`}
                name="description"
                value={module.description}
                onChange={(e) => handleModuleDataChange(moduleIndex, e)}
              />
            </div>
            <div className="form-group">
              <label htmlFor={`module-duration-${moduleIndex}`}>Duration:</label>
              <input
                type="number"
                id={`module-duration-${moduleIndex}`}
                name="duration"
                value={module.duration}
                onChange={(e) => handleModuleDataChange(moduleIndex, e)}
              />
            </div>
            <div className="form-group">
              <label htmlFor={`module-content-${moduleIndex}`}>Content:</label>
              <textarea
                id={`module-content-${moduleIndex}`}
                name="content"
                value={module.content}
                onChange={(e) => handleModuleDataChange(moduleIndex, e)}
              />
            </div>

            {module.videos.map((video, videoIndex) => (<div key={`video-${moduleIndex}-${videoIndex}`}>
              <h3>Video {videoIndex + 1}</h3>
              <div className="form-group">
                <label htmlFor={`video-title-${moduleIndex}-${videoIndex}`}>Title:</label>
                <input
                  type="text"
                  id={`video-title-${moduleIndex}-${videoIndex}`}
                  name="title"
                  value={video.title}
                  onChange={(e) => handleVideoDataChange(moduleIndex, videoIndex, e)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor={`video-video_url-${moduleIndex}-${videoIndex}`}>Video URL:</label>
                <input
                  type="text"
                  id={`video-video_url-${moduleIndex}-${videoIndex}`}
                  name="video_url"
                  value={video.video_url}
                  onChange={(e) => handleVideoDataChange(moduleIndex, videoIndex, e)}
                />
              </div>
              <div className="form-group">
                <label htmlFor={`video-duration-${moduleIndex}-${videoIndex}`}>Duration:</label>
                <input
                  type="number"
                  id={`video-duration-${moduleIndex}-${videoIndex}`}
                  name="duration"
                  value={video.duration}
                  onChange={(e) => handleVideoDataChange(moduleIndex, videoIndex, e)}
                />
              </div>
              <div className="form-group">
                <label htmlFor={`video-thumbnail-${moduleIndex}-${videoIndex}`}>Thumbnail:</label>
                <input
                  type="text"
                  id={`video-thumbnail-${moduleIndex}-${videoIndex}`}
                  name="thumbnail"
                  value={video.thumbnail}
                  onChange={(e) => handleVideoDataChange(moduleIndex, videoIndex, e)}
                />
              </div>
              <div className="form-group">
                <label htmlFor={`video-description-${moduleIndex}-${videoIndex}`}>Description:</label>
                <textarea
                  id={`video-description-${moduleIndex}-${videoIndex}`}
                  name="description"
                  value={video.description}
                  onChange={(e) => handleVideoDataChange(moduleIndex, videoIndex, e)}
                />
              </div>
              <div className="form-group">
                <label htmlFor={`video-content-${moduleIndex}-${videoIndex}`}>Content:</label>
                <textarea
                  id={`video-content-${moduleIndex}-${videoIndex}`}
                  name="content"
                  value={video.content}
                  onChange={(e) => handleVideoDataChange(moduleIndex, videoIndex, e)}
                />
              </div>
            </div>))}
            <button type="button" onClick={() => addVideo(moduleIndex)}>
              Add Video
            </button>
          </div>))}
          <button type="button" onClick={addModule}>
            Add Module
          </button>
          <div className="form-group">
          <button type="submit">Submit Course</button>
          </div>
        </form>
      </div>
    </main>
    </>
  );
};

export default NewCourse;
