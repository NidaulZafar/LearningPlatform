import React from "react";

export const renderProfileHeader = (user, editing, setEditing, editedUser, handleInputChange, handleSaveChanges) => (
  <div className="profile-header">
    <div className="profile-info">
      <h1>
        {editing ? (
          <input
            type="text"
            name="name"
            value={editedUser.name || ""}
            onChange={handleInputChange}
          />
        ) : (
          user.name
        )}
      </h1>
      <h3>({user.type})</h3>
    </div>
    {!editing && (
      <button onClick={() => setEditing(true)}>Edit Profile</button>
    )}
    {editing && <button onClick={handleSaveChanges}>Save Changes</button>}
  </div>
);

export const renderProfileDetails = (user, editing, editedUser, handleInputChange) => (
  <div className="profile-details">
    <div className="profile-section">
      <h2>About Me</h2>
      <p>
        {editing ? (
          <textarea
            name="bio"
            value={editedUser.bio || ""}
            onChange={handleInputChange}
          />
        ) : (
          user.bio || "Bio not provided"
        )}
      </p>
    </div>
    <div className="profile-section">
      <h2>Contact Information</h2>
      <ul>
        <li>
          <strong>Email:</strong> {user.email}
        </li>
        <li>
          <strong>Phone:</strong>{" "}
          {editing ? (
            <input
              type="text"
              name="phone"
              value={editedUser.phone || ""}
              onChange={handleInputChange}
            />
          ) : (
            user.phone || "Phone number not provided"
          )}
        </li>
      </ul>
    </div>
    <div className="profile-section">
      {user.type === "instructor" && (
        <>
          <h2>Occupation</h2>
          <p>
            {editing ? (
              <input
                type="text"
                name="occupation"
                value={editedUser.occupation || ""}
                onChange={handleInputChange}
              />
            ) : (
              user.occupation || "Occupation Not provided"
            )}
          </p>
        </>
      )}
      <h2>Education</h2>
      <p>
        {editing ? (
          <input
            type="text"
            name="education"
            value={editedUser.education || ""}
            onChange={handleInputChange}
          />
        ) : (
          user.education || "Education not provided"
        )}
      </p>
    </div>
  </div>
);

