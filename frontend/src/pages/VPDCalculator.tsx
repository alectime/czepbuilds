import React from 'react';
import { Link } from 'react-router-dom';
import MediaGallery from '../components/MediaGallery';
import '../styles/ProjectPage.css';

const VPDCalculator: React.FC = () => {
  // Mock data for the project showcase
  const mediaItems = [
    {
      src: 'https://placehold.co/800x500/123524/f7f7f2?text=VPD+Calculator+Main',
      alt: 'VPD Calculator Interface',
      type: 'image' as const,
      caption: 'The main interface of the VPD Calculator app'
    },
    {
      src: 'https://placehold.co/600x400/123524/f7f7f2?text=VPD+Chart+Visualization',
      alt: 'VPD Chart Visualization',
      type: 'image' as const,
      caption: 'Dynamic visualization of VPD ranges for different plant growth stages'
    },
    {
      src: 'https://placehold.co/600x400/123524/f7f7f2?text=Mobile+View',
      alt: 'Mobile Responsive Design',
      type: 'image' as const,
      caption: 'Responsive design optimized for mobile use in growing environments'
    }
  ];

  return (
    <div className="project-page">
      <div className="project-hero">
        <div className="container">
          <h1>VPD Calculator</h1>
          <div className="divider"></div>
          <p className="project-subtitle">An interactive tool for calculating Vapor Pressure Deficit</p>
        </div>
      </div>
      
      <div className="container">
        <div className="project-section">
          <h2>Project Overview</h2>
          <p>
            The VPD Calculator is an interactive tool designed for calculating Vapor Pressure Deficit, an essential 
            metric for optimizing growing conditions in controlled environments. This web application helps growers 
            maintain ideal plant transpiration rates by providing real-time VPD calculations and recommendations.
          </p>
          
          <div className="project-details">
            <div className="detail-item">
              <h3>Timeline</h3>
              <p>2023 - Present</p>
            </div>
            <div className="detail-item">
              <h3>Role</h3>
              <p>Full-stack Developer</p>
            </div>
            <div className="detail-item">
              <h3>Technologies</h3>
              <div className="tech-tags">
                <span className="tech-tag">TypeScript</span>
                <span className="tech-tag">React</span>
                <span className="tech-tag">D3.js</span>
                <span className="tech-tag">Progressive Web App</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="project-section">
          <h2>Gallery</h2>
          <MediaGallery 
            items={mediaItems} 
            layout="grid" 
            columns={3}
            enableLightbox={true}
          />
        </div>
        
        <div className="project-section">
          <h2>Key Features</h2>
          <div className="features-grid">
            <div className="feature">
              <h3>Real-time Calculations</h3>
              <p>Instant VPD calculations based on temperature, relative humidity, and leaf temperature inputs.</p>
            </div>
            <div className="feature">
              <h3>Interactive Visualizations</h3>
              <p>Dynamic charts and graphs using D3.js to visualize optimal VPD ranges for different plant growth stages.</p>
            </div>
            <div className="feature">
              <h3>Offline Functionality</h3>
              <p>Progressive Web App design allowing full functionality without internet connection in growing environments.</p>
            </div>
          </div>
        </div>
        
        <div className="project-section">
          <h2>Process & Challenges</h2>
          <p>
            The development of the VPD Calculator began with extensive research into plant physiology and environmental 
            science to ensure accuracy of calculations. A key challenge was creating an intuitive interface that would be 
            useful for both novice gardeners and commercial growers. The visualization component required careful design 
            to represent complex data relationships in an accessible format. Implementing offline functionality as a PWA 
            was essential for use in locations with limited connectivity.
          </p>
        </div>
        
        <div className="project-navigation">
          <Link to="/" className="back-button">Back to Projects</Link>
          <div className="project-links">
            <a href="#" className="project-link">Use Calculator</a>
            <a href="#" className="github-link">GitHub Repo</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VPDCalculator; 