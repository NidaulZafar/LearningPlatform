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

  const renderStudentSidebar = () => {
    return (
      <ul className="submenu">
        <li><Link to='/courses'>All Courses</Link></li>
        <li>Enrolled</li>
        <li>Completed</li>
        <li>Saved</li>
      </ul>
    );
  };

  const renderInstructorSidebar = () => {
    return (
      <ul className="submenu">
        <li><Link to='/courses'>All Courses</Link></li>
        <li><Link to='/your-courses'>Your Courses</Link></li>
      </ul>
    );
  };


  return (
    <aside className="sidebar">
      <div className="logo">
        <img src={user.avatar || 'https://www.gravatar.com/avatar/00000000000000000000000000000000?s=200&d=mp&r=pg'}
             alt="User Avatar"
             className="user-avatar"
        />
        <h1>Your Dashboard</h1>
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
              {user.type === 'student' ? renderStudentSidebar() : user.type === 'instructor' && renderInstructorSidebar()}
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
