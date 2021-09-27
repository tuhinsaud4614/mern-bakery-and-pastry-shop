import { Platform, useWindowDimensions } from "react-native";
import { useMediaQuery } from "react-responsive";
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
    const isValid = useMediaQuery({
      query: `(min-width: ${Breakpoints[device]}px)`,
    });
    return isValid;
  },
  down(device: DeviceType): boolean {
    const isValid = useMediaQuery({
      query: `(max-width: ${Breakpoints[device]}px)`,
    });
    return isValid;
  },
} as const;

export const deviceRange = (): DeviceType => {
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

  return size;
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
