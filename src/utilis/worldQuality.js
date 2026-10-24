// Keep only settings consumed by the existing CSS/DOM geometric artwork.
export const qualityLevels = {
  low: {
    interactionFps: 30,
    pointerStrength: 0.65,
    scrollStrength: 0.3,
    maxFlares: 1,
  },
  medium: {
    interactionFps: 40,
    pointerStrength: 0.85,
    scrollStrength: 0.45,
    maxFlares: 2,
  },
  high: {
    interactionFps: 60,
    pointerStrength: 1,
    scrollStrength: 0.6,
    maxFlares: 3,
  },
};

// Pure device-hint selection logic: browser APIs are read by the hook, not here.
export function chooseQuality({
  width = 0,
  cores = 4,
  memory = 4,
  saveData = false,
}) {
  if (saveData || cores <= 2 || memory <= 2) {
    return 'low';
  }

  if (width < 700 && (cores < 8 || memory < 8)) {
    return 'low';
  }

  if (width < 1200 || cores < 8 || memory < 8) {
    return 'medium';
  }

  return 'high';
}
