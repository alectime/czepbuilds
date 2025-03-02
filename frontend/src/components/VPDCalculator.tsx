import React, { useState } from 'react';
import VPDVisualization from './VPDVisualization';
import { calculateVPD } from '../utils/vpdCalculations';

const VPDCalculator: React.FC = () => {
  const [airTemp, setAirTemp] = useState<number>(75);
  const [humidity, setHumidity] = useState<number>(50);
  const [tempUnit, setTempUnit] = useState<'F' | 'C'>('F');

  const handleTempUnitChange = (unit: 'F' | 'C') => {
    if (unit === tempUnit) return;
    
    // Convert temperatures when changing units
    if (unit === 'C') {
      setAirTemp(Math.round((airTemp - 32) * (5 / 9)));
    } else {
      setAirTemp(Math.round((airTemp * (9 / 5)) + 32));
    }
    setTempUnit(unit);
  };

  // Handle chart click to update temperature and humidity
  const handleChartClick = (newTemp: number, newHumidity: number) => {
    setAirTemp(newTemp);
    setHumidity(newHumidity);
  };

  // Calculate current VPD
  const currentVpd = calculateVPD(
    tempUnit === 'F' ? (airTemp - 32) * (5 / 9) : airTemp,
    humidity
  ).toFixed(2);

  // Determine VPD range for visual indication
  let vpdClass = '';
  const vpdValue = parseFloat(currentVpd);
  if (vpdValue < 0.4) vpdClass = 'vpd-under-transpiration';
  else if (vpdValue < 0.8) vpdClass = 'vpd-early-veg';
  else if (vpdValue < 1.2) vpdClass = 'vpd-late-veg';
  else if (vpdValue < 1.6) vpdClass = 'vpd-flower';
  else vpdClass = 'vpd-over-transpiration';

  const vpdStatus = (() => {
    if (vpdValue < 0.4) return "Danger Zone (Under Transpiration)";
    else if (vpdValue < 0.8) return "Early Vegetative Growth / Propagation (Low Transpiration)";
    else if (vpdValue < 1.2) return "Late Vegetative / Early Flower (Healthy Transpiration)";
    else if (vpdValue < 1.6) return "Mid / Late Flower (High Transpiration)";
    else return "Danger Zone (Over Transpiration)";
  })();

  return (
    <div className="vpd-calculator">
      <div className="input-section">
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

      {/* VPD Result */}
      <div className="vpd-result">
        <h2>Current VPD: {vpdValue.toFixed(2)} kPa</h2>
        <p className="vpd-status">{vpdStatus}</p>
      </div>

      {/* VPD Chart */}
      <div className="chart-container">
        <VPDVisualization
          airTemp={airTemp}
          humidity={humidity}
          tempUnit={tempUnit}
          onChartClick={handleChartClick}
        />
      </div>
    </div>
  );
};

export default VPDCalculator; 