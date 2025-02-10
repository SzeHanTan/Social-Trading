import React from 'react';
import '../styles/Profile.css';

const Profile: React.FC = () => {
  const user = {
    name: 'John Doe',
    bio: 'Art enthusiast and curator at the Louvre Museum.',
    profilePicture: 'https://via.placeholder.com/150',
    email: 'john.doe@example.com',
    location: 'Paris, France'
  };

  return (
    <div className="profile">
      <h1>Profile</h1>
      <div className="profile-card">
        <img src={user.profilePicture} alt="Profile" className="profile-picture" />
        <div className="profile-info">
          <h2>{user.name}</h2>
          <p>{user.bio}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Location:</strong> {user.location}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;