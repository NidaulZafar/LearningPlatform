import Sidebar from "../components/Sidebar.jsx";
import React, {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";
import Footer from "../components/Footer.jsx";

export default function Courses() {

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
            <h1 style={{marginBottom: '0'}}>Courses</h1>
            <span style={{display: 'inline-block'}}>
              Here you can see the complete list of courses available.
            </span>
            <br/>
          </div>
          <div>
            <ul>
              <li>Course 1</li>
              <li>Course 2</li>
              <li>Course 3</li>
            </ul>
            Like to add a new course? <a href="/courses/new">Click here</a>
          </div>
          <Footer/>
        </main>
        <div className="overlay"></div>
      </div>
    </div>
  )
}
