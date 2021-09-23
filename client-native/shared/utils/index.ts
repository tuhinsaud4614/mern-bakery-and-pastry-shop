import { Platform } from "react-native";
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
