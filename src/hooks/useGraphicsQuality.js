import { useEffect, useState } from 'react';
import { chooseQuality, qualityLevels } from '../utilis/worldQuality';

const DEFAULT_QUALITY = 'medium';

export default function useGraphicsQuality() {
  const [deviceState, setDeviceState] = useState({
    quality: DEFAULT_QUALITY,
    reducedMotion: false,
  });

  useEffect(() => {
    const connection = globalThis.navigator.connection;
    const browserWindow = globalThis.window;
    const browserNavigator = globalThis.navigator;
    const motionQuery = browserWindow.matchMedia('(prefers-reduced-motion: reduce)');

    const updateDeviceState = () => {
      const quality = chooseQuality({
        width: browserWindow.innerWidth,
        cores: browserNavigator.hardwareConcurrency || 4,
        memory: browserNavigator.deviceMemory || 4,
        saveData: Boolean(connection?.saveData),
      });

      setDeviceState({ quality, reducedMotion: motionQuery.matches });
    };

    const handleMotionPreference = () => updateDeviceState();

    const initialFrame = browserWindow.requestAnimationFrame(updateDeviceState);
    browserWindow.addEventListener('resize', updateDeviceState, { passive: true });
    if (motionQuery.addEventListener) {
      motionQuery.addEventListener('change', handleMotionPreference);
    } else {
      motionQuery.addListener?.(handleMotionPreference);
    }
    connection?.addEventListener?.('change', updateDeviceState);

    return () => {
      browserWindow.cancelAnimationFrame(initialFrame);
      browserWindow.removeEventListener('resize', updateDeviceState);
      if (motionQuery.removeEventListener) {
        motionQuery.removeEventListener('change', handleMotionPreference);
      } else {
        motionQuery.removeListener?.(handleMotionPreference);
      }
      connection?.removeEventListener?.('change', updateDeviceState);
    };
  }, []);

  return {
    ...deviceState,
    settings: qualityLevels[deviceState.quality],
  };
}
