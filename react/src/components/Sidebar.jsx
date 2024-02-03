import {Link} from "react-router-dom";
import React, {useState} from 'react';
import './sidebar.css';
import axiosClient from "../axios-client.js";
import {useStateContext} from "../contexts/ContextProvider.jsx";
import {
  FaBook,
  FaClipboardCheck,
  FaSave,
  FaFileAlt,
  FaComment,
  FaSignOutAlt,
  FaChevronDown,
  FaChevronUp
} from 'react-icons/fa';


const Sidebar = () => {
  const {user, token, setUser, setToken} = useStateContext()
  const [isCoursesExpanded, setCoursesExpanded] = useState(false);

  const toggleCourses = () => {
    setCoursesExpanded(!isCoursesExpanded);
  };

  const logout = (e) => {
    e.preventDefault()
    axiosClient.post('/logout').then(() => {
      setUser({})
      setToken(null)
    })
  }
  return (
    <aside className="sidebar">
      <div className="logo">
        <img src="your-logo-url" alt="Logo"/>
        <h1>Your App</h1>
      </div>

      <div className="menu">
        <div className="menu-item">
          <Link to='/dashboard'>
            <FaSave/>
            <span>Home</span>
          </Link>
        </div>
        <div className="menu-item">
          <FaBook/>
          <span onClick={toggleCourses}>
            Courses {isCoursesExpanded ? <FaChevronUp/> : <FaChevronDown/>}
          </span>
          {isCoursesExpanded && (
            <ul className="submenu">
              <li><Link to='/courses'>All Courses</Link></li>
              <li>Enrolled</li>
              <li>Completed</li>
              <li>Saved</li>
            </ul>
          )}
        </div>

        <div className="menu-item">
          <Link to='/assignments'>
            <FaFileAlt/>
            <span>Assignments</span>
          </Link>
        </div>

        <div className="menu-item">
          <Link to='/quiz'>
            <FaClipboardCheck/>
            <span>Quiz</span>
          </Link>
        </div>

        <div className="menu-item">
          <Link to='/announcements'>
            <FaSave/>
            <span>Announcements</span>
          </Link>
        </div>

        <div className="menu-item">
          <Link to='/feedback'>
            <FaComment/>
            <span>Feedback</span>
          </Link>
        </div>

        <div className="menu-item" onClick={logout}>
          <FaSignOutAlt/>
          <span>Logout</span>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar;
