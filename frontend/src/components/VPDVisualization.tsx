import React, { useEffect, useRef } from 'react';
import { vpdZones } from '../utils/vpdCalculations';

interface VPDVisualizationProps {
  vpd: number;
  maxVPD?: number;
  width?: number;
  height?: number;
}

const VPDVisualization: React.FC<VPDVisualizationProps> = ({
  vpd,
  maxVPD = 2.0,
  width = 600,
  height = 100
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Draw the zones and marker when VPD changes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions to avoid scaling issues
    canvas.width = width;
    canvas.height = height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw the zones
    vpdZones.forEach(zone => {
      // Map the zone range to canvas pixels
      const startX = (zone.min / maxVPD) * width;
      const zoneWidth = ((zone.max - zone.min) / maxVPD) * width;
      ctx.fillStyle = zone.color;
      ctx.fillRect(startX, 0, zoneWidth, height - 20); // Leave space at bottom for labels

      // Add zone labels if enough space
      if (zoneWidth > 80) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.font = '10px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(zone.label, startX + zoneWidth / 2, height / 2 - 10);
      }
    });

    // Draw scale markers and values
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.font = '10px Arial';
    ctx.textAlign = 'center';
    for (let i = 0; i <= maxVPD; i += 0.4) {
      const x = (i / maxVPD) * width;
      ctx.beginPath();
      ctx.moveTo(x, height - 10);
      ctx.lineTo(x, height - 20);
      ctx.stroke();
      ctx.fillText(i.toFixed(1), x, height - 2);
    }

    // Draw the VPD marker
    const markerX = Math.min((vpd / maxVPD) * width, width - 1);
    
    // Draw shadow for better visibility
    ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
    ctx.shadowBlur = 5;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    
    // Draw marker
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(markerX, 0);
    ctx.lineTo(markerX, height - 25);
    ctx.stroke();
    
    // Draw marker head (triangle)
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.moveTo(markerX, height - 25);
    ctx.lineTo(markerX - 8, height - 15);
    ctx.lineTo(markerX + 8, height - 15);
    ctx.closePath();
    ctx.fill();
    
    // Reset shadow
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
    
    // Display the current VPD value
    ctx.fillStyle = 'black';
    ctx.font = 'bold 14px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(`Current VPD: ${vpd.toFixed(2)} kPa`, 10, 20);
  }, [vpd, maxVPD, width, height]);

  return (
    <div className="vpd-visualization">
      <canvas 
        ref={canvasRef} 
        style={{ 
          width: '100%', 
          maxWidth: `${width}px`,
          height: 'auto',
          aspectRatio: `${width}/${height}`,
          display: 'block',
          margin: '0 auto',
          border: '1px solid rgba(0, 0, 0, 0.1)',
          borderRadius: '4px'
        }}
      />
      <div className="vpd-legend">
        {vpdZones.map((zone, index) => (
          <div key={index} className="legend-item">
            <div 
              className="legend-color" 
              style={{ 
                backgroundColor: zone.color,
                width: '15px',
                height: '15px',
                display: 'inline-block',
                marginRight: '8px',
                border: '1px solid rgba(0, 0, 0, 0.2)',
                borderRadius: '2px'
              }}
            />
            <span className="legend-label">{zone.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VPDVisualization; 