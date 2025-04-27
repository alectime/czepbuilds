# VPD Calculator Feature

## Overview
The VPD (Vapor Pressure Deficit) Calculator is a specialized tool for controlled environment agriculture that helps growers visualize and calculate optimal growing conditions.

## Directory Structure
```
vpd-calculator/
├── components/          # React components
│   ├── VPDCalculator.tsx        # Main calculator component with controls
│   ├── VPDCalculatorPage.tsx    # Page wrapper component
│   └── VPDVisualization.tsx     # Chart visualization component
├── styles/              # CSS styles
│   ├── ProjectPage.css          # Basic layout styles
│   └── VPDCalculator.css        # Calculator-specific styles
├── utils/               # Utility functions
│   └── vpdCalculations.ts       # VPD calculation functions
├── index.ts             # Feature exports
└── README.md            # Documentation
```

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

## VPD Color Zones
The chart uses color coding to indicate different VPD ranges:

- **Purple (0.0-0.4 kPa)**: Too low, high disease risk
- **Green (0.4-0.8 kPa)**: Ideal for clones and young plants
- **Yellow (0.8-1.2 kPa)**: Ideal for vegetative growth
- **Orange (1.2-1.6 kPa)**: Ideal for flowering/fruiting
- **Blue (>1.6 kPa)**: Too high, may cause plant stress

## Usage
The VPD calculator can be imported and used in other components like this:

```tsx
import { VPDCalculator } from '../features/vpd-calculator';

function MyComponent() {
  return (
    <div>
      <h1>My Growing Environment</h1>
      <VPDCalculator />
    </div>
  );
}
```

Or the entire page can be used in routing:

```tsx
import { VPDCalculatorPage } from '../features/vpd-calculator';

// In your router configuration
<Route path="/vpd-calculator" element={<VPDCalculatorPage />} />
``` 