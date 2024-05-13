import Sidebar from "../components/Sidebar.jsx";
import React, {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([{
    id: 0, title: "", content: "", expiry_date: "", created_at: "", updated_at: "", publish_date: ""
  }]);

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
          {announcements.length === 0 ? (
            <p>No announcements available at present.</p>
          ) : (
            <>
              <span>Check the latest announcements here.</span>
              <br />
              <ul>
                {announcements.map((announcement) => (
                  <li key={announcement.id}>
                    <h2>{announcement.title}</h2>
                    <p>{announcement.content}</p>
                    <p>Published on: {new Date(announcement.publish_date).toLocaleDateString()}</p>
                    <hr />
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </main>
    </>
  );
};

export default Announcements;
