import React, { createContext, ReactNode } from 'react';
import { useDeviceRange } from '../../shared/hooks';

export type GridPartitionValueType =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12;

export interface IGridPartitionProps {
  xs?: GridPartitionValueType;
  sm?: GridPartitionValueType;
  md?: GridPartitionValueType;
  lg?: GridPartitionValueType;
  xl?: GridPartitionValueType;
}

export const GridContext = createContext({ width: '100%' });

const GridProvider = ({
  lg,
  md,
  sm,
  xl,
  xs = 1,
  children,
}: IGridPartitionProps & { children?: ReactNode }) => {
  const device = useDeviceRange().range;

  if (lg) {
    xl = xl || lg;
  }
  if (md) {
    lg = lg || md;
    xl = xl || md;
  }
  if (sm) {
    md = md || sm;
    lg = lg || sm;
    xl = xl || sm;
  }

  if (xs) {
    sm = sm || xs;
    md = md || xs;
    lg = lg || xs;
    xl = xl || xs;
  }

  let colWidth = '100%';

  switch (device) {
    case 'xl':
      colWidth = `${100 * ((xl || 1) / 12)}%`;
      break;
    case 'lg':
      colWidth = `${100 * ((lg || 1) / 12)}%`;
      break;
    case 'md':
      colWidth = `${100 * ((md || 1) / 12)}%`;
      break;
    case 'sm':
      colWidth = `${100 * ((sm || 1) / 12)}%`;
      break;
    default:
      colWidth = `${100 * (xs / 12)}%`;
      break;
  }
  return (
    <GridContext.Provider value={{ width: colWidth }}>
      {children}
    </GridContext.Provider>
  );
};

GridProvider.displayName = 'Grid.Provider';
export default GridProvider;
