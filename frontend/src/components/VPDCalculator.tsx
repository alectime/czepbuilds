import React, { useState } from 'react';
import VPDVisualization from './VPDVisualization';
import { calculateVPD } from '../utils/vpdCalculations';

const VPDCalculator: React.FC = () => {
  const [airTemp, setAirTemp] = useState<number>(75);
  const [humidity, setHumidity] = useState<number>(50);
  const [leafTemp, setLeafTemp] = useState<number>(73);
  const [tempUnit, setTempUnit] = useState<'F' | 'C'>('F');

  const handleTempUnitChange = (unit: 'F' | 'C') => {
    if (unit === tempUnit) return;
    
    // Convert temperatures when changing units
    if (unit === 'C') {
      setAirTemp(Math.round((airTemp - 32) * (5 / 9)));
      setLeafTemp(Math.round((leafTemp - 32) * (5 / 9)));
    } else {
      setAirTemp(Math.round((airTemp * (9 / 5)) + 32));
      setLeafTemp(Math.round((leafTemp * (9 / 5)) + 32));
    }
    setTempUnit(unit);
  };

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
            <label>Leaf Temperature (°{tempUnit}):</label>
            <input
              type="number"
              value={leafTemp}
              onChange={(e) => setLeafTemp(Number(e.target.value))}
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

          <div className="vpd-result">
            <label>Current VPD:</label>
            <div className="vpd-value">
              {calculateVPD(
                tempUnit === 'F' ? (airTemp - 32) * (5 / 9) : airTemp,
                humidity
              ).toFixed(2)} kPa
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VPDCalculator; 