// Settings consumed by GeometricArt's update pacing and pointer movement.
export const qualityLevels = {
  low: {
    fps: 30,
    pointerStrength: 0.65,
  },
  medium: {
    fps: 45,
    pointerStrength: 0.85,
  },
  high: {
    fps: 60,
    pointerStrength: 1,
  },
};

// Keep these thresholds in sync with the early check in index.html.
export function chooseQuality({
  cores,
  memory,
  saveData = false,
}) {
  const knownCores = Number.isFinite(cores) ? cores : undefined;
  const reportedMemory = Number.isFinite(memory) ? memory : undefined;
  const knownMemory = reportedMemory === 8 ? undefined : reportedMemory;
  if (knownCores === undefined && knownMemory === undefined) return 'low';
  const low = saveData
    || (knownCores !== undefined && knownCores <= 4)
    || (knownMemory !== undefined && knownMemory <= 4);
  const medium = !low
    && ((knownCores !== undefined && knownCores <= 8)
      || (knownMemory !== undefined && knownMemory <= 12));

  if (low) {
    return 'low';
  }
  return medium ? 'medium' : 'high';
}
