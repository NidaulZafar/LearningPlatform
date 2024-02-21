import React, {useState, useEffect} from 'react';
import axiosClient from "../axios-client.js";
import {useStateContext} from "../contexts/ContextProvider.jsx";
import './CSS/feedbackPage.css';
import Sidebar from "../components/Sidebar.jsx";

const FeedbackPage = () => {
  const {user} = useStateContext();
  const [message, setMessage] = useState(null);
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
    axiosClient.get('/feedback')
      .then(response => {
        setFeedback(response.data);
        console.log('Feedback fetched:', feedback);
      })
      .catch(error => {
        console.error('Error fetching feedback:', error);
      });
  }, []);

  const renderUserType = (feedbackItem) => {
    if (feedbackItem.student_id !== null) {
      return ("Student");
    } else if (feedbackItem.instructor_id !== null) {
      return ("Instructor");
    }
    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataCopy = {...formData};
    if (user.type === 'student') {
      formDataCopy.student_id = user.id;
      formDataCopy.instructor_id = '';
    } else if (user.type === 'instructor') {
      formDataCopy.instructor_id = user.id;
      formDataCopy.student_id = '';
    }
    axiosClient.post('/feedback', formDataCopy)
      .then(response => {
        setMessage(response.data.message);
        axiosClient.get('/feedback')
          .then(response => {
            setFeedback(response.data);
          })
          .catch(error => {
            console.error('Error fetching feedback:', error);
          });
        setFormData({
          name: '',
          student_id: '',
          instructor_id: '',
          title: '',
          email: '',
          message: ''
        });
        setTimeout(() => {
          setMessage(null);
        }, 3000);
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
    <>
      <Sidebar/>
      <main className="content">
        <div className="feedback-container">
          <h1>Feedback Page</h1>
          <form onSubmit={handleSubmit}>
            <div className="input-container">
              <label className="label">Name:</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} className="input-field"
                     required/>
            </div>
            <div className="input-container">
              <label className="label">Title:</label>
              <input type="text" name="title" value={formData.title} onChange={handleChange} className="input-field"
                     required/>
            </div>
            <div className="input-container">
              <label className="label">Email:</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} className="input-field"
                     required/>
            </div>
            <div className="input-container">
              <label className="label">Message:</label>
              <textarea name="message" value={formData.message} onChange={handleChange} className="textarea-field"
                        required/>
            </div>
            <button type="submit" className="button">Submit Feedback</button>
          </form>
          <h2>Received Public Feedback:</h2>
          <ul className="feedback-list">
            {feedback.map(item => (
              <li key={item.id} className="feedback-item">
                <p><strong>Name:</strong> {item.name} <span className="user-type">({renderUserType(item)})</span></p>
                <p><strong>Title:</strong> {item.title}</p>
                <p><strong>Message:</strong> {item.message}</p>
                <p><strong>Creation Date:</strong> {item.created_at}</p>
              </li>
            ))}
          </ul>
          {message && (
            <div className="message">
              {message}
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default FeedbackPage;
