import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const trendingMarkets = [
  { id: 1, symbol: 'AAPL', name: 'Apple Inc.', change: '+2.5%', trend: 'up' },
  { id: 2, symbol: 'TSLA', name: 'Tesla', change: '-1.8%', trend: 'down' },
  { id: 3, symbol: 'MSFT', name: 'Microsoft', change: '+1.7%', trend: 'up' },
  { id: 4, symbol: 'AMZN', name: 'Amazon', change: '+2.1%', trend: 'up' },
  { id: 5, symbol: 'GOOGL', name: 'Google', change: '-0.9%', trend: 'down' }
];

const tradingNews = [
  {
    id: 1,
    title: 'Fed Announces Interest Rate Decision',
    date: 'February 8, 2025',
    relevance: 'High',
    category: 'Monetary Policy'
  },
  {
    id: 2,
    title: 'Tech Stocks Rally on Strong Earnings',
    date: 'February 7, 2025',
    relevance: 'Medium',
    category: 'Market Analysis'
  }
];

const popularStrategies = [
  {
    id: 1,
    name: 'Tech Momentum Strategy',
    performance: '+15.8% MTD',
    followers: '2.5K'
  },
  {
    id: 2,
    name: 'Value Investing Pro',
    performance: '+12.3% MTD',
    followers: '1.8K'
  }
];

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <div className="left-section">
        <h2>Trading Community</h2>
        <p>Connect with traders and discover winning strategies.</p>
        
        <div className="popular-strategies">
          <h3>Popular Trading Strategies</h3>
          {popularStrategies.map(strategy => (
            <div key={strategy.id} className="strategy-card">
              <div className="strategy-header">
                <h4>{strategy.name}</h4>
                <span className="performance">{strategy.performance}</span>
              </div>
              <div className="strategy-footer">
                <span>{strategy.followers} Followers</span>
                <Link to="/strategy-matching" className="view-button">
                  View Strategy
                </Link>
              </div>
            </div>
          ))}
          <Link to="/strategy-matching" className="explore-more">
            Explore More Strategies →
          </Link>
        </div>
      </div>

      <div className="middle-section">
        <h2>Market Updates</h2>
        <p>Stay informed with real-time market news and analysis.</p>
        
        <div className="news-container">
          {tradingNews.map(news => (
            <div key={news.id} className="news-card">
              <div className="news-tag">{news.category}</div>
              <h4>{news.title}</h4>
              <div className="news-footer">
                <span>{news.date}</span>
                <span className={`relevance ${news.relevance.toLowerCase()}`}>
                  {news.relevance} Impact
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="right-section">
        <h2>Market Movers</h2>
        <p>Track the most active stocks and market trends.</p>
        
        <div className="market-movers">
          {trendingMarkets.map(market => (
            <div key={market.id} className="market-card">
              <div className="market-info">
                <strong>{market.symbol}</strong>
                <span>{market.name}</span>
              </div>
              <div className={`market-change ${market.trend}`}>
                {market.change}
              </div>
            </div>
          ))}
        </div>

        <div className="quick-actions">
          <Link to="/strategy-matching" className="action-button primary">
            Find Trading Strategy
          </Link>
          <Link to="/community" className="action-button secondary">
            Join Community
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;