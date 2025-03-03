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
    max: 122,
    step: 10
  };
  
  const tempRangeC = {
    min: 0,
    max: 50,
    step: 5
  };
  
  const tempRange = tempUnit === 'F' ? tempRangeF : tempRangeC;

  // Handle canvas click
  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!onChartClick || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    
    // Get click coordinates in CSS pixels
    const cssX = event.clientX - rect.left;
    const cssY = event.clientY - rect.top;
    
    // Calculate chart area dimensions
    const chartWidth = dimensions.width - margin.left - margin.right;
    const chartHeight = dimensions.height - margin.top - margin.bottom;
    
    // Only process clicks within the chart area
    if (cssX < margin.left || cssX > dimensions.width - margin.right || 
        cssY < margin.top || cssY > dimensions.height - margin.bottom) {
      return;
    }
    
    // Calculate relative position within chart area (0 to 1)
    const relativeX = (cssX - margin.left) / chartWidth;
    const relativeY = (cssY - margin.top) / chartHeight;
    
    // Convert to humidity (100% on LEFT, 0% on RIGHT)
    const clickHumidity = Math.round(100 - (relativeX * 100));
    
    // Convert to temperature (Low at TOP, high at BOTTOM)
    const rawTemp = tempRange.min + (relativeY * (tempRange.max - tempRange.min));
    
    // Round temperature to nearest step
    const roundedTemp = Math.round(rawTemp / tempRange.step) * tempRange.step;
    
    // Clamp values to valid ranges
    const clampedTemp = Math.max(tempRange.min, Math.min(tempRange.max, roundedTemp));
    const clampedHumidity = Math.max(0, Math.min(100, clickHumidity));
    
    // Debug logging
    console.log('Click coordinates (css):', { x: cssX, y: cssY });
    console.log('Relative position:', { x: relativeX, y: relativeY });
    console.log('Calculated values:', { 
      temp: clampedTemp, 
      humidity: clampedHumidity,
      rawTemp,
      roundedTemp
    });
    
    onChartClick(clampedTemp, clampedHumidity);
  };
  
  // Update dimensions when window resizes
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        const isMobile = window.innerWidth <= 768;
        
        // Make the chart responsive while maintaining square shape
        let size;
        
        if (isMobile) {
          // On mobile, use the full container width
          size = containerWidth;
        } else {
          // On desktop, maintain the capped size
          size = Math.min(Math.max(containerWidth, 400), 1000); // Min 400px, max 1000px
        }
        
        // For a square chart, width and height are equal
        setDimensions({ width: size, height: size });
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

  // Draw the chart
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Set canvas dimensions for high DPI displays
    const pixelRatio = window.devicePixelRatio || 1;
    canvas.width = dimensions.width * pixelRatio;
    canvas.height = dimensions.height * pixelRatio;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Scale all drawing operations by the pixel ratio
    ctx.scale(pixelRatio, pixelRatio);
    
    // Adjust canvas CSS dimensions
    canvas.style.width = `${dimensions.width}px`;
    canvas.style.height = `${dimensions.height}px`;
    
    // Clear canvas
    ctx.clearRect(0, 0, dimensions.width, dimensions.height);
    
    // Chart dimensions
    const chartWidth = dimensions.width - margin.left - margin.right;
    const chartHeight = dimensions.height - margin.top - margin.bottom;
    
    // Font sizes - scale with chart size
    const baseFontSize = Math.max(10, Math.min(14, dimensions.width / 40));
    const labelFontSize = `bold ${baseFontSize}px Arial`;
    const titleFontSize = `bold ${baseFontSize + 2}px Arial`;
    
    // Draw the VPD heatmap
    const tempRange = tempUnit === 'F' ? tempRangeF : tempRangeC;
    
    // Generate the 100x100 heatmap grid
    // Divide temp range into 100 steps
    const tempStep = (tempRange.max - tempRange.min) / 100; 
    
    for (let hi = 0; hi <= 100; hi++) {
      const h = hi; // Humidity from 0 to 100%
      
      for (let ti = 0; ti <= 100; ti++) {
        const t = tempRange.min + (ti * tempStep); // Temperature from min to max in 100 steps
        
        // Calculate position - FLIPPED AXES
        // Humidity: 100% on LEFT, 0% on RIGHT
        // Temperature: Low at TOP, high at BOTTOM
        const x = margin.left + ((100 - h) / 100) * chartWidth;
        const y = margin.top + (ti / 100) * chartHeight;
        
        // Skip points outside chart area
        if (y > dimensions.height - margin.bottom || y < margin.top) continue;
        if (x > dimensions.width - margin.right || x < margin.left) continue;
        
        // Calculate VPD - clamp temperature and humidity to valid ranges
        const clampedTemp = Math.max(tempRange.min, Math.min(tempRange.max, t));
        const clampedHumidity = Math.max(0, Math.min(100, h));
        const tempC = tempUnit === 'F' ? fahrenheitToCelsius(clampedTemp) : clampedTemp;
        const vpd = calculateVPD(tempC, clampedHumidity);
        
        // Set color based on VPD value
        let color = 'rgb(120, 86, 115)'; // Purple for under transpiration danger
         
        if (vpd >= 0.4 && vpd < 0.8) {
          color = 'rgb(163, 176, 58)'; // Lime green for early veg
        } else if (vpd >= 0.8 && vpd < 1.2) {
          color = 'rgb(87, 135, 53)'; // Green for late veg/early flower
        } else if (vpd >= 1.2 && vpd < 1.6) {
          color = 'rgb(244, 187, 74)'; // Orange/yellow for mid/late flower
        } else if (vpd >= 1.6) {
          color = 'rgb(78, 140, 214)'; // Blue for over transpiration danger
        }

        // Draw pixel with exact size for 100x100 grid
        const pixelWidth = chartWidth / 100;
        const pixelHeight = chartHeight / 100;
        
        ctx.fillStyle = color;
        ctx.fillRect(x, y, pixelWidth, pixelHeight);
      }
    }

    // Add labels - now inside the chart with white text
    ctx.font = labelFontSize;
    
    // Temperature labels (Y-axis) - FLIPPED: Low temp at top, high temp at bottom
    ctx.textAlign = 'left';
    ctx.fillStyle = '#000000';
    for (let t = tempRange.min; t <= tempRange.max; t += tempRange.step) {
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

    // Axis titles
    ctx.fillStyle = '#000000';
    
    // Y-axis title (Temperature) - rotated and positioned inside the chart
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
    ctx.fillStyle = '#000000';
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
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
          height: '100%'
        }}
      />
    </div>
  );
};

export default VPDVisualization; 