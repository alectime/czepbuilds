import React, { useEffect, useRef } from 'react';
import { calculateVPD } from '../utils/vpdCalculations';

interface VPDVisualizationProps {
  airTemp: number;
  humidity: number;
  tempUnit: 'F' | 'C';
}

const VPDVisualization: React.FC<VPDVisualizationProps> = ({
  airTemp,
  humidity,
  tempUnit
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const width = 600;
  const height = 600;
  const margin = { top: 50, right: 50, bottom: 50, left: 60 };
  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom;

  // Convert Fahrenheit to Celsius
  const fahrenheitToCelsius = (f: number) => (f - 32) * (5 / 9);

  // Define temperature range (32°F to 122°F or 0°C to 50°C)
  const tempRangeF = {
    min: 32,
    max: 122
  };

  const tempRangeC = {
    min: 0,
    max: 50
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions with device pixel ratio for sharp rendering
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw background grid
    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 0.5;

    // Draw vertical grid lines (humidity)
    for (let h = 0; h <= 100; h += 10) {
      const x = margin.left + (h / 100) * chartWidth;
      ctx.beginPath();
      ctx.moveTo(x, margin.top);
      ctx.lineTo(x, height - margin.bottom);
      ctx.stroke();
    }

    // Draw horizontal grid lines (temperature)
    const tempStep = tempUnit === 'F' ? 10 : 5;
    const tempRange = tempUnit === 'F' ? tempRangeF : tempRangeC;
    for (let t = tempRange.min; t <= tempRange.max; t += tempStep) {
      const y = margin.top + ((t - tempRange.min) / (tempRange.max - tempRange.min)) * chartHeight;
      ctx.beginPath();
      ctx.moveTo(margin.left, y);
      ctx.lineTo(width - margin.right, y);
      ctx.stroke();
    }

    // Draw VPD zones
    for (let t = tempRange.min; t <= tempRange.max; t += 1) {
      for (let h = 0; h <= 100; h += 1) {
        const x = margin.left + (h / 100) * chartWidth;
        const y = margin.top + ((t - tempRange.min) / (tempRange.max - tempRange.min)) * chartHeight;
        
        // Calculate VPD
        const tempC = tempUnit === 'F' ? fahrenheitToCelsius(t) : t;
        const vpd = calculateVPD(tempC, h);
        
        // Set color based on VPD value
        let color = 'rgba(255, 0, 0, 0.3)'; // Default red for danger
        if (vpd >= 0.4 && vpd < 0.8) {
          color = 'rgba(255, 255, 0, 0.3)'; // Yellow for early veg
        } else if (vpd >= 0.8 && vpd < 1.2) {
          color = 'rgba(0, 255, 0, 0.3)'; // Green for late veg/early flower
        } else if (vpd >= 1.2 && vpd < 1.6) {
          color = 'rgba(255, 165, 0, 0.3)'; // Orange for mid/late flower
        }

        ctx.fillStyle = color;
        ctx.fillRect(x, y, chartWidth/100, chartHeight/(tempRange.max - tempRange.min));
      }
    }

    // Draw axes
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.beginPath();
    
    // Y-axis (temperature)
    ctx.moveTo(margin.left, margin.top);
    ctx.lineTo(margin.left, height - margin.bottom);
    
    // X-axis (humidity)
    ctx.moveTo(margin.left, margin.top);
    ctx.lineTo(width - margin.right, margin.top);
    ctx.stroke();

    // Add labels
    ctx.fillStyle = '#000';
    ctx.font = '14px Arial';
    ctx.textAlign = 'right';

    // Temperature labels (Y-axis)
    for (let t = tempRange.min; t <= tempRange.max; t += tempStep) {
      const y = margin.top + ((t - tempRange.min) / (tempRange.max - tempRange.min)) * chartHeight;
      ctx.fillText(`${t}°${tempUnit}`, margin.left - 10, y + 4);
    }

    // Humidity labels (X-axis)
    ctx.textAlign = 'center';
    for (let h = 0; h <= 100; h += 10) {
      const x = margin.left + (h / 100) * chartWidth;
      ctx.fillText(`${h}%`, x, margin.top - 10);
    }

    // Axis titles
    ctx.save();
    ctx.translate(20, height/2);
    ctx.rotate(-Math.PI/2);
    ctx.textAlign = 'center';
    ctx.fillText(`Air Temperature (°${tempUnit})`, 0, 0);
    ctx.restore();

    ctx.fillText('Relative Humidity (%)', width/2, 30);

    // Draw current point
    const currentX = margin.left + (humidity / 100) * chartWidth;
    const currentY = margin.top + ((airTemp - tempRange.min) / (tempRange.max - tempRange.min)) * chartHeight;

    ctx.beginPath();
    ctx.arc(currentX, currentY, 6, 0, Math.PI * 2);
    ctx.fillStyle = '#000';
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.stroke();

  }, [airTemp, humidity, tempUnit]);

  return (
    <div className="vpd-chart">
      <h1>VPD Chart</h1>
      <canvas 
        ref={canvasRef}
        style={{
          width: `${width}px`,
          height: `${height}px`,
          display: 'block',
          marginBottom: '20px'
        }}
      />
    </div>
  );
};

export default VPDVisualization; 