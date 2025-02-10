import React, { useEffect, useState } from 'react';

const TestAPI: React.FC = () => {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const testBackend = async () => {
      try {
        console.log('Testing backend connection...');
        const response = await fetch('http://localhost:5000/api/health', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        });
        
        console.log('Response status:', response.status);
        const data = await response.json();
        console.log('Backend response:', data);
        setMessage(data.message || 'Backend connected successfully');
      } catch (err) {
        console.error('Backend connection error:', err);
        setError('Failed to connect to backend. Make sure the backend server is running on port 5000');
      } finally {
        setLoading(false);
      }
    };

    testBackend();
  }, []);

  return (
    <div style={{
      padding: '20px',
      margin: '20px',
      border: '1px solid #ccc',
      borderRadius: '8px',
      backgroundColor: '#f5f5f5'
    }}>
      <h3>Backend Connection Status:</h3>
      {loading && <p>Testing backend connection...</p>}
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && (
        <div>
          <p style={{ color: 'red' }}>{error}</p>
          <p>Steps to fix:</p>
          <ol>
            <li>Make sure you're in the backend directory</li>
            <li>Run: npm install</li>
            <li>Run: npm start</li>
            <li>Check that you see "Backend server running" in the terminal</li>
          </ol>
        </div>
      )}
    </div>
  );
};

export default TestAPI; 