import React, { useEffect, useRef, useState } from 'react';
import { calculateVPD } from '../utils/vpdCalculations';

interface VPDVisualizationProps {
  airTemp: number;
  humidity: number;
  tempUnit: 'F' | 'C';
  onChartClick?: (newTemp: number, newHumidity: number) => void;
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
  tempUnit,
  onChartClick
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 600, height: 600 });
  const margin = { top: 30, right: 20, bottom: 20, left: 40 };

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

  // Handle click on the chart
  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!onChartClick || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const chartWidth = dimensions.width - margin.left - margin.right;
    const chartHeight = dimensions.height - margin.top - margin.bottom;

    // Check if click is within chart area
    if (
      x < margin.left || 
      x > dimensions.width - margin.right || 
      y < margin.top || 
      y > dimensions.height - margin.bottom
    ) {
      return;
    }

    // Convert click position to humidity (x-axis, flipped)
    // 100% on left, 0% on right
    const newHumidity = Math.round(100 - ((x - margin.left) / chartWidth) * 100);
    
    // Convert click position to temperature (y-axis, flipped)
    // Low temp at top, high temp at bottom
    const tempRange = tempUnit === 'F' ? tempRangeF : tempRangeC;
    const tempSpan = tempRange.max - tempRange.min;
    const newTemp = Math.round(tempRange.min + ((y - margin.top) / chartHeight) * tempSpan);

    // Clamp values to valid ranges
    const clampedHumidity = Math.max(0, Math.min(100, newHumidity));
    const clampedTemp = Math.max(tempRange.min, Math.min(tempRange.max, newTemp));

    // Call the callback with the new values
    onChartClick(clampedTemp, clampedHumidity);
  };

  // Update dimensions when window resizes
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        // containerHeight is no longer needed since we're using a square aspect ratio
        
        // Make the chart take up the full container width with a minimum size
        const width = Math.max(containerWidth, 350);
        
        // For desktop (wide screens), ensure the chart is square
        const isWideScreen = window.innerWidth > 900;
        let height;
        
        if (isWideScreen) {
          // On desktop, make height equal to width for a square aspect ratio
          height = width;
        } else {
          // On mobile, use a taller aspect ratio for more vertical space
          height = Math.max(Math.floor(width * 0.85), 350);
        }
        
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

    // Draw background grid - making it lighter and thinner
    ctx.strokeStyle = '#f0f0f0';
    ctx.lineWidth = 0.3;

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

    // Draw VPD zones - ensure we cover the entire chart area including edges
    // Use a slightly larger range to ensure complete coverage
    const tempMin = tempRange.min - 1;
    const tempMax = tempRange.max + 1;
    
    for (let t = tempMin; t <= tempMax; t += 1) {
      for (let h = 0; h <= 101; h += 1) { // Extend to 101 to ensure complete coverage
        // Flipped X-axis (humidity): 100% on left, 0% on right
        const x = margin.left + ((100 - h) / 100) * chartWidth;
        // Flipped Y-axis (temperature): Low temp at top, high temp at bottom
        const y = margin.top + ((t - tempRange.min) / (tempRange.max - tempRange.min)) * chartHeight;
        
        // Skip pixels outside the chart area
        if (y > dimensions.height - margin.bottom || y < margin.top) continue;
        if (x > dimensions.width - margin.right || x < margin.left) continue;
        
        // Calculate VPD - clamp temperature and humidity to valid ranges
        const clampedTemp = Math.max(tempRange.min, Math.min(tempRange.max, t));
        const clampedHumidity = Math.max(0, Math.min(100, h));
        const tempC = tempUnit === 'F' ? fahrenheitToCelsius(clampedTemp) : clampedTemp;
        const vpd = calculateVPD(tempC, clampedHumidity);
        
        // Set color based on VPD value
        let color = 'rgba(120, 86, 115, 0.8)'; // Purple for under transpiration danger
         
        if (vpd >= 0.4 && vpd < 0.8) {
          color = 'rgba(163, 176, 58, 0.8)'; // Lime green for early veg
        } else if (vpd >= 0.8 && vpd < 1.2) {
          color = 'rgba(87, 135, 53, 0.8)'; // Green for late veg/early flower
        } else if (vpd >= 1.2 && vpd < 1.6) {
          color = 'rgba(244, 187, 74, 0.8)'; // Orange/yellow for mid/late flower
        } else if (vpd >= 1.6) {
          color = 'rgba(78, 140, 214, 0.8)'; // Blue for over transpiration danger
        }

        // Draw pixel with proper scaling - ensure we cover the entire chart area
        const pixelWidth = Math.max(1, chartWidth/100) + 0.5;
        const pixelHeight = Math.max(1, chartHeight/(tempRange.max - tempRange.min)) + 0.5;
        
        ctx.fillStyle = color;
        ctx.fillRect(x, y, pixelWidth, pixelHeight);
      }
    }

    // Draw border - after drawing all pixels to ensure it's on top
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

    // Axis titles - now inside the chart with white text
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    
    // Y-axis title (Temperature) - rotated and positioned inside the chart
    // Move it further right to avoid overlapping with temperature values
    ctx.save();
    ctx.translate(margin.left + 50, margin.top + chartHeight / 2);
    ctx.rotate(-Math.PI/2);
    ctx.textAlign = 'center';
    ctx.font = titleFontSize;
    ctx.fillText(`Air Temperature (°${tempUnit})`, 0, 0);
    ctx.restore();

    // X-axis title (Humidity) - positioned inside the chart
    ctx.textAlign = 'center';
    ctx.font = titleFontSize;
    ctx.fillText('Relative Humidity (%)', margin.left + chartWidth / 2, margin.top + 35);

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

    // Add cursor style to indicate clickable area
    canvas.style.cursor = onChartClick ? 'pointer' : 'default';

  }, [airTemp, humidity, tempUnit, dimensions, onChartClick]);

  return (
    <div ref={containerRef} className="vpd-chart">
      <canvas 
        ref={canvasRef}
        onClick={handleCanvasClick}
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
          flex: '1'
        }}
      />
    </div>
  );
};

export default VPDVisualization; 