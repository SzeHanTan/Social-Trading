import React, { useState } from 'react';
import CourseCard from '../components/CourseCard';
import Progress from '../components/Progress';
import '../styles/Learn.css';

// Import images from assets
import courseImage1 from '../assets/course/c1.jpg';
import courseImage2 from '../assets/course/c2.jpg';
import courseImage3 from '../assets/course/c3.jpg';
import courseImage4 from '../assets/course/c4.jpg';
import courseImage5 from '../assets/course/c5.jpg';

const courses = [
  {
    image: courseImage1,
    title: 'Introduction to Trading',
    category: 'Trading',
    level: 'Beginner',
    duration: '4 weeks'
  },
  {
    image: courseImage2,
    title: 'Technical Analysis for Traders',
    category: 'Trading',
    level: 'Intermediate',
    duration: '5 weeks'
  },
  {
    image: courseImage3,
    title: 'Fundamental Analysis for Traders',
    category: 'Trading',
    level: 'Intermediate',
    duration: '5 weeks'
  },
  {
    image: courseImage4,
    title: 'Advanced Painting Techniques',
    category: 'Art',
    level: 'Advanced',
    duration: '6 weeks'
  },
  {
    image:  courseImage5,
    title: 'Sculpture for Beginners',
    category: 'Art',
    level: 'Beginner',
    duration: '3 weeks'
  },
  {
    image: courseImage1,
    title: 'Technical Analysis for Traders',
    category: 'Trading',
    level: 'Intermediate',
    duration: '5 weeks'
  }
];

const Learn = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="learn-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for courses..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <div className="content">
        <div className="left-section">
          <h2>All Courses</h2>
          <div className="course-list">
            {filteredCourses.map((course, index) => (
              <CourseCard
                key={index}
                image={course.image}
                title={course.title}
                category={course.category}
                level={course.level}
                duration={course.duration}
              />
            ))}
          </div>
        </div>
        <div className="right-section">
          <div className="user-progress">
            <h2>User Level and Progress</h2>
            <Progress progress={60} />
          </div>
          <div className="continue-learning">
            <h2>Continue Your Learning</h2>
            <button>Continue</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Learn;