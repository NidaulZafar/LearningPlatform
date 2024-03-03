import React, {useEffect, useState} from 'react';
import axiosClient from '../axios-client';
import {useParams} from "react-router-dom";
import Sidebar from "./Sidebar.jsx";
import './styles/module.css';

const ModuleDetail = () => {
  const {id} = useParams();
  const [moduleData, setModuleData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const fetchModuleData = async () => {
      try {
        const response = await axiosClient.get(`/module/${id}`);
        console.log('Module details:', response.data);
        setModuleData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching module data:', error);
        setError('Error fetching module data');
        setLoading(false);
      }
    };

    fetchModuleData();
  }, [id]);

  const markAsCompleted = async () => {
    try {
      console.log('Marking module as completed...');
      const response = await axiosClient.put(`/module/${id}/complete`);
      console.log('Module marked as completed:', response.data);
      setMessage(response.data.message);
      setTimeout(() => {
        setMessage(null);
      }, 3000);
      setModuleData(prevModuleData => ({...prevModuleData, status: 'completed'}));
    } catch (error) {
      console.error('Error marking module as completed:', error);
    }
    ;
  };

  if (loading) {
    return <div>Loading module data...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const {title, description, content, resource_files, resource_links, duration, videos} = moduleData;

  return (<>
    <Sidebar/>
    <main className="content">
      <div className="module-detail">
        <h2>{title}</h2>
        <p>Status: {}</p>
        <p>Description: {description}</p>
        <p>Content: {content}</p>
        <p>Duration: {duration} minutes</p>
        <div>
          <h3>Videos:</h3>
          <ul>
            {videos.map(video => (<li key={video.id}>
              <h4>{video.title}</h4>
              <p>Description: {video.description}</p>
              <p>Duration: {video.duration} minutes</p>
              <a href={video.video_url} target="_blank" rel="noopener noreferrer">
                <img src={video.thumbnail}
                     alt={video.title}/>
                <br/>
                Watch Video</a>
            </li>))}
          </ul>
        </div>
        <h4>Extra Resources:</h4>
        <p>Resource Files: {resource_files}</p>
        <p>Resource Links: {resource_links}</p>
        {status === 'completed' ? <p>Module Completed!</p> :
          <button onClick={markAsCompleted}>Mark as Completed</button>}
      </div>
      {message && (<div className="message">
        {message}
      </div>)}
    </main>
  </>);
};

export default ModuleDetail;
