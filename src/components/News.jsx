import React from 'react';
import '../styles/News.css';

const newsItems = [
  {
    id: 1,
    image: 'https://via.placeholder.com/150',
    title: 'Art Exhibition Opens in Louvre',
    date: 'February 8, 2025',
    relevance: 'High'
  },
  {
    id: 2,
    image: 'https://via.placeholder.com/150',
    title: 'New Artifacts Discovered',
    date: 'February 7, 2025',
    relevance: 'Medium'
  },
  {
    id: 3,
    image: 'https://via.placeholder.com/150',
    title: 'Art Auction Raises Millions',
    date: 'February 6, 2025',
    relevance: 'Low'
  }
];

const News = () => {
  return (
    <div className="news-container">
      {newsItems.map(item => (
        <div key={item.id} className="news-item">
          <img src={item.image} alt={item.title} className="news-image" />
          <div className="news-details">
            <h2 className="news-title">{item.title}</h2>
            <p className="news-date">{item.date}</p>
            <p className="news-relevance">Relevance: {item.relevance}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default News;