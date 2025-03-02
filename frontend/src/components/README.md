# VPD Calculator Components

## Overview

The VPD (Vapor Pressure Deficit) Calculator is a specialized tool for controlled environment agriculture that helps growers visualize and calculate optimal growing conditions. This directory contains the React components that make up the VPD Calculator feature.

## Key Components

### VPDCalculatorPage

The main page component that renders the VPD calculator interface and provides contextual information about VPD ranges and their significance for plant growth.

### VPDCalculator

Handles the input form and state management for the calculator, including temperature unit conversion and current VPD calculation.

### VPDVisualization

Renders the VPD chart visualization using HTML Canvas. This component is responsible for drawing the color-coded VPD zones and plotting the current conditions.

## Important Axis Orientation Rule

The VPD chart has a specific axis orientation that must be maintained:

1. **Humidity Axis (X-axis)**: 
   - 100% humidity on the LEFT
   - 0% humidity on the RIGHT
   - Positioned at the TOP of the chart

2. **Temperature Axis (Y-axis)**:
   - Low temperatures at the TOP
   - High temperatures at the BOTTOM

This orientation is intentional and should be preserved in all future modifications. While visual styling (colors, fonts, margins, etc.) can be modified, the orientation of these axes must remain consistent for proper interpretation of the VPD data.

## VPD Color Zones

The chart uses color coding to indicate different VPD ranges:

- **Red (0.0-0.4 kPa)**: Too low, high disease risk
- **Green (0.4-0.8 kPa)**: Ideal for clones and young plants
- **Yellow (0.8-1.2 kPa)**: Ideal for vegetative growth
- **Orange (1.2-1.6 kPa)**: Ideal for flowering/fruiting
- **Red (1.6-2.0 kPa)**: Too high, may cause plant stress

## Dew Point Visualization

The chart includes a dew point line displayed in orange to represent potential danger:

- The **orange line** shows the dew point temperature at different humidity levels
- When the ambient temperature drops below the dew point, condensation will form on plant surfaces
- This can lead to increased disease pressure and other issues
- The current dew point for the selected temperature and humidity is displayed at the bottom of the chart

Understanding the relationship between temperature, humidity, and dew point is crucial for preventing condensation and associated plant health issues.

## Responsive Design

The VPD calculator is designed to be responsive across different screen sizes:
- On larger screens, the chart and form appear side by side
- On smaller screens, they stack vertically with the chart above the form
- The chart maintains its aspect ratio while scaling to fit the available space
- Axis labels are positioned inside the chart on smaller screens to maximize the available space

## Maintenance Guidelines

When making changes to the VPD calculator components:

1. Preserve the axis orientation as described above
2. Maintain the color coding for VPD zones
3. Maintain the orange color for the dew point line
4. Ensure the calculator remains responsive across different screen sizes
5. Keep the form inputs and chart visualization in sync

These guidelines ensure that the VPD calculator remains an effective and consistent tool for users. 