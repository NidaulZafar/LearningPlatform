import Sidebar from "../components/Sidebar.jsx";
import React, {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([{
    id: 0, title: "", content: "", expiry_date: "", created_at: "", updated_at: "", publish_date: ""
  }]);

  // Fetch announcements from the API
  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await axiosClient.get("/announcements");
        setAnnouncements(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAnnouncements();
  }, []);

  return (<>
      <Sidebar/>
      <main className="content">
        <div>
          <h1>Announcements</h1>
          <span>
              Check the latest announcements here.
            </span>
          <br/>
        </div>
        <ul>
          {announcements && announcements.map((announcement) => {
            return (<li key={announcement.id}>
                <h2>{announcement.title}</h2>
                <p>{announcement.content}</p>
                <p>Published on: {announcement.publish_date}</p>
                <p>Expires on: {announcement.expiry_date}</p>
                <hr/>
              </li>)
          })}
        </ul>
      </main>
    </>)
};

export default Announcements;
