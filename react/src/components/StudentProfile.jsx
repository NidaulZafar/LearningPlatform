// resources/js/views/StudentProfile.jsx

import React, { useEffect, useState } from 'react';
import axiosClient from '../axios-client';
import StudentSidebar from "./StudentSidebar.jsx";

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
    <div className="container mt-4">
      <StudentSidebar />
      <h2>Student Profile</h2>
      <div className="row">
        <div className="col-md-6">
          <div className="mb-3">
            <strong>Name:</strong> {student.name}
          </div>
          <div className="mb-3">
            <strong>Email:</strong> {student.email}
          </div>
          <div className="mb-3">
            <strong>Education:</strong> {student.education || 'Not provided'}
          </div>
          <div className="mb-3">
            <strong>Phone:</strong> {student.phone || 'Not provided'}
          </div>
        </div>
        <div className="col-md-6">
          <div className="mb-3">
            <strong>Bio:</strong> {student.bio || 'Not provided'}
          </div>
          <div className="mb-3">
            <strong>Avatar:</strong> {student.avatar ? <img src={student.avatar} alt="Avatar" className="img-fluid" /> : 'Not provided'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
