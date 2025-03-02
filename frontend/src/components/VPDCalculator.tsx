import React, { useState, useEffect } from 'react';
import { 
  calculateVPD, 
  celsiusToFahrenheit, 
  fahrenheitToCelsius,
  calculateDewPoint,
  isLeafTempUnderDewPoint
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
  const [tempUnit, setTempUnit] = useState<TemperatureUnit>('F');
  const [vpd, setVpd] = useState<number>(0);
  const [dewPoint, setDewPoint] = useState<number>(0);
  const [isCondensationRisk, setIsCondensationRisk] = useState<boolean>(false);

  // Calculate VPD when inputs change
  useEffect(() => {
    const vpdValue = calculateVPD(airTempC, humidityPercent);
    setVpd(vpdValue);

    const dewPointValue = calculateDewPoint(airTempC, humidityPercent);
    setDewPoint(dewPointValue);

    setIsCondensationRisk(isLeafTempUnderDewPoint(airTempC, dewPointValue));
  }, [airTempC, humidityPercent]);

  // Handle temperature unit toggle
  const handleUnitToggle = () => {
    setTempUnit(tempUnit === 'C' ? 'F' : 'C');
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

  // Handle humidity input
  const handleHumidityChange = (value: number) => {
    if (isNaN(value)) return;
    setHumidityPercent(Math.min(100, Math.max(0, value)));
  };

  return (
    <div className={`vpd-calculator ${className}`}>
      <div className="calculator-container">
        <div className="calculator-layout">
          <div className="input-section">
            <div className="input-group">
              <label>
                <span>Air Temperature ({tempUnit}°)</span>
                <div className="input-with-toggle">
                  <input
                    type="number"
                    value={tempUnit === 'C' ? airTempC.toFixed(1) : airTempF.toFixed(1)}
                    onChange={(e) => handleAirTempChange(parseFloat(e.target.value))}
                    step="0.1"
                    min={tempUnit === 'C' ? 0 : 32}
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
                <span>Air Relative Humidity (%)</span>
                <input
                  type="number"
                  value={humidityPercent.toFixed(1)}
                  onChange={(e) => handleHumidityChange(parseFloat(e.target.value))}
                  step="0.1"
                  min="0"
                  max="100"
                />
              </label>
            </div>
          </div>

          <div className="chart-section">
            <VPDVisualization 
              airTemp={tempUnit === 'F' ? airTempF : airTempC}
              humidity={humidityPercent}
              tempUnit={tempUnit}
            />
          </div>

          <div className="recommendations-section">
            <h2>VPD Ranges & Recommendations</h2>
            <div className="vpd-ranges">
              {isCondensationRisk && (
                <div className="range-item danger">
                  <strong>Leaf Temperature Under Dew Point - Danger Zone (Plant Disease)</strong>
                  <p>Risk of condensation and fungal growth</p>
                </div>
              )}
              <div className="range-item danger">
                <strong>VPD under 0.4 - Danger Zone (Under Transpiration)</strong>
                <p>High risk of fungal diseases and poor nutrient uptake</p>
              </div>
              <div className="range-item early-veg">
                <strong>VPD from 0.4 to 0.8 kPa - Early Vegetative Growth / Propagation</strong>
                <p>Ideal for clones, seedlings, and early vegetative growth</p>
              </div>
              <div className="range-item late-veg">
                <strong>VPD from 0.8 to 1.2 kPa - Late Vegetative / Early Flower</strong>
                <p>Optimal for established plants and early flowering</p>
              </div>
              <div className="range-item flower">
                <strong>VPD from 1.2 to 1.6 kPa - Mid / Late Flower</strong>
                <p>Suitable for flowering and fruiting stages</p>
              </div>
              <div className="range-item danger">
                <strong>VPD over 1.6 - Danger Zone (Over Transpiration)</strong>
                <p>Risk of excessive water loss and plant stress</p>
              </div>
            </div>

            <div className="current-vpd">
              <h3>Current VPD: {vpd.toFixed(2)} kPa</h3>
              <p>Dew Point: {tempUnit === 'C' ? dewPoint.toFixed(1) : celsiusToFahrenheit(dewPoint).toFixed(1)}°{tempUnit}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VPDCalculator; 