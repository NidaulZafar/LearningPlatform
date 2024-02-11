import React, {useState, useEffect} from "react";
import axiosClient from "../axios-client.js";
import Sidebar from "./Sidebar.jsx";
import "./profile.css";
import {useStateContext} from "../contexts/ContextProvider.jsx";

const Profile = () => {
  const {user, setUser} = useStateContext();
  const [editing, setEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);

  useEffect(() => {
    setEditedUser(user);
  }, [user]);

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setEditedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSaveChanges = async () => {
    try {
      let endpoint = user.type === "instructor" ? "instructors" : user.type === "student" ? "students" : (() => { throw new Error("Invalid user type") })();
      console.log('endpoint:', endpoint);
      console.log('editedUser:', editedUser);
      const response = await axiosClient.put(`/${endpoint}/${editedUser.id}`, editedUser);
      setUser(response.data); // Update user in context after successful update
      console.log("Profile updated:", response.data);
      setEditing(false); // Exit editing mode
    } catch (error) {
      console.error("Error updating profile:", error);
      // Handle error updating profile (e.g., show error message)
    }
  };

  const renderProfileHeader = () => (
    <div className="profile-header">
      <div className="profile-info">
        <h1>
          {editing ? (
            <input type="text" name="name" value={editedUser.name || ''} onChange={handleInputChange} />
          ) : (
            user.name
          )}
        </h1>
        <h3>({user.type} Profile)</h3>
      </div>
      {!editing && <button onClick={() => setEditing(true)}>Edit</button>}
      {editing && <button onClick={handleSaveChanges}>Save</button>}
    </div>
  );

  console.log('user:', user);

  const renderProfileDetails = () => (
    <div className="profile-details">
      <h2>About Me</h2>
      <p>{editing ? <textarea name="bio" value={editedUser.bio || ''} onChange={handleInputChange} /> : user.bio || "Bio not provided"}</p>
      <h2>Contact Information</h2>
      <ul>
        <li>
          <strong>Email:</strong> {user.email}
        </li>
        <li>
          <strong>Phone:</strong>{" "}
          {editing ? (
            <input type="text" name="phone" value={editedUser.phone || ''} onChange={handleInputChange} />
          ) : (
            user.phone || "Phone number not provided"
          )}
        </li>
      </ul>
      {user.type === "instructor" && (
        <>
          <h2>Occupation</h2>
          <p>
            {editing ? (
              <input type="text" name="occupation" value={editedUser.occupation || ''} onChange={handleInputChange} />
            ) : (
              user.occupation || 'Occupation Not provided'
            )}
          </p>
        </>
      )}
      <h2>Education</h2>
      <p>
        {editing ? (
          <input type="text" name="education" value={editedUser.education || ''} onChange={handleInputChange} />
        ) : (
          user.education || "Education nottt provided"
        )}
      </p>
    </div>
  );

  return (
    <>
      <Sidebar />
      <main className="content">
        {renderProfileHeader()}
        {renderProfileDetails()}
      </main>
    </>
  );
};

export default Profile;
