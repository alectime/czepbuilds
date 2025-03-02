import React from 'react';
import { Link } from 'react-router-dom';
import MediaGallery from '../components/MediaGallery';
import '../styles/ProjectPage.css';

const SporeLink: React.FC = () => {
  // Mock data for the project showcase
  const mediaItems = [
    {
      src: 'https://placehold.co/800x500/123524/f7f7f2?text=Spore+Link+Main+Image',
      alt: 'Spore Link Platform Dashboard',
      type: 'image' as const,
      caption: 'The main dashboard of the Spore Link platform'
    },
    {
      src: 'https://placehold.co/600x400/123524/f7f7f2?text=Strain+Database',
      alt: 'Strain Database Interface',
      type: 'image' as const,
      caption: 'Comprehensive strain database with filtering options'
    },
    {
      src: 'https://placehold.co/600x400/123524/f7f7f2?text=Community+Forum',
      alt: 'Community Forum',
      type: 'image' as const,
      caption: 'Active community forum for knowledge sharing'
    }
  ];

  return (
    <div className="project-page">
      <div className="project-hero">
        <div className="container">
          <h1>Spore Link</h1>
          <div className="divider"></div>
          <p className="project-subtitle">A comprehensive platform connecting mycology enthusiasts</p>
        </div>
      </div>
      
      <div className="container">
        <div className="project-section">
          <h2>Project Overview</h2>
          <p>
            Spore Link is a dedicated platform designed to connect mycology enthusiasts with cultivation resources, 
            strain databases, and community knowledge sharing. The platform provides a comprehensive ecosystem for 
            mycologists of all experience levels, from beginners to advanced researchers.
          </p>
          
          <div className="project-details">
            <div className="detail-item">
              <h3>Timeline</h3>
              <p>2023 - Present</p>
            </div>
            <div className="detail-item">
              <h3>Role</h3>
              <p>Lead Developer & Designer</p>
            </div>
            <div className="detail-item">
              <h3>Technologies</h3>
              <div className="tech-tags">
                <span className="tech-tag">React</span>
                <span className="tech-tag">Firebase</span>
                <span className="tech-tag">Node.js</span>
                <span className="tech-tag">MongoDB</span>
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
              <h3>Strain Database</h3>
              <p>Comprehensive database of mushroom strains with detailed growth parameters, genetics, and user reviews.</p>
            </div>
            <div className="feature">
              <h3>Growth Tracking</h3>
              <p>Tools to document and track cultivation progress with data visualization and environmental variable monitoring.</p>
            </div>
            <div className="feature">
              <h3>Community Forum</h3>
              <p>Knowledge-sharing platform for techniques, troubleshooting, and research discussions within the mycology community.</p>
            </div>
          </div>
        </div>
        
        <div className="project-section">
          <h2>Process & Challenges</h2>
          <p>
            The development of Spore Link involved extensive research into the needs of the mycology community. 
            Key challenges included designing a database schema flexible enough to accommodate the diverse strain 
            data while maintaining good performance. The project required balancing technical requirements with 
            an intuitive user experience for users with varying technical backgrounds.
          </p>
        </div>
        
        <div className="project-navigation">
          <Link to="/" className="back-button">Back to Projects</Link>
          <div className="project-links">
            <a href="#" className="project-link">Live Demo</a>
            <a href="#" className="github-link">GitHub Repo</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SporeLink; 