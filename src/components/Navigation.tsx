import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNewspaper, faChartLine, faUsers, faBook, faBrain, faRobot } from '@fortawesome/free-solid-svg-icons';
import '../styles/Navigation.css'; // Optional: Import a CSS file for styling

export const Navigation: React.FC = () => {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex space-x-8">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `px-3 py-3 rounded-md text-md font-medium ${
                  isActive ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
                }`
              }
            >
              <FontAwesomeIcon icon={faNewspaper} size="lg"/>
            </NavLink>
            <NavLink 
              to="/trade" 
              className={({ isActive }) => 
                `px-3 py-3 rounded-md text-sm font-medium ${
                  isActive ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
                }`
              }
            >
              <FontAwesomeIcon icon={faChartLine} size="lg"/>
            </NavLink>
            <NavLink 
              to="/community" 
              className={({ isActive }) => 
                `px-3 py-3 rounded-md text-sm font-medium ${
                  isActive ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
                }`
              }
            >
              <FontAwesomeIcon icon={faUsers} size="lg"/>
            </NavLink>
            <NavLink 
              to="/learn" 
              className={({ isActive }) => 
                `px-3 py-3 rounded-md text-sm font-medium ${
                  isActive ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
                }`
              }
            >
              <FontAwesomeIcon icon={faBook} size="lg"/>
            </NavLink>
            <NavLink 
              to="/strategy-matching" 
              className={({ isActive }) => 
                `px-3 py-3 rounded-md text-sm font-medium ${
                  isActive ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
                }`
              }
            >
              <FontAwesomeIcon icon={faBrain} size="lg"/>
            </NavLink>
            <NavLink 
              to="/chatbot" 
              className={({ isActive }) => 
                `px-3 py-3 rounded-md text-sm font-medium ${
                  isActive ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
                }`
              }
            >
              <FontAwesomeIcon icon={faRobot} size="lg"/>
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;