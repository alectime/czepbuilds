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

  return (
    <div className="calculator-container">
      <div className="calculator-layout">
        <div className="vpd-visualization">
          <VPDVisualization
            airTemp={airTemp}
            humidity={humidity}
            tempUnit={tempUnit}
          />
        </div>
        
        <div className="calculator-form">
          <div className="form-group">
            <label>Temperature Unit:</label>
            <div className="unit-toggle">
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

          <div className="form-group">
            <label>Air Temperature (°{tempUnit}):</label>
            <input
              type="number"
              value={airTemp}
              onChange={(e) => setAirTemp(Number(e.target.value))}
              min={tempUnit === 'F' ? 32 : 0}
              max={tempUnit === 'F' ? 122 : 50}
            />
          </div>

          <div className="form-group">
            <label>Relative Humidity (%):</label>
            <input
              type="number"
              value={humidity}
              onChange={(e) => setHumidity(Number(e.target.value))}
              min={0}
              max={100}
            />
          </div>

          <div className={`vpd-result ${vpdClass}`}>
            <label>Current VPD:</label>
            <div className="vpd-value">
              {currentVpd} kPa
            </div>
            <div className="vpd-range-indicator">
              {vpdValue < 0.4 && "Danger Zone (Under Transpiration)"}
              {vpdValue >= 0.4 && vpdValue < 0.8 && "Early Vegetative Growth / Propagation (Low Transpiration)"}
              {vpdValue >= 0.8 && vpdValue < 1.2 && "Late Vegetative / Early Flower (Healthy Transpiration)"}
              {vpdValue >= 1.2 && vpdValue < 1.6 && "Mid / Late Flower (High Transpiration)"}
              {vpdValue >= 1.6 && "Danger Zone (Over Transpiration)"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VPDCalculator; 