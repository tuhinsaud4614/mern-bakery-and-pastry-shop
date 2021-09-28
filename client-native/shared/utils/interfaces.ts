export interface IColorProps {
  main: string;
  dark: string;
  light: string;
  contrastText?: string;
}
export interface IColorShade {
  "50": string;
  "100": string;
  "200": string;
  "300": string;
  "400": string;
  "500": string;
  "600": string;
  "700": string;
  "800": string;
  "900": string;
  A100: string;
  A200: string;
  A400: string;
  A700: string;
}

export interface IProductImage {
  small: string;
  medium: string;
  large: string;
}

export interface IProduct {
  id: string;
  title: string;
  category: {
    id: string;
    title: string;
  };
  feature: boolean;
  price:
    | number
    | {
        small: number;
        medium: number;
        large: number;
        extraLarge: number;
      };
  ingredients?: string[];
  images: IProductImage[];
  description?: string;
  totalRatings: number;
  ratings: { id: string; point: number }[];
}

export interface IReview {
  id: string;
  reviewer: {
    id: string;
    name: string;
  };
  text: string;
  ratings: number;
}
