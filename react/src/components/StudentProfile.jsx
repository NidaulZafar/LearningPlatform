// resources/js/views/StudentProfile.jsx

import React, {useEffect, useState} from 'react';
import axiosClient from '../axios-client';
// import './sidebar.js';
import {Link} from "react-router-dom";
import Sidebar from "./Sidebar.jsx";

const StudentProfile = () => {
  const [student, setStudent] = useState(null);

  useEffect(() => {
    axiosClient.get('/student-profile')
      .then(response => setStudent(response.data))
      .catch(error => console.error('Error fetching student profile:', error));
  }, []);


  if (!student) {
    return <div>Loading...</div>;
  }

  return (
    <div className="layout has-sidebar fixed-sidebar fixed-header">
      <Sidebar/>
      <div id="overlay" className="overlay"></div>
      <div className="layout">
        <main className="content">
          <div>
            <a id="btn-toggle" href="#" className="sidebar-toggler break-point-sm">
              <i className="ri-menu-line ri-xl"></i>
            </a>
            <h1 style={{marginBottom: '0'}}>Student Profile</h1>
            <span style={{display: 'inline-block'}}>
              Here you can see your student profile.
            </span>
            <br/>
          </div>
          <div>
            <h2>Dashboard</h2>
            <ul>
              <li><strong>Name:</strong> {student.name}</li>
              <li><strong>Email:</strong> {student.email}</li>
              <li><strong>Education:</strong> {student.education || 'Not provided'}</li>
              <li><strong>Phone:</strong> {student.phone || 'Not provided'}</li>
              <li><strong>Bio:</strong> {student.bio || 'Not provided'}</li>
              <li><strong>Avatar:</strong> {student.avatar ?
                <img src={student.avatar} alt="Avatar" className="img-fluid"/> : 'Not provided'}</li>
            </ul>
          </div>
          <div>
            <h2>Resources</h2>
            <ul>
              <li>
                <a target="_blank" href="https://github.com/azouaoui-med/css-pro-layout">
                  Css Pro Layout</a
                >
              </li>
              <li>
                <a target="_blank" href="https://github.com/popperjs/popper-core"> Popper Core</a>
              </li>
              <li>
                <a target="_blank" href="https://remixicon.com/"> Remix Icons</a>
              </li>
            </ul>
          </div>
          <footer className="footer">
            <small style={{marginBottom: '20px', display: 'inline-block'}}>
              © 2024 made with
              <span style={{color: 'red', fontSize: '18px'}}>&#10084;</span> by -
              <a target="_blank" href="https://azouaoui.netlify.com"> Mohamed Azouaoui </a>
            </small>
            <br/>
            <div className="social-links">
              <a href="https://github.com/nidaulzafar" target="_blank">
                <i className="ri-github-fill ri-xl"></i>
              </a>
              <a href="https://twitter.com/" target="_blank">
                <i className="ri-twitter-fill ri-xl"></i>
              </a>
              <a href="https://codepen.io/" target="_blank">
                <i className="ri-codepen-fill ri-xl"></i>
              </a>
              <a href="https://www.linkedin.com/in/nidaulzafar/" target="_blank">
                <i className="ri-linkedin-box-fill ri-xl"></i>
              </a>
            </div>
          </footer>
        </main>
        <div className="overlay"></div>
      </div>
    </div>
  );
};

export default StudentProfile;
