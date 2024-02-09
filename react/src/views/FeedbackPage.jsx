import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FeedbackPage = () => {
  const [feedback, setFeedback] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    student_id: '',
    instructor_id: '',
    title: '',
    email: '',
    message: ''
  });

  useEffect(() => {
    axios.get('/api/feedback')
      .then(response => {
        setFeedback(response.data);
      })
      .catch(error => {
        console.error('Error fetching feedback:', error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/feedback', formData)
      .then(response => {
        setFeedback([...feedback, response.data]);
        setFormData({
          student_id: '',
          instructor_id: '',
          title: '',
          email: '',
          message: ''
        });
      })
      .catch(error => {
        console.error('Error submitting feedback:', error);
      });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div>
      <h1>Feedback Page</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" name="title" value={formData.title} onChange={handleChange} />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </label>
        {/* Other input fields for student_id, instructor_id, message */}
        <button type="submit">Submit Feedback</button>
      </form>
      <h2>Existing Feedback:</h2>
      <ul>
        {feedback.map(item => (
          <li key={item.id}>
            <p>{item.title}</p>
            <p>{item.email}</p>
            {/* Display other feedback data */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FeedbackPage;
