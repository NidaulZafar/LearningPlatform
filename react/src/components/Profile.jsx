import React, { useState, useEffect } from "react";
import axiosClient from "../axios-client.js";
import Sidebar from "./Sidebar.jsx";
import "./styles/profile.css";
import { useStateContext } from "../contexts/ContextProvider.jsx";
import {renderProfileDetails, renderProfileHeader} from "./ProfileUtils.jsx";

const Profile = () => {
  const { user, setUser } = useStateContext();
  const [editing, setEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);

  useEffect(() => {
    setEditedUser(user);
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSaveChanges = async () => {
    try {
      let endpoint =
        user.type === "instructor"
          ? "instructors"
          : user.type === "student"
          ? "students"
          : (() => {
              throw new Error("Invalid user type");
            })();
      const response = await axiosClient.put(
        `/${endpoint}/${editedUser.id}`,
        editedUser
      );
      setUser(response.data);
      setEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <>
      <Sidebar />
      <main className="content">
        {renderProfileHeader(user, editing, setEditing, editedUser, handleInputChange, handleSaveChanges)}
        {renderProfileDetails(user, editing, editedUser, handleInputChange)}
      </main>
    </>
  );
};

export default Profile;
