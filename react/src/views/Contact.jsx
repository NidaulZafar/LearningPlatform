import Sidebar from "../components/Sidebar.jsx";
import {useState} from "react";
import axiosClient from "../axios-client.js";
import './CSS/contact.css';


export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosClient.post('/contact', formData);
      console.log(response.data); // Log the response from the backend
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <>
      <Sidebar/>
      <main className="content">
        <h1>Contact Us</h1>
        <p>We're here to assist you. Choose your preferred method of contact or send your message through the contact
          form below:</p>
        <div className="contact-options">
          <div className="contact-option">
            <i className="ri-phone-line ri-lg"></i>
            <p>Call Support</p>
            <span>+1 (800) 123-4567</span>
          </div>
          <div className="contact-option">
            <i className="ri-mail-line ri-lg"></i>
            <p>Email Sales</p>
            <span>sales@example.com</span>
          </div>
          <div className="contact-option">
            <i className="ri-chat-1-line ri-lg"></i>
            <p>Live Chat</p>
            <span>Chat with a representative</span>
          </div>
        </div>
        <div className="contact-form">
          <h3>Contact Form</h3>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange}/>
            </div>
            <div>
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange}/>
            </div>
            <div>
              <label htmlFor="message">Message:</label>
              <textarea id="message" name="message" value={formData.message} onChange={handleChange}/>
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      </main>
    </>
  );
}
