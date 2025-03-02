/**
 * Converts Fahrenheit to Celsius.
 * @param tempF Temperature in Fahrenheit.
 * @returns Temperature in Celsius.
 */
export function fahrenheitToCelsius(tempF: number): number {
  return (tempF - 32) * (5 / 9);
}

/**
 * Converts Celsius to Fahrenheit.
 * @param tempC Temperature in Celsius.
 * @returns Temperature in Fahrenheit.
 */
export function celsiusToFahrenheit(tempC: number): number {
  return (tempC * (9 / 5)) + 32;
}

/**
 * Calculates the Saturation Vapor Pressure (SVP) in kPa for a given temperature in Celsius.
 * Formula: SVP = 0.6108 * exp((17.27 * T) / (T + 237.3))
 * @param tempC Temperature in Celsius.
 * @returns SVP in kPa.
 */
export function calculateSaturationVaporPressure(tempC: number): number {
  return 0.6108 * Math.exp((17.27 * tempC) / (tempC + 237.3));
}

/**
 * Calculates the Actual Vapor Pressure (AVP) in kPa.
 * AVP = SVP * (RH / 100)
 * @param tempC Temperature in Celsius.
 * @param relativeHumidity Relative humidity as a percentage.
 * @returns AVP in kPa.
 */
export function calculateActualVaporPressure(tempC: number, relativeHumidity: number): number {
  const svp = calculateSaturationVaporPressure(tempC);
  return svp * (relativeHumidity / 100);
}

/**
 * Calculates the Vapor Pressure Deficit (VPD) in kPa.
 * VPD = SVP - AVP = SVP * (1 - RH/100)
 * @param tempC Temperature in Celsius.
 * @param relativeHumidity Relative humidity as a percentage.
 * @returns VPD in kPa.
 */
export function calculateVPD(
  tempC: number, 
  relativeHumidity: number
): number {
  // Standard VPD calculation
  const svp = calculateSaturationVaporPressure(tempC);
  const avp = calculateActualVaporPressure(tempC, relativeHumidity);
  return svp - avp;
}

/**
 * Calculates the dew point temperature in Celsius.
 * Using the Magnus formula:
 *    γ = ln(RH/100) + (17.27 * T) / (237.3 + T)
 *    Dew Point = (237.3 * γ) / (17.27 - γ)
 * @param tempC Temperature in Celsius.
 * @param relativeHumidity Relative humidity as a percentage.
 * @returns Dew point in Celsius.
 */
export function calculateDewPoint(tempC: number, relativeHumidity: number): number {
  const a = 17.27;
  const b = 237.3;
  const gamma = Math.log(relativeHumidity / 100) + (a * tempC) / (b + tempC);
  return (b * gamma) / (a - gamma);
}

/**
 * Checks if the leaf temperature is under the dew point.
 * This is used to warn about potential plant disease due to condensation.
 * @param leafTempC Leaf temperature in Celsius.
 * @param dewPointC Dew point in Celsius.
 * @returns True if leaf temperature is below dew point.
 */
export function isLeafTempUnderDewPoint(leafTempC: number, dewPointC: number): boolean {
  return leafTempC < dewPointC;
}

/**
 * Define VPD zones with their respective colors and labels
 */
export const vpdZones = [
  { min: 0.0, max: 0.4, color: 'rgba(255, 0, 0, 0.5)', label: 'Under Transpiration (Danger)' },
  { min: 0.4, max: 0.8, color: 'rgba(255, 255, 0, 0.5)', label: 'Early Veg Growth / Propagation' },
  { min: 0.8, max: 1.2, color: 'rgba(0, 255, 0, 0.5)', label: 'Late Veg / Early Flower (Healthy)' },
  { min: 1.2, max: 1.6, color: 'rgba(255, 165, 0, 0.5)', label: 'Mid / Late Flower' },
  { min: 1.6, max: 2.0, color: 'rgba(255, 0, 0, 0.5)', label: 'Over Transpiration (Danger)' }
];

/**
 * Get growth stage recommendation based on VPD value
 * @param vpd VPD value in kPa
 * @returns Object with recommendation text and color
 */
export function getVpdRecommendation(vpd: number): { text: string; color: string } {
  if (vpd < 0.4) {
    return {
      text: 'Warning: VPD too low. Risk of condensation and fungal diseases.',
      color: '#e74c3c' // red
    };
  } else if (vpd >= 0.4 && vpd < 0.8) {
    return {
      text: 'Ideal for early vegetative growth and propagation.',
      color: '#2ecc71' // green
    };
  } else if (vpd >= 0.8 && vpd < 1.2) {
    return {
      text: 'Ideal for late vegetative and early flowering stages.',
      color: '#f1c40f' // yellow
    };
  } else if (vpd >= 1.2 && vpd < 1.6) {
    return {
      text: 'Suitable for mid to late flowering stages.',
      color: '#e67e22' // orange
    };
  } else {
    return {
      text: 'Warning: VPD too high. Plant may experience excessive water loss and stress.',
      color: '#e74c3c' // red
    };
  }
} 