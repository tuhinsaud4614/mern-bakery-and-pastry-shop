import { Platform, useWindowDimensions } from "react-native";
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
    return width >= Breakpoints[device];
  },
  down(device: DeviceType): boolean {
    const { width } = useWindowDimensions();
    return width <= Breakpoints[device];
  },
} as const;

export const deviceRange = (): { range: DeviceType; deviceWidth: number } => {
  let size: DeviceType = "xs";
  const { width } = useWindowDimensions();

  if (width >= Breakpoints.xl) {
    size = "xl";
  } else if (width >= Breakpoints.lg) {
    size = "lg";
  } else if (width >= Breakpoints.md) {
    size = "md";
  } else if (width >= Breakpoints.sm) {
    size = "sm";
  }

  return { range: size, deviceWidth: width };
};

export const boxShadow = (base: number, offset: number = 2) => {
  if (Platform.OS === "android") {
    return { elevation: base } as const;
  }
  return {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: offset,
    },
    shadowOpacity: 0.24,
    shadowRadius: base,
  } as const;
};
