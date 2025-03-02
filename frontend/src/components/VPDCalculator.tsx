import React, { useState, useEffect } from 'react';
import { 
  calculateVPD, 
  celsiusToFahrenheit, 
  fahrenheitToCelsius,
  calculateDewPoint,
  isLeafTempUnderDewPoint,
  getVpdRecommendation
} from '../utils/vpdCalculations';
import VPDVisualization from './VPDVisualization';
import '../styles/VPDCalculator.css';

interface VPDCalculatorProps {
  className?: string;
}

type TemperatureUnit = 'C' | 'F';

const VPDCalculator: React.FC<VPDCalculatorProps> = ({ className = '' }) => {
  // Input state
  const [airTempC, setAirTempC] = useState<number>(23);
  const [airTempF, setAirTempF] = useState<number>(celsiusToFahrenheit(23));
  const [humidityPercent, setHumidityPercent] = useState<number>(60);
  const [leafTempOffset, setLeafTempOffset] = useState<number>(-2); // Leaf temp is typically cooler than air
  const [tempUnit, setTempUnit] = useState<TemperatureUnit>('C');
  const [usingCustomLeafTemp, setUsingCustomLeafTemp] = useState<boolean>(false);
  const [customLeafTempC, setCustomLeafTempC] = useState<number>(21);
  const [customLeafTempF, setCustomLeafTempF] = useState<number>(celsiusToFahrenheit(21));

  // Calculated values
  const [vpd, setVpd] = useState<number>(0);
  const [dewPoint, setDewPoint] = useState<number>(0);
  const [isCondensationRisk, setIsCondensationRisk] = useState<boolean>(false);

  // Calculate leaf temperature based on air temp and offset
  const leafTempC = usingCustomLeafTemp 
    ? customLeafTempC 
    : airTempC + leafTempOffset;
  
  const leafTempF = usingCustomLeafTemp
    ? customLeafTempF
    : celsiusToFahrenheit(leafTempC);

  // Calculate VPD when inputs change
  useEffect(() => {
    // Calculate VPD with leaf temperature for more accurate results
    const vpdValue = calculateVPD(airTempC, humidityPercent, leafTempC);
    setVpd(vpdValue);

    // Calculate dew point
    const dewPointValue = calculateDewPoint(airTempC, humidityPercent);
    setDewPoint(dewPointValue);

    // Check condensation risk
    setIsCondensationRisk(isLeafTempUnderDewPoint(leafTempC, dewPointValue));
  }, [airTempC, humidityPercent, leafTempC]);

  // Handle temperature unit toggle
  const handleUnitToggle = () => {
    if (tempUnit === 'C') {
      setTempUnit('F');
    } else {
      setTempUnit('C');
    }
  };

  // Handle air temperature input
  const handleAirTempChange = (value: number) => {
    if (isNaN(value)) return;
    
    if (tempUnit === 'C') {
      setAirTempC(value);
      setAirTempF(celsiusToFahrenheit(value));
    } else {
      setAirTempF(value);
      setAirTempC(fahrenheitToCelsius(value));
    }
  };

  // Handle custom leaf temperature input
  const handleLeafTempChange = (value: number) => {
    if (isNaN(value)) return;
    
    if (tempUnit === 'C') {
      setCustomLeafTempC(value);
      setCustomLeafTempF(celsiusToFahrenheit(value));
    } else {
      setCustomLeafTempF(value);
      setCustomLeafTempC(fahrenheitToCelsius(value));
    }
  };

  // Handle humidity input
  const handleHumidityChange = (value: number) => {
    if (isNaN(value)) return;
    setHumidityPercent(Math.min(100, Math.max(0, value)));
  };

  // Get recommendation based on VPD
  const recommendation = getVpdRecommendation(vpd);

  return (
    <div className={`vpd-calculator ${className}`}>
      <div className="calculator-container">
        <div className="calculator-header">
          <h3>VPD Calculator</h3>
          <p>Calculate Vapor Pressure Deficit (VPD) based on temperature and humidity inputs</p>
        </div>

        <div className="input-section">
          <div className="input-group">
            <label>
              <span>Air Temperature ({tempUnit}°)</span>
              <div className="input-with-toggle">
                <input
                  type="number"
                  value={tempUnit === 'C' ? airTempC : airTempF}
                  onChange={(e) => handleAirTempChange(parseFloat(e.target.value))}
                  step="0.1"
                  min={tempUnit === 'C' ? -10 : 14}
                  max={tempUnit === 'C' ? 50 : 122}
                />
                <button 
                  className="unit-toggle" 
                  onClick={handleUnitToggle}
                  title={`Switch to ${tempUnit === 'C' ? 'Fahrenheit' : 'Celsius'}`}
                >
                  °{tempUnit === 'C' ? 'F' : 'C'}
                </button>
              </div>
            </label>

            <label>
              <span>Relative Humidity (%)</span>
              <input
                type="number"
                value={humidityPercent}
                onChange={(e) => handleHumidityChange(parseFloat(e.target.value))}
                step="1"
                min="0"
                max="100"
              />
            </label>
          </div>

          <div className="input-group">
            <div className="leaf-temp-section">
              <h4>Leaf Temperature</h4>
              <div className="leaf-temp-options">
                <label className="radio-label">
                  <input
                    type="radio"
                    checked={!usingCustomLeafTemp}
                    onChange={() => setUsingCustomLeafTemp(false)}
                    name="leafTempType"
                  />
                  <span>Use calculated (air temp + offset)</span>
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    checked={usingCustomLeafTemp}
                    onChange={() => setUsingCustomLeafTemp(true)}
                    name="leafTempType"
                  />
                  <span>Use custom value</span>
                </label>
              </div>

              {!usingCustomLeafTemp ? (
                <label>
                  <span>Leaf Temperature Offset (°C)</span>
                  <div className="input-with-info">
                    <input
                      type="number"
                      value={leafTempOffset}
                      onChange={(e) => setLeafTempOffset(parseFloat(e.target.value) || 0)}
                      step="0.1"
                      min="-10"
                      max="10"
                    />
                    <span className="input-info">
                      Leaf Temp: {tempUnit === 'C' ? leafTempC.toFixed(1) : leafTempF.toFixed(1)}°{tempUnit}
                    </span>
                  </div>
                </label>
              ) : (
                <label>
                  <span>Custom Leaf Temperature ({tempUnit}°)</span>
                  <input
                    type="number"
                    value={tempUnit === 'C' ? customLeafTempC : customLeafTempF}
                    onChange={(e) => handleLeafTempChange(parseFloat(e.target.value))}
                    step="0.1"
                    min={tempUnit === 'C' ? -10 : 14}
                    max={tempUnit === 'C' ? 50 : 122}
                  />
                </label>
              )}
            </div>
          </div>
        </div>

        <div className="results-section">
          <div className="result-main">
            <h3>VPD Result: <span className="result-value">{vpd.toFixed(2)} kPa</span></h3>
            <p className="recommendation" style={{ color: recommendation.color }}>
              {recommendation.text}
            </p>
          </div>

          {isCondensationRisk && (
            <div className="warning-message">
              <strong>Condensation Risk!</strong> Leaf temperature ({leafTempC.toFixed(1)}°C) is below dew point ({dewPoint.toFixed(1)}°C).
              This can lead to water condensation on leaves and increase disease risk.
            </div>
          )}

          <div className="additional-results">
            <div className="result-item">
              <span className="result-label">Dew Point:</span>
              <span className="result-value">
                {tempUnit === 'C' 
                  ? `${dewPoint.toFixed(1)}°C` 
                  : `${celsiusToFahrenheit(dewPoint).toFixed(1)}°F`}
              </span>
            </div>
            <div className="result-item">
              <span className="result-label">Leaf Temperature:</span>
              <span className="result-value">
                {tempUnit === 'C' 
                  ? `${leafTempC.toFixed(1)}°C` 
                  : `${leafTempF.toFixed(1)}°F`}
              </span>
            </div>
          </div>
        </div>

        <div className="visualization-section">
          <h4>VPD Range Visualization</h4>
          <VPDVisualization vpd={vpd} />
        </div>
      </div>
    </div>
  );
};

export default VPDCalculator; 