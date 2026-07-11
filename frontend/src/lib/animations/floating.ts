/**
 * Creates a gentle floating animation (y-axis oscillation).
 * @param range - max displacement in pixels (default [-6, 6])
 * @param duration - seconds per cycle (default 5)
 */
export function createFloatingY(
  range: [number, number] = [-6, 6],
  duration = 5,
) {
  return {
    y: range,
    transition: {
      duration,
      repeat: Infinity,
      ease: "easeInOut" as const,
    },
  };
}

/**
 * Creates a gentle floating animation on both axes.
 */
export function createFloatingXY(
  yRange: [number, number] = [-6, 6],
  xRange: [number, number] = [-3, 3],
  duration = 6,
) {
  return {
    y: yRange,
    x: xRange,
    transition: {
      duration,
      repeat: Infinity,
      ease: "easeInOut" as const,
    },
  };
}

/**
 * Pulse glow animation for cards/badges
 */
export const pulseGlow = {
  boxShadow: [
    "0 0 0px rgba(45, 212, 191, 0)",
    "0 0 30px rgba(45, 212, 191, 0.15)",
    "0 0 0px rgba(45, 212, 191, 0)",
  ],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut" as const,
  },
};

/**
 * Slow breathing scale animation (for accent elements)
 */
export const breatheScale = {
  scale: [1, 1.03, 1],
  transition: {
    duration: 4,
    repeat: Infinity,
    ease: "easeInOut" as const,
  },
};

/**
 * Gentle background circle drift
 */
export function createBgDrift(
  xRange: [number, number] = [0, 15],
  yRange: [number, number] = [0, -10],
  duration = 12,
) {
  return {
    x: xRange,
    y: yRange,
    transition: {
      duration,
      repeat: Infinity,
      ease: "easeInOut" as const,
    },
  };
}
