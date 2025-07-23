import React from 'react';
// import FigmaDesktop from './FigmaDesktop'; // Temporarily disabled due to syntax errors

const HomePage = () => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      background: '#000',
      color: '#FFF',
      fontFamily: 'Inter, sans-serif'
    }}>
      <div style={{ textAlign: 'center' }}>
        <h1>Homepage</h1>
        <p>FigmaDesktop component temporarily disabled</p>
        <p>Visit <a href="?test=verification" style={{ color: '#00FF40' }}>?test=verification</a> to test verification UI</p>
      </div>
    </div>
  );
};

export default HomePage;
