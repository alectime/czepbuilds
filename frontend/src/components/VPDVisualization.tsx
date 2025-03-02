import React, { useEffect, useRef, useState } from 'react';
import { calculateVPD } from '../utils/vpdCalculations';

interface VPDVisualizationProps {
  airTemp: number;
  humidity: number;
  tempUnit: 'F' | 'C';
}

/**
 * VPD Visualization Chart Component
 * 
 * IMPORTANT AXIS ORIENTATION RULE:
 * This chart must maintain the following axis orientation:
 * 1. Humidity (X-axis): 100% on the LEFT, 0% on the RIGHT, positioned at the TOP of the chart
 * 2. Temperature (Y-axis): Low temperatures at the TOP, high temperatures at the BOTTOM
 * 
 * While visual styling (colors, fonts, margins, etc.) can be modified,
 * the orientation of these axes must be preserved for consistency and usability.
 * 
 * Any future modifications should respect this orientation to maintain
 * the expected behavior of the VPD visualization.
 */
const VPDVisualization: React.FC<VPDVisualizationProps> = ({
  airTemp,
  humidity,
  tempUnit
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 600, height: 500 });
  const margin = { top: 40, right: 30, bottom: 40, left: 50 };

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

  // Update dimensions when window resizes
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        // Calculate height as 5/6 of width for a slightly wider than tall chart
        const width = Math.min(containerWidth, 900);
        const height = Math.floor(width * 0.83); // 5:6 aspect ratio
        setDimensions({ width, height });
      }
    };

    updateDimensions();
    
    // Add a small delay to ensure container dimensions are correct after layout changes
    const resizeTimer = setTimeout(updateDimensions, 100);
    
    // Add resize event listener
    window.addEventListener('resize', updateDimensions);
    
    return () => {
      window.removeEventListener('resize', updateDimensions);
      clearTimeout(resizeTimer);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions with device pixel ratio for sharp rendering
    const dpr = window.devicePixelRatio || 1;
    canvas.width = dimensions.width * dpr;
    canvas.height = dimensions.height * dpr;
    
    // Apply scaling
    ctx.scale(dpr, dpr);

    // Set canvas CSS dimensions
    canvas.style.width = `${dimensions.width}px`;
    canvas.style.height = `${dimensions.height}px`;

    const chartWidth = dimensions.width - margin.left - margin.right;
    const chartHeight = dimensions.height - margin.top - margin.bottom;

    // Calculate font size based on chart dimensions
    const baseFontSize = Math.max(10, Math.min(14, dimensions.width / 40));
    const labelFontSize = `${baseFontSize}px Arial`;
    const titleFontSize = `bold ${Math.max(12, Math.min(16, dimensions.width / 30))}px Arial`;

    // Clear canvas
    ctx.clearRect(0, 0, dimensions.width, dimensions.height);

    // Draw background
    ctx.fillStyle = '#f8f9fa';
    ctx.fillRect(margin.left, margin.top, chartWidth, chartHeight);

    // Draw background grid
    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 0.5;

    // Draw vertical grid lines (humidity) - FLIPPED: 100% on left, 0% on right
    for (let h = 0; h <= 100; h += 10) {
      // Convert h to flipped position (100-h)
      const x = margin.left + ((100 - h) / 100) * chartWidth;
      ctx.beginPath();
      ctx.moveTo(x, margin.top);
      ctx.lineTo(x, dimensions.height - margin.bottom);
      ctx.stroke();
    }

    // Draw horizontal grid lines (temperature) - FLIPPED: Low temp at top, high temp at bottom
    const tempStep = tempUnit === 'F' ? 10 : 5;
    const tempRange = tempUnit === 'F' ? tempRangeF : tempRangeC;
    for (let t = tempRange.min; t <= tempRange.max; t += tempStep) {
      // Flip the temperature axis (low temp at top)
      const y = margin.top + ((t - tempRange.min) / (tempRange.max - tempRange.min)) * chartHeight;
      ctx.beginPath();
      ctx.moveTo(margin.left, y);
      ctx.lineTo(dimensions.width - margin.right, y);
      ctx.stroke();
    }

    // Draw VPD zones
    for (let t = tempRange.min; t <= tempRange.max; t += 1) {
      for (let h = 0; h <= 100; h += 1) {
        // Flipped X-axis (humidity): 100% on left, 0% on right
        const x = margin.left + ((100 - h) / 100) * chartWidth;
        // Flipped Y-axis (temperature): Low temp at top, high temp at bottom
        const y = margin.top + ((t - tempRange.min) / (tempRange.max - tempRange.min)) * chartHeight;
        
        // Calculate VPD
        const tempC = tempUnit === 'F' ? fahrenheitToCelsius(t) : t;
        const vpd = calculateVPD(tempC, h);
        
        // Set color based on VPD value
        let color = 'rgba(120, 86, 115, 0.5)'; // Purple for under transpiration danger
         
        if (vpd >= 0.4 && vpd < 0.8) {
          color = 'rgba(163, 176, 58, 0.5)'; // Lime green for early veg
        } else if (vpd >= 0.8 && vpd < 1.2) {
          color = 'rgba(87, 135, 53, 0.5)'; // Green for late veg/early flower
        } else if (vpd >= 1.2 && vpd < 1.6) {
          color = 'rgba(244, 187, 74, 0.5)'; // Orange/yellow for mid/late flower
        } else if (vpd >= 1.6) {
          color = 'rgba(78, 140, 214, 0.5)'; // Blue for over transpiration danger
        }

        // Draw pixel with proper scaling
        const pixelWidth = Math.max(1, chartWidth/100);
        const pixelHeight = Math.max(1, chartHeight/(tempRange.max - tempRange.min));
        
        ctx.fillStyle = color;
        ctx.fillRect(x, y, pixelWidth, pixelHeight);
      }
    }

    // Draw border
    ctx.strokeStyle = '#ccc';
    ctx.lineWidth = 1;
    ctx.strokeRect(margin.left, margin.top, chartWidth, chartHeight);

    // Draw axes
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.beginPath();
    
    // Y-axis (temperature) - Left side
    ctx.moveTo(margin.left, margin.top);
    ctx.lineTo(margin.left, dimensions.height - margin.bottom);
    
    // X-axis (humidity) - Top side
    ctx.moveTo(margin.left, margin.top);
    ctx.lineTo(dimensions.width - margin.right, margin.top);
    ctx.stroke();

    // Add labels - now inside the chart with white text
    ctx.font = labelFontSize;
    
    // Temperature labels (Y-axis) - FLIPPED: Low temp at top, high temp at bottom
    ctx.textAlign = 'left';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    for (let t = tempRange.min; t <= tempRange.max; t += tempStep) {
      // Flip the temperature axis (low temp at top)
      const y = margin.top + ((t - tempRange.min) / (tempRange.max - tempRange.min)) * chartHeight;
      ctx.fillText(`${t}°${tempUnit}`, margin.left + 5, y + 4);
    }

    // Humidity labels (X-axis) - FLIPPED: 100% on left, 0% on right
    ctx.textAlign = 'center';
    for (let h = 0; h <= 100; h += 10) {
      // Flip the humidity axis (100% on left)
      const x = margin.left + ((100 - h) / 100) * chartWidth;
      ctx.fillText(`${h}%`, x, margin.top + 15);
    }

    // Axis titles - keep outside the chart
    ctx.fillStyle = '#333';
    ctx.save();
    ctx.translate(15, dimensions.height/2);
    ctx.rotate(-Math.PI/2);
    ctx.textAlign = 'center';
    ctx.font = titleFontSize;
    ctx.fillText(`Air Temperature (°${tempUnit})`, 0, 0);
    ctx.restore();

    ctx.textAlign = 'center';
    ctx.font = titleFontSize;
    ctx.fillText('Relative Humidity (%)', dimensions.width/2, margin.top - 15);

    // Draw current point
    // Flipped X-axis (humidity): 100% on left, 0% on right
    const currentX = margin.left + ((100 - humidity) / 100) * chartWidth;
    // Flipped Y-axis (temperature): Low temp at top, high temp at bottom
    const currentY = margin.top + ((airTemp - tempRange.min) / (tempRange.max - tempRange.min)) * chartHeight;

    // Draw point shadow
    ctx.beginPath();
    ctx.arc(currentX, currentY, 8, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.fill();

    // Draw point
    ctx.beginPath();
    ctx.arc(currentX, currentY, 6, 0, Math.PI * 2);
    ctx.fillStyle = '#000';
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.stroke();

  }, [airTemp, humidity, tempUnit, dimensions]);

  return (
    <div ref={containerRef} className="vpd-chart">
      <h1>VPD Chart</h1>
      <canvas 
        ref={canvasRef}
        style={{
          display: 'block',
          marginBottom: '20px'
        }}
      />
    </div>
  );
};

export default VPDVisualization; 