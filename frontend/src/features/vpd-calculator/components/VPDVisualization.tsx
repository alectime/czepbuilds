import React, { useEffect, useRef, useState, useMemo } from 'react';
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
  const [dimensions, setDimensions] = useState({ width: 800, height: 800 });
  const margin = { top: 30, right: 20, bottom: 20, left: 40 };

  // Convert Fahrenheit to Celsius
  const fahrenheitToCelsius = (f: number) => (f - 32) * (5 / 9);

  // Define temperature ranges with useMemo to prevent unnecessary re-renders
  const tempRangeF = useMemo(() => ({
    min: 32,
    max: 122,
    step: 10
  }), []);
  
  const tempRangeC = useMemo(() => ({
    min: 0,
    max: 50,
    step: 5
  }), []);

  // Handle canvas click
  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!onChartClick || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    
    // Get click coordinates relative to canvas
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // Calculate chart area dimensions
    const chartWidth = dimensions.width - margin.left - margin.right;
    const chartHeight = dimensions.height - margin.top - margin.bottom;
    
    // Only process clicks within the chart area
    if (x < margin.left || x > dimensions.width - margin.right || 
        y < margin.top || y > dimensions.height - margin.bottom) {
      return;
    }
    
    // Calculate relative position within chart area (0 to 1)
    const relativeX = (x - margin.left) / chartWidth;
    const relativeY = (y - margin.top) / chartHeight;
    
    // Convert to humidity (100% on LEFT, 0% on RIGHT)
    const clickHumidity = 100 * (1 - relativeX);
    
    // Convert to temperature (Low at TOP, high at BOTTOM)
    const tempRange = tempUnit === 'F' ? tempRangeF : tempRangeC;
    const tempSpan = tempRange.max - tempRange.min;
    const clickTemp = tempRange.min + (relativeY * tempSpan);
    
    // Clamp values to valid ranges
    const clampedTemp = Math.max(tempRange.min, Math.min(tempRange.max, clickTemp));
    const clampedHumidity = Math.max(0, Math.min(100, clickHumidity));
    
    onChartClick(clampedTemp, clampedHumidity);
  };
  
  // Initial sizing function
  const calculateInitialSize = () => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.clientWidth;
      const isMobile = window.innerWidth <= 768;
      
      let size;
      
      if (isMobile) {
        // On mobile, use the full container width
        size = containerWidth;
      } else {
        // On desktop, use a more appropriate size that matches the controls
        size = Math.min(Math.max(containerWidth, 600), 1000); // Minimum size of 600px
      }
      
      // Set dimensions if they've changed
      if (size !== dimensions.width) {
        setDimensions({ width: size, height: size });
      }
    }
  };
  
  // Force layout recalculation
  useEffect(() => {
    // Initial size calculation
    calculateInitialSize();
    
    // Set a short delay to ensure the container is fully rendered
    const initialTimer = setTimeout(() => {
      calculateInitialSize();
    }, 50);
    
    // Set up mutation observer for parent element size changes
    const resizeObserver = new ResizeObserver(() => {
      calculateInitialSize();
    });
    
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
      
      // Also observe parent elements for size changes
      if (containerRef.current.parentElement) {
        resizeObserver.observe(containerRef.current.parentElement);
      }
    }
    
    // Update dimensions when window resizes
    window.addEventListener('resize', calculateInitialSize);
    
    // For Safety, call one more time after a longer delay
    const backupTimer = setTimeout(calculateInitialSize, 500);
    
    return () => {
      window.removeEventListener('resize', calculateInitialSize);
      resizeObserver.disconnect();
      clearTimeout(initialTimer);
      clearTimeout(backupTimer);
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
    
    // Font sizes - scale with chart size but keep them smaller
    const baseFontSize = Math.max(8, Math.min(11, dimensions.width / 50));
    const labelFontSize = `${baseFontSize}px Arial`;
    const titleFontSize = `bold ${baseFontSize + 1}px Arial`;
    
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
    ctx.fillStyle = '#ffffff';
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
    ctx.fillStyle = '#ffffff';
    
    // Y-axis title (Temperature) - rotated and positioned inside the chart
    ctx.save();
    ctx.translate(margin.left + 50, margin.top + chartHeight / 2);
    ctx.rotate(-Math.PI/2);
    ctx.textAlign = 'center';
    ctx.font = titleFontSize;
    ctx.fillText(`Air Temperature (°${tempUnit})`, 0, 0);
    ctx.restore();
    
    // X-axis title (Humidity)
    ctx.textAlign = 'center';
    ctx.font = titleFontSize;
    ctx.fillText(`Relative Humidity (%)`, margin.left + chartWidth / 2, margin.top - 10);
    
    // Draw the current point
    const currentPointX = margin.left + ((100 - humidity) / 100) * chartWidth;
    const currentPointY = margin.top + ((airTemp - tempRange.min) / (tempRange.max - tempRange.min)) * chartHeight;
    
    // Draw outline circle
    ctx.beginPath();
    ctx.arc(currentPointX, currentPointY, 8, 0, 2 * Math.PI);
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Draw filled circle
    ctx.beginPath();
    ctx.arc(currentPointX, currentPointY, 6, 0, 2 * Math.PI);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.fill();
  }, [airTemp, humidity, tempUnit, dimensions]);

  return (
    <div ref={containerRef} className="vpd-chart-container" style={{ width: '100%' }}>
      <canvas
        ref={canvasRef}
        onClick={handleCanvasClick}
        className="vpd-chart"
        style={{ 
          width: '100%', 
          height: 'auto',
          display: 'block',
          margin: '0 auto',
          cursor: 'crosshair'
        }}
      />
    </div>
  );
};

export default VPDVisualization; 