import React, { useEffect } from 'react';
import '../styles/ProjectPage.css';

const SporeLink: React.FC = () => {
  useEffect(() => {
    // Redirect to Pure Harbor Naturals website
    window.location.href = 'https://pureharbornaturals.com/';
  }, []);

  return (
    <div className="project-page">
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center',
        minHeight: '60vh',
        padding: '2rem',
        textAlign: 'center'
      }}>
        <h1>Pure Harbor Naturals and Spore Link</h1>
        <p>Redirecting to Pure Harbor Naturals website...</p>
        <p>If you are not redirected automatically, please <a href="https://pureharbornaturals.com/" style={{ textDecoration: 'underline', color: 'var(--color-primary)' }}>click here</a>.</p>
      </div>
    </div>
  );
};

export default SporeLink; 