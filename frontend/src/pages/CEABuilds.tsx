import React from 'react';
import { Link } from 'react-router-dom';
import MediaGallery from '../components/MediaGallery';
import '../styles/ProjectPage.css';

const CEABuilds: React.FC = () => {
  // Mock data for the project showcase
  const mediaItems = [
    {
      src: 'https://placehold.co/800x500/123524/f7f7f2?text=CEA+Builds+Main',
      alt: 'CEA Build Overview',
      type: 'image' as const,
      caption: 'Overview of a custom CEA build with modular construction'
    },
    {
      src: 'https://placehold.co/600x400/123524/f7f7f2?text=Climate+Control+System',
      alt: 'Automated Climate Control System',
      type: 'image' as const,
      caption: 'Precision climate control system with sensor integration'
    },
    {
      src: 'https://placehold.co/600x400/123524/f7f7f2?text=Modular+Design',
      alt: 'Modular Construction Design',
      type: 'image' as const,
      caption: 'Modular components allowing for customizable configurations'
    }
  ];

  return (
    <div className="project-page">
      <div className="project-hero">
        <div className="container">
          <h1>Controlled Environmental Agriculture Builds</h1>
          <div className="divider"></div>
          <p className="project-subtitle">Custom-designed growing environments for precision agriculture</p>
        </div>
      </div>
      
      <div className="container">
        <div className="project-section">
          <h2>Project Overview</h2>
          <p>
            The CEA Builds project focuses on developing custom-designed growing environments for precision agriculture,
            featuring automated climate control systems and modular construction. These builds are designed to create
            optimal conditions for plant growth while minimizing resource consumption and environmental impact.
          </p>
          
          <div className="project-details">
            <div className="detail-item">
              <h3>Timeline</h3>
              <p>2022 - Present</p>
            </div>
            <div className="detail-item">
              <h3>Role</h3>
              <p>Systems Designer & IoT Developer</p>
            </div>
            <div className="detail-item">
              <h3>Technologies</h3>
              <div className="tech-tags">
                <span className="tech-tag">IoT</span>
                <span className="tech-tag">Automation</span>
                <span className="tech-tag">CAD</span>
                <span className="tech-tag">Sustainable Design</span>
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
              <h3>Modular Construction</h3>
              <p>Adaptable building components that can be configured to different scales and purposes based on client needs.</p>
            </div>
            <div className="feature">
              <h3>IoT Climate Control</h3>
              <p>Integrated sensor networks and control systems that maintain precise environmental conditions with minimal energy use.</p>
            </div>
            <div className="feature">
              <h3>Sustainable Resource Management</h3>
              <p>Water recirculation, energy-efficient lighting, and passive climate regulation to reduce resource consumption.</p>
            </div>
          </div>
        </div>
        
        <div className="project-section">
          <h2>Process & Challenges</h2>
          <p>
            The development of CEA Builds required balancing multiple competing factors: energy efficiency, 
            environmental precision, construction cost, and ease of use. Key challenges included designing control 
            systems that were powerful enough for professional use but intuitive enough for growers with limited 
            technical background. The modular approach emerged from extensive prototyping and field testing with 
            various stakeholders.
          </p>
        </div>
        
        <div className="project-navigation">
          <Link to="/" className="back-button">Back to Projects</Link>
          <div className="project-links">
            <a href="#" className="project-link">Learn More</a>
            <a href="#" className="github-link">Documentation</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CEABuilds; 