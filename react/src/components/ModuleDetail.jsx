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
        console.log(response.data);
        setModuleData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching module data:', error);
        setError('Error fetching module data');
        setLoading(false);
      }
    };

    fetchModuleData();
  }, []);

  if (loading) {
    return <div>Loading module data...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const {title, description, content, resource_files, resource_links, duration} = moduleData;

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
        </div>
      </main>
    </>
  );
};

export default ModuleDetail;
