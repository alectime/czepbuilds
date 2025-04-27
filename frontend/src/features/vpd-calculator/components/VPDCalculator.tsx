import React, { useState, useEffect } from 'react';
import { calculateVPD } from '../utils/vpdCalculations';
import VPDVisualization from './VPDVisualization';
import '../styles/VPDCalculator.css';

const VPDCalculator: React.FC = () => {
  const [airTemp, setAirTemp] = useState<number>(75);
  const [humidity, setHumidity] = useState<number>(50);
  const [tempUnit, setTempUnit] = useState<'F' | 'C'>('F');
  const [vpdValue, setVpdValue] = useState<number>(0);
  
  const handleTempUnitChange = (unit: 'F' | 'C') => {
    // When changing units, convert the temperature
    if (unit !== tempUnit) {
      if (unit === 'C') {
        // Convert F to C
        setAirTemp(Math.round((airTemp - 32) * (5 / 9)));
      } else {
        // Convert C to F
        setAirTemp(Math.round(airTemp * (9 / 5) + 32));
      }
      setTempUnit(unit);
    }
  };

  const handleChartClick = (newTemp: number, newHumidity: number) => {
    setAirTemp(newTemp);
    setHumidity(newHumidity);
  };

  // Calculate VPD whenever airTemp or humidity changes
  useEffect(() => {
    // Convert to Celsius for calculation if needed
    const tempInC = tempUnit === 'F' ? (airTemp - 32) * (5 / 9) : airTemp;
    const vpd = calculateVPD(tempInC, humidity);
    setVpdValue(vpd);
  }, [airTemp, humidity, tempUnit]);
  
  // Determine VPD status
  const vpdStatus = (() => {
    if (vpdValue < 0.4) {
      return { text: "Too Low - Under-transpiration", className: "danger" };
    } else if (vpdValue >= 0.4 && vpdValue < 0.8) {
      return { text: "Low - Early Veg", className: "low" };
    } else if (vpdValue >= 0.8 && vpdValue < 1.2) {
      return { text: "Ideal - Late Veg/Early Flower", className: "healthy" };
    } else if (vpdValue >= 1.2 && vpdValue < 1.6) {
      return { text: "High - Mid/Late Flower", className: "high" };
    } else {
      return { text: "Too High - Over-transpiration", className: "danger" };
    }
  })();
  
  // VPD ranges for the reference panel
  const vpdRanges = [
    { range: "< 0.4", label: "Too Low (Under-transpiration)", color: "#785673" },
    { range: "0.4 - 0.8", label: "Low (Early Veg)", color: "#a3b03a" },
    { range: "0.8 - 1.2", label: "Ideal (Late Veg/Early Flower)", color: "#578735" },
    { range: "1.2 - 1.6", label: "High (Mid/Late Flower)", color: "#f4bb4a" },
    { range: "> 1.6", label: "Too High (Over-transpiration)", color: "#4e8cd6" }
  ];

  return (
    <div className="vpd-calculator">
      <div className="vpd-layout">
        {/* VPD Chart */}
        <div className="calculator-section">
          <div className="chart-container">
            <VPDVisualization
              airTemp={airTemp}
              humidity={humidity}
              tempUnit={tempUnit}
              onChartClick={handleChartClick}
            />
          </div>
        </div>
        
        {/* Controls and VPD information */}
        <div className="controls-and-ranges">
          {/* Combined Controls Tile */}
          <div className="compact-controls-tile">
            {/* Current VPD Display */}
            <div className="compact-vpd-display">
              <div className="vpd-value-display">
                <div className="vpd-label">Current VPD</div>
                <div className={`vpd-value ${vpdStatus.className}`}>{vpdValue.toFixed(2)} kPa</div>
              </div>
              <div className="vpd-status-text">{vpdStatus.text}</div>
            </div>
            
            {/* Divider */}
            <div className="compact-tile-divider"></div>
            
            {/* Temperature Control */}
            <div className="compact-control">
              <label htmlFor="air-temp">Air Temperature</label>
              <div className="input-with-units">
                <input
                  id="air-temp"
                  type="number"
                  value={airTemp}
                  onChange={(e) => setAirTemp(parseFloat(e.target.value) || 0)}
                  min={tempUnit === 'F' ? 50 : 10}
                  max={tempUnit === 'F' ? 95 : 35}
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
            
            {/* Humidity Control */}
            <div className="compact-control">
              <label htmlFor="humidity">Relative Humidity</label>
              <div className="input-with-units">
                <input
                  id="humidity"
                  type="number"
                  value={humidity}
                  onChange={(e) => setHumidity(parseFloat(e.target.value) || 0)}
                  min={0}
                  max={100}
                />
                <div className="unit">%</div>
              </div>
            </div>
          </div>
          
          {/* VPD Ranges Panel */}
          <div className="vpd-ranges-panel">
            <div className="vpd-ranges-title">VPD Ranges (kPa)</div>
            {vpdRanges.map((range, index) => (
              <div key={index} className="vpd-range-item">
                <div className="color-indicator" style={{ backgroundColor: range.color }}></div>
                <div className="range-text">
                  <span>{range.range}:</span> {range.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VPDCalculator; 