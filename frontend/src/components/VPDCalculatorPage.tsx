import React from 'react';
import VPDCalculator from './VPDCalculator';
import '../styles/ProjectPage.css'; // Reusing project page styling for consistency

const VPDCalculatorPage: React.FC = () => {
  return (
    <div className="project-page">
      <div className="project-page-header">
        <div className="container">
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