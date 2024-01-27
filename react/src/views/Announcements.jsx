import Sidebar from "../components/Sidebar.jsx";
import React from "react";
import Footer from "../components/Footer.jsx";

export default function Announcements() {
//   import announcements from announcements table
  const announcements = [
    {id: 1, title: "Announcement 1", body: "This is the first announcement"},
    {id: 2, title: "Announcement 2", body: "This is the second announcement"},
    {id: 3, title: "Announcement 3", body: "This is the third announcement"}
  ]
  return (
    <div className="layout has-sidebar fixed-sidebar fixed-header">
      <Sidebar/>
      <div id="overlay" className="overlay"></div>
      <div className="layout">
        <main className="content">
          <div>
            <a id="btn-toggle" href="#" className="sidebar-toggler break-point-sm">
              <i className="ri-menu-line ri-xl"></i>
            </a>
            <h1 style={{marginBottom: '0'}}>Announcements</h1>
            <span style={{display: 'inline-block'}}>
              Check the latest announcements here.
            </span>
            <br/>
          </div>
          <ul>
            {announcements.map((announcement) => {
              return (
                <li key={announcement.id}>
                  <h3>{announcement.title}</h3>
                  <p>{announcement.body}</p>
                </li>
              )
            })}
          </ul>
          <Footer/>
        </main>
      </div>
    </div>
  )
}
