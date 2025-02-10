import React from 'react';
import '../styles/CourseCard.css';

const CourseCard = ({ image, title, category, level, duration }) => {
  return (
    <div className="course-card">
      <img src={image} alt={title} className="course-image" />
      <div className="course-details">
        <h3 className="course-title">{title}</h3>
        <p className="course-description">
          <strong>Category:</strong> {category}<br />
          <strong>Level:</strong> {level}<br />
          <strong>Duration:</strong> {duration}
        </p>
      </div>
    </div>
  );
};

export default CourseCard;