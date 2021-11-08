import { useWindowDimensions } from 'react-native';
import { Breakpoints } from '../utils';
import { DeviceType } from '../utils/types';

export const useBreakpoints = (device: DeviceType, type: 'up' | 'down') => {
  const { width } = useWindowDimensions();
  if (type === 'up') {
    return width > Breakpoints[device];
  }
  return width < Breakpoints[device];
};

export const useBreakpointsWithDimensions = (
  device: DeviceType[],
  type: 'up' | 'down'
) => {
  const { width, height } = useWindowDimensions();
  if (type === 'up') {
    const multiRatio = device.map((d) => width > Breakpoints[d]);
    return { breakpoints: multiRatio, width, height } as const;
  }
  const multiRatio = device.map((d) => width < Breakpoints[d]);
  return { breakpoints: multiRatio, width, height } as const;
};

export const useDeviceRange = (): {
  range: DeviceType;
  deviceWidth: number;
  deviceHeight: number;
} => {
  let size: DeviceType = 'xs';
  const { width, height } = useWindowDimensions();

  if (width >= Breakpoints.xl) {
    size = 'xl';
  } else if (width > Breakpoints.lg) {
    size = 'lg';
  } else if (width > Breakpoints.md) {
    size = 'md';
  } else if (width > Breakpoints.sm) {
    size = 'sm';
  }

  return { range: size, deviceWidth: width, deviceHeight: height };
};
