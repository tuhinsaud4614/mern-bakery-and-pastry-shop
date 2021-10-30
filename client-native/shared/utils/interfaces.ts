import { OrderStatusType } from "./types";

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
const x = {
  shipping: {
    mobile: "01657778885",
    state: "Cc",
    city: "Ccc",
    zip: "1200",
    country: "bangladesh",
    address: "Ggggg",
  },
  payment: { accountNumber: 88888, trxId: "Yggg", methodName: "bkash" },
  product: [
    {
      productImage: [
        {
          url: "http://res.cloudinary.com/green-valley-grocery/image/upload/v1634619182/product-images/nt9xbm842rqqzm0omwz9.jpg",
          public_id: "product-images/nt9xbm842rqqzm0omwz9",
        },
        {
          url: "http://res.cloudinary.com/green-valley-grocery/image/upload/v1634619185/product-images/kd7rxf5e4bz8mtybqx6n.png",
          public_id: "product-images/kd7rxf5e4bz8mtybqx6n",
        },
      ],
      sold: 0,
      _id: "616e4f310f8cd8292089dd13",
      name: "Lal Peyaj (Onion Red Imported) ± 50 gm",
      category: "Grocery And Staples",
      unit: "kg",
      weight: "1",
      tags: "peyaz,onion,redOnion,lalPeyaz",
      status: "active",
      price: 10,
      stock: 75,
      discount: 8,
      sku: "SRQ24R",
      description:
        "Onions are members of the Allium genus of flowering plants that also includes garlic, shallots, leeks and chives.\nThese vegetables contain various vitamins, minerals and potent plant compounds that have been shown to promote health in many ways.",
      rating: 0,
      createdAt: "2021-10-19T04:53:05.591Z",
      updatedAt: "2021-10-19T04:53:05.591Z",
      __v: 0,
      quantity: 1,
    },
  ],
  _id: "6179ea3f2da6780016610786",
  orderId: "GVG-79774854",
  orderDate: "Oct 28 2021, 06:09:34",
  orderStatus: "Pending",
  paymentStatus: "Pending",
  email: "choykuripython3@gmail.com",
  tax: 5,
  shippingFees: 3,
  __v: 0,
};
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
