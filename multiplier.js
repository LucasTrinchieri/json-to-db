const math = require('mathjs');

function calculateMultiplier(month) {
  // Parameters for the sinusoidal function
  const amplitude = 0.5;  // Amplitude of the sinusoidal function
  const phase = 0;        // Phase of the sinusoidal function
  const mean = 1.0;       // Mean of the function (maximum value)
  const period = 12;      // Period of the function (12 months)
  
  const randomFactor = Math.random() * 0.1;

  let multiplier = amplitude * math.sin((2 * math.pi / period) * (month - phase)) + mean + randomFactor;
  
  if ([1, 2, 7, 8].includes(month)) {
    multiplier *= 0.8;  // 20% reduction for January, February, July, and August
  }
  
  return multiplier;
}

module.exports = calculateMultiplier
