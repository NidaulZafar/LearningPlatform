import { Link } from "react-router-dom";
import React, { useState } from "react";
import "./styles/sidebar.css";
import axiosClient from "../axios-client.js";
import { useStateContext } from "../contexts/ContextProvider.jsx";
import {
  FaBook,
  FaClipboardCheck,
  FaFileAlt,
  FaComment,
  FaSignOutAlt,
  FaChevronDown,
  FaChevronUp,
  FaHome,
  FaEnvelope,
  FaPhoneAlt,
} from "react-icons/fa";

const Sidebar = () => {
  const { user, token, setUser, setToken } = useStateContext();
  const [isCoursesExpanded, setCoursesExpanded] = useState(false);

  const toggleCourses = () => {
    setCoursesExpanded(!isCoursesExpanded);
  };

  const logout = (e) => {
    e.preventDefault();
    axiosClient.post("/logout").then(() => {
      setUser({});
      setToken(null);
    });
  };

  const renderStudentSidebar = () => {
    return (
      <ul className="submenu">
        <li>
          <Link to="/courses">All Courses</Link>
        </li>
        <li>
          <Link to="/enrolled">Enrolled</Link>
        </li>
        <li>Completed</li>
        <li>Saved</li>
      </ul>
    );
  };

  const renderInstructorSidebar = () => {
    return (
      <ul className="submenu">
        <li>
          <Link to="/courses">All Courses</Link>
        </li>
        <li>
          <Link to="/your-courses">Your Courses</Link>
        </li>
        <li>
          <Link to="/courses/new">New Course</Link>
        </li>
      </ul>
    );
  };

  return (
    <aside className="sidebar">
      <div className="logo">
        <img
          src={user.avatar || `https://i.pravatar.cc/150?u=${user.name}`}
          alt="User Avatar"
          className="user-avatar"
        />
        <img
          src={`https://ui-avatars.com/api/?name=${user.name}&background=random&rounded=true&size=150&color=random`}
          alt="User Avatar"
          className="user-avatar"
        />
      </div>

      <div className="menu">
        <h1>Dashboard</h1>
        <span className="menu-header">GENERAL</span>
        <div className="menu-item">
          <Link to="/dashboard">
            <FaHome />
            <span>Home</span>
          </Link>
        </div>
        <div className="menu-item">
          <FaBook />
          <span onClick={toggleCourses}>
            Courses {isCoursesExpanded ? <FaChevronUp /> : <FaChevronDown />}
          </span>
          {isCoursesExpanded && (
            <ul className="submenu">
              {user.type === "student"
                ? renderStudentSidebar()
                : user.type === "instructor" && renderInstructorSidebar()}
            </ul>
          )}
        </div>

        <div className="menu-item">
          <Link to="/assignments">
            <FaFileAlt />
            <span>Assignments</span>
          </Link>
        </div>

        <div className="menu-item">
          <Link to="/quiz">
            <FaClipboardCheck />
            <span>Quiz</span>
          </Link>
        </div>

        <div className="menu-item">
          <Link to="/announcements">
            <FaEnvelope />
            <span>Announcements</span>
          </Link>
        </div>
        <span className="menu-header">EXTRA</span>

        <div className="menu-item">
          <Link to="/feedback">
            <FaComment />
            <span>Feedback</span>
          </Link>
        </div>

        <div className="menu-item">
          <Link to="/contact">
            <FaPhoneAlt />
            <span>Contact Us</span>
          </Link>
        </div>

        <div className="menu-item" onClick={logout}>
          <FaSignOutAlt />
          <span>Logout</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
