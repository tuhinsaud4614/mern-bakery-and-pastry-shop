import { OrderStatusType } from './types';

export interface IColorProps {
  main: string;
  dark: string;
  light: string;
  contrastText?: string;
}
export interface IColorShade {
  '50': string;
  '100': string;
  '200': string;
  '300': string;
  '400': string;
  '500': string;
  '600': string;
  '700': string;
  '800': string;
  '900': string;
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

export interface ICategory {
  id: string;
  title: string;
  slug: string;
  image: IProductImage;
}

export interface IProduct {
  id: string;
  title: string;
  category: ICategory;
  feature: boolean;
  price:
    | number
    | {
        small: number;
        medium: number;
        large: number;
        extraLarge: number;
      };
  off?: number;
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

export interface IOrder {
  id: string;
  trackingId: string;
  date: Date;
  status: OrderStatusType;
  vat: number;
  shippingFee: number;
  totalPrice: number;
  shippingAddress: {
    mobile: string;
    area: string;
    city: string;
    zip: number;
    address: string;
  };
  paymentMethod: { accountNo: number; id: string; method: string };
  products: {
    images: {
      url: string;
      name: string;
    }[];

    id: string;
    title: string;
    category: string;
    price: number;
    quantity: number;
  }[];
}
