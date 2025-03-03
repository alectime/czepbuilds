import React, { useState, useEffect } from 'react';
import { calculateVPD } from '../utils/vpdCalculations';
import VPDVisualization from './VPDVisualization';
import './VPDCalculator.css';

const VPDCalculator: React.FC = () => {
  const [airTemp, setAirTemp] = useState<number>(75);
  const [humidity, setHumidity] = useState<number>(50);
  const [tempUnit, setTempUnit] = useState<'F' | 'C'>('F');
  const [vpdValue, setVpdValue] = useState<number>(0);

  const handleTempUnitChange = (unit: 'F' | 'C') => {
    if (unit === tempUnit) return;
    
    // Convert temperature when changing units
    if (unit === 'C') {
      // F to C
      setAirTemp(Math.round((airTemp - 32) * (5 / 9)));
    } else {
      // C to F
      setAirTemp(Math.round((airTemp * (9 / 5)) + 32));
    }
    
    setTempUnit(unit);
  };

  // Handle chart click to update temperature and humidity
  const handleChartClick = (newTemp: number, newHumidity: number) => {
    setAirTemp(newTemp);
    setHumidity(newHumidity);
  };

  // Calculate VPD whenever inputs change
  useEffect(() => {
    // Convert to Celsius for VPD calculation if needed
    const tempInC = tempUnit === 'F' ? (airTemp - 32) * (5 / 9) : airTemp;
    const vpd = calculateVPD(tempInC, humidity);
    setVpdValue(vpd);
  }, [airTemp, humidity, tempUnit]);

  const vpdStatus = (() => {
    if (vpdValue < 0.4) return "Danger Zone (Under Transpiration)";
    else if (vpdValue < 0.8) return "Early Vegetative Growth / Propagation (Low Transpiration)";
    else if (vpdValue < 1.2) return "Late Vegetative / Early Flower (Healthy Transpiration)";
    else if (vpdValue < 1.6) return "Mid / Late Flower (High Transpiration)";
    else return "Danger Zone (Over Transpiration)";
  })();

  // VPD ranges data for the ranges panel
  const vpdRanges = [
    { color: '#785673', range: '0.0-0.4 kPa', description: 'Danger Zone (Under Transpiration)' },
    { color: '#a3b03a', range: '0.4-0.8 kPa', description: 'Early Vegetative Growth / Propagation (Low Transpiration)' },
    { color: '#578735', range: '0.8-1.2 kPa', description: 'Late Vegetative / Early Flower (Healthy Transpiration)' },
    { color: '#f4bb4a', range: '1.2-1.6 kPa', description: 'Mid / Late Flower (High Transpiration)' },
    { color: '#4e8cd6', range: '1.6-2.0 kPa', description: 'Danger Zone (Over Transpiration)' },
  ];

  return (
    <div className="vpd-calculator">
      <div className="vpd-layout">
        {/* VPD Chart */}
        <div className="chart-container">
          <VPDVisualization
            airTemp={airTemp}
            humidity={humidity}
            tempUnit={tempUnit}
            onChartClick={handleChartClick}
          />
        </div>

        {/* Controls and VPD Ranges in a responsive container */}
        <div className="controls-and-ranges">
          {/* Controls Panel */}
          <div className="controls-container">
            <div className="control-panel">
              {/* VPD Result at the top */}
              <div className="vpd-result">
                <h2>Current VPD: {vpdValue.toFixed(2)} kPa</h2>
                <p className="vpd-status">{vpdStatus}</p>
              </div>

              <div className="input-divider"></div>

              {/* Temperature Input */}
              <div className="input-group">
                <label htmlFor="airTemp">Air Temperature:</label>
                <div className="input-with-units">
                  <input
                    id="airTemp"
                    type="number"
                    value={airTemp}
                    onChange={(e) => setAirTemp(Number(e.target.value))}
                    min={tempUnit === 'F' ? 32 : 0}
                    max={tempUnit === 'F' ? 122 : 50}
                  />
                  <div className="unit-selector">
                    <button
                      className={tempUnit === 'F' ? 'active' : ''}
                      onClick={() => handleTempUnitChange('F')}
                    >
                      °F
                    </button>
                    <button
                      className={tempUnit === 'C' ? 'active' : ''}
                      onClick={() => handleTempUnitChange('C')}
                    >
                      °C
                    </button>
                  </div>
                </div>
              </div>

              {/* Humidity Input */}
              <div className="input-group">
                <label htmlFor="humidity">Relative Humidity:</label>
                <div className="input-with-units">
                  <input
                    id="humidity"
                    type="number"
                    value={humidity}
                    onChange={(e) => setHumidity(Number(e.target.value))}
                    min={0}
                    max={100}
                  />
                  <span className="unit">%</span>
                </div>
              </div>
            </div>
          </div>

          {/* VPD Ranges Panel */}
          <div className="vpd-ranges-container">
            <div className="vpd-ranges-panel">
              <h3 className="vpd-ranges-title">VPD Ranges</h3>
              
              {vpdRanges.map((range, index) => (
                <div key={index} className="vpd-range-item">
                  <div 
                    className="color-indicator" 
                    style={{ backgroundColor: range.color }}
                  ></div>
                  <div className="range-text">
                    <strong>{range.range}:</strong> {range.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VPDCalculator; 