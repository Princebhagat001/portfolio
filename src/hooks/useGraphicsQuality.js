import { useEffect, useState } from 'react';
import { usePrefersReducedMotion } from './usePreferedReduceMotion';
import { chooseQuality, qualityLevels } from '../utilis/worldQuality';

const DEFAULT_QUALITY = 'low';
const QUALITY_RANK = { low: 0, medium: 1, high: 2 };

function getInitialDeviceState() {
  const root = typeof document === 'undefined' ? null : document.documentElement;
  const initialQuality = root?.dataset.galaxyQuality;
  const quality = Object.prototype.hasOwnProperty.call(qualityLevels, initialQuality)
    ? initialQuality
    : DEFAULT_QUALITY;
  return { quality };
}

export default function useGraphicsQuality() {
  const [deviceState, setDeviceState] = useState(getInitialDeviceState);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const browserWindow = globalThis.window;
    const browserNavigator = globalThis.navigator;
    const connection = browserNavigator.connection;
    let resizeFrame = 0;
    let probeFrame = 0;
    let probeDelay = 0;
    let warmupStartedAt = null;
    let sampleStartedAt = null;
    let sampleFrames = 0;
    let samplesTaken = 0;
    let lowSamples = 0;
    let probeDone = false;
    let probeEnabled = false;
    let qualityCeiling = 'high';
    let currentQuality = document.documentElement.dataset.galaxyQuality || DEFAULT_QUALITY;

    const updateDeviceState = () => {
      const selectedQuality = chooseQuality({
        cores: browserNavigator.hardwareConcurrency,
        memory: browserNavigator.deviceMemory,
        saveData: Boolean(connection?.saveData),
      });
      const quality = QUALITY_RANK[selectedQuality] > QUALITY_RANK[qualityCeiling]
        ? qualityCeiling
        : selectedQuality;
      currentQuality = quality;
      document.documentElement.dataset.galaxyQuality = quality;

      setDeviceState((previous) => previous.quality === quality
        ? previous
        : { quality });
    };

    const handleResize = () => {
      if (resizeFrame) return;
      resizeFrame = browserWindow.requestAnimationFrame(() => {
        resizeFrame = 0;
        updateDeviceState();
      });
    };

    const measureFrameRate = (time) => {
      probeFrame = 0;
      if (browserWindow.document.visibilityState !== 'visible') return;

      if (warmupStartedAt === null) warmupStartedAt = time;
      if (time - warmupStartedAt < 1000) {
        probeFrame = browserWindow.requestAnimationFrame(measureFrameRate);
        return;
      }

      if (sampleStartedAt === null) sampleStartedAt = time;
      sampleFrames += 1;
      const elapsed = time - sampleStartedAt;
      if (elapsed >= 1000) {
        const averageFps = sampleFrames / (elapsed / 1000);
        lowSamples = averageFps < 45 ? lowSamples + 1 : 0;
        samplesTaken += 1;
        sampleStartedAt = time;
        sampleFrames = 0;

        if (lowSamples >= 2 && currentQuality !== 'low') {
          qualityCeiling = currentQuality === 'high' ? 'medium' : 'low';
          updateDeviceState();
          probeDone = true;
          return;
        }
        if (samplesTaken >= 2) {
          probeDone = true;
          return;
        }
      }
      probeFrame = browserWindow.requestAnimationFrame(measureFrameRate);
    };

    const beginFrameRateProbe = () => {
      probeDelay = 0;
      if (!probeDone && browserWindow.document.visibilityState === 'visible' && !probeFrame) {
        warmupStartedAt = null;
        sampleStartedAt = null;
        sampleFrames = 0;
        samplesTaken = 0;
        lowSamples = 0;
        probeFrame = browserWindow.requestAnimationFrame(measureFrameRate);
      }
    };

    const startFrameRateProbe = () => {
      probeEnabled = true;
      if (!probeDone && browserWindow.document.visibilityState === 'visible' && !probeDelay && !probeFrame) {
        probeDelay = browserWindow.setTimeout(beginFrameRateProbe, 1500);
      }
    };

    const stopFrameRateProbe = () => {
      if (probeDelay) browserWindow.clearTimeout(probeDelay);
      if (probeFrame) browserWindow.cancelAnimationFrame(probeFrame);
      probeDelay = 0;
      probeFrame = 0;
      warmupStartedAt = null;
      sampleStartedAt = null;
      sampleFrames = 0;
      samplesTaken = 0;
      lowSamples = 0;
    };

    const handleVisibilityChange = () => {
      updateDeviceState();
      if (browserWindow.document.visibilityState !== 'visible') stopFrameRateProbe();
      else if (probeEnabled) startFrameRateProbe();
    };

    updateDeviceState();
    browserWindow.addEventListener('resize', handleResize, { passive: true });
    connection?.addEventListener?.('change', updateDeviceState);
    browserWindow.document.addEventListener('visibilitychange', handleVisibilityChange);
    if (browserWindow.document.readyState === 'complete') startFrameRateProbe();
    else browserWindow.addEventListener('load', startFrameRateProbe, { once: true });

    return () => {
      if (resizeFrame) browserWindow.cancelAnimationFrame(resizeFrame);
      stopFrameRateProbe();
      browserWindow.removeEventListener('resize', handleResize);
      browserWindow.removeEventListener('load', startFrameRateProbe);
      connection?.removeEventListener?.('change', updateDeviceState);
      browserWindow.document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return {
    ...deviceState,
    reducedMotion,
    settings: qualityLevels[deviceState.quality],
  };
}
