import React, { useEffect, useState } from 'react';
import VPDCalculator from './VPDCalculator';
import '../styles/ProjectPage.css';

const VPDCalculatorPage: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="project-page">
      <div className="project-content">
        <div 
          className="container" 
          style={{ 
            maxWidth: '1400px',
            padding: isMobile ? '0' : undefined // Remove padding on mobile screens
          }}
        >
          <section 
            className="project-section" 
            style={{ 
              margin: 0,
              padding: 0
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'center', padding: '1rem 0' }}>
              <VPDCalculator />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default VPDCalculatorPage; 