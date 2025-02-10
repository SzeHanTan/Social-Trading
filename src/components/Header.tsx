import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from './Navigation'; // Import the Navigation component
import '../styles/Header.css'; // Make sure to create a corresponding CSS file for styling

const Header: React.FC = () => {
    return (
        <header className="App-header">
            <div className="logo">
                <img src="../assets/trade.png" alt="Logo" />
            </div>
            <Navigation /> {/* Use the Navigation component */}
        </header>
    );
};

export default Header;