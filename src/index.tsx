import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/App.css';
import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);