import { useWindowDimensions } from "react-native";
import { DeviceType } from "./types";

export enum Breakpoints {
  xs = 0,
  sm = 600,
  md = 900,
  lg = 1200,
  xl = 1536,
}

export const breakpoints = {
  up(device: DeviceType): boolean {
    const { width } = useWindowDimensions();
    return width > Breakpoints[device];
  },
  down(device: DeviceType): boolean {
    const { width } = useWindowDimensions();
    return width < Breakpoints[device];
  },
} as const;

export const breakpointsWithDimensions = {
  up(device: DeviceType[]) {
    const { width, height } = useWindowDimensions();
    const multiRatio = device.map((d) => width > Breakpoints[d]);
    return { breakpoints: multiRatio, width, height } as const;
  },
  down(device: DeviceType[]) {
    const { width, height } = useWindowDimensions();
    const multiRatio = device.map((d) => width < Breakpoints[d]);
    return { breakpoints: multiRatio, width, height } as const;
  },
} as const;

export const deviceRange = (): {
  range: DeviceType;
  deviceWidth: number;
  deviceHeight: number;
} => {
  let size: DeviceType = "xs";
  const { width, height } = useWindowDimensions();

  if (width >= Breakpoints.xl) {
    size = "xl";
  } else if (width > Breakpoints.lg) {
    size = "lg";
  } else if (width > Breakpoints.md) {
    size = "md";
  } else if (width > Breakpoints.sm) {
    size = "sm";
  }

  return { range: size, deviceWidth: width, deviceHeight: height };
};

export const boxShadow = (base: number, offset: number = 2) => {
  return {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: offset,
    },
    elevation: offset,
    shadowOpacity: 0.24,
    shadowRadius: base,
  } as const;
};
