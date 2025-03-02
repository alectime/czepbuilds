import React from 'react';
import { Link } from 'react-router-dom';
import VPDCalculator from './VPDCalculator';
import '../styles/ProjectPage.css'; // Reusing project page styling for consistency

const VPDCalculatorPage: React.FC = () => {
  return (
    <div className="project-page">
      <div className="project-page-header">
        <div className="container">
          <Link to="/projects" className="back-button">
            ← Back to Projects
          </Link>
          <h1 className="project-title">VPD Calculator</h1>
          <div className="project-divider"></div>
          <p className="project-overview">
            This interactive tool helps calculate and visualize Vapor Pressure Deficit (VPD), a critical 
            measurement for optimal plant growth conditions. VPD represents the difference between the 
            amount of moisture in the air and how much moisture the air can hold when saturated.
          </p>
          <div className="project-tags">
            <span className="project-tag">React</span>
            <span className="project-tag">TypeScript</span>
            <span className="project-tag">Agriculture</span>
            <span className="project-tag">CEA</span>
          </div>
        </div>
      </div>

      <div className="project-content">
        <div className="container">
          <section className="project-section">
            <h2>The Calculator</h2>
            <p>
              Use the calculator below to determine the VPD based on air temperature and 
              relative humidity. The visualization shows where your 
              current VPD falls within optimal ranges for different growth stages.
            </p>
            
            <VPDCalculator />
            
            <div className="calculator-notes">
              <h3>VPD Ranges</h3>
              <ul>
                <li><span className="color-dot" style={{backgroundColor: '#e74c3c'}}></span> 0.0-0.4 kPa: Too low, high disease risk</li>
                <li><span className="color-dot" style={{backgroundColor: '#2ecc71'}}></span> 0.4-0.8 kPa: Ideal for clones and young plants</li>
                <li><span className="color-dot" style={{backgroundColor: '#f1c40f'}}></span> 0.8-1.2 kPa: Ideal for vegetative growth</li>
                <li><span className="color-dot" style={{backgroundColor: '#e67e22'}}></span> 1.2-1.6 kPa: Ideal for flowering/fruiting</li>
                <li><span className="color-dot" style={{backgroundColor: '#e74c3c'}}></span> 1.6-2.0 kPa: High, may cause plant stress</li>
              </ul>
              
              <h3>Important Notes</h3>
              <ul>
                <li>
                  <strong>Veg Stage:</strong> VPD of 0.8-1.0 kPa is typically ideal for vegetative growth.
                </li>
                <li>
                  <strong>Flower/Fruit Stage:</strong> VPD of 1.0-1.2 kPa is optimal for flowering and fruiting.
                </li>
                <li>
                  <strong>Environmental Control:</strong> Maintaining proper VPD levels requires balancing 
                  temperature and humidity in your growing environment.
                </li>
                <li>
                  <strong>Plant Health:</strong> Proper VPD management helps prevent stress, improves nutrient uptake, 
                  and reduces susceptibility to pests and diseases.
                </li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default VPDCalculatorPage; 