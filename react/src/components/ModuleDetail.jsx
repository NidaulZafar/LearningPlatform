import React, {useEffect, useState} from 'react';
import axiosClient from '../axios-client';
import {useParams} from "react-router-dom";
import Sidebar from "./Sidebar.jsx";

const ModuleDetail = () => {
  const {id} = useParams();
  const [moduleData, setModuleData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchModuleData = async () => {
      try {
        const response = await axiosClient.get(`/module/${id}`);
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

  if (loading) {
    return <div>Loading module data...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const {title, description, content, resource_files, resource_links, duration, videos} = moduleData;

  return (
    <>
      <Sidebar/>
      <main className="content">
        <div className="module-detail">
          <h2>{title}</h2>
          <p>Description: {description}</p>
          <p>Content: {content}</p>
          <p>Resource Files: {resource_files}</p>
          <p>Resource Links: {resource_links}</p>
          <p>Duration: {duration} minutes</p>
          <div>
            <h3>Videos:</h3>
            <ul>
              {videos.map(video => (
                <li key={video.id}>
                  <h4>{video.title}</h4>
                  <p>Description: {video.description}</p>
                  <p>Duration: {video.duration} minutes</p>
                  <img src={video.thumbnail} alt={video.title}/>
                  <a href={video.video_url} target="_blank" rel="noopener noreferrer">Watch Video</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </>
  );
};

export default ModuleDetail;
