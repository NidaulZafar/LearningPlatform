import Sidebar from "../components/Sidebar.jsx";
import React, {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";

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
    <>
      <Sidebar/>
        <main className="content">
          <div>
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
        </main>
    </>
  )
}
