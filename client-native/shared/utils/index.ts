import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';

export enum Breakpoints {
  xs = 0,
  sm = 600,
  md = 900,
  lg = 1200,
  xl = 1536,
}

export const boxShadow = (base: number, offset: number = 2) => {
  return {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: offset,
    },
    elevation: offset,
    shadowOpacity: 0.24,
    shadowRadius: base,
  } as const;
};

export const convertToLocalDate = (date: Date) => {
  dayjs.extend(localizedFormat);
  return dayjs(date).format('ll');
};

export enum AppConstraints {
  currency = '৳',
}
