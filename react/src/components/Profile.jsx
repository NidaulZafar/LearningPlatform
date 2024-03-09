import React, {useState, useEffect} from "react";
import axiosClient from "../axios-client.js";
import Sidebar from "./Sidebar.jsx";
import "./styles/profile.css";
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
      ...prevUser, [name]: value,
    }));
  };

  const handleSaveChanges = async () => {
    try {
      let endpoint = user.type === "instructor" ? "instructors" : user.type === "student" ? "students" : (() => {
        throw new Error("Invalid user type")
      })();
      const response = await axiosClient.put(`/${endpoint}/${editedUser.id}`, editedUser);
      setUser(response.data);
      setEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const {name, type, email, phone, bio, occupation, education} = user;

  const renderProfileHeader = () => (<div className="profile-header">
    <div className="profile-info">
      <h1>
        {editing ? (
          <input type="text" name="name" value={editedUser.name || ''} onChange={handleInputChange}/>) : (name)}
      </h1>
      <h3>({type} Profile)</h3>
    </div>
    {!editing && <button onClick={() => setEditing(true)}>Edit Profile</button>}
    {editing && <button onClick={handleSaveChanges}>Save Changes</button>}
  </div>);

  const renderProfileDetails = () => (<div className="profile-details">
    <h2>About Me</h2>
    <p>{editing ? <textarea name="bio" value={editedUser.bio || ''}
                            onChange={handleInputChange}/> : bio || "Bio not provided"}</p>
    <h2>Contact Information</h2>
    <ul>
      <li>
        <strong>Email:</strong> {email}
      </li>
      <li>
        <strong>Phone:</strong>{" "}
        {editing ? (<input type="text" name="phone" value={editedUser.phone || ''}
                           onChange={handleInputChange}/>) : (phone || "Phone number not provided")}
      </li>
    </ul>
    {type === "instructor" && (<>
      <h2>Occupation</h2>
      <p>
        {editing ? (<input type="text" name="occupation" value={editedUser.occupation || ''}
                           onChange={handleInputChange}/>) : (occupation || 'Occupation Not provided')}
      </p>
    </>)}
    <h2>Education</h2>
    <p>
      {editing ? (<input type="text" name="education" value={editedUser.education || ''}
                         onChange={handleInputChange}/>) : (education || "Education not provided")}
    </p>
  </div>);

  return (<>
    <Sidebar/>
    <main className="content">
      {renderProfileHeader()}
      {renderProfileDetails()}
    </main>
  </>);
};

export default Profile;
