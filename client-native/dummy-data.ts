import { IOrder, IProduct } from "./shared/utils/interfaces";

const categories = [
  {
    id: "pastry-cup-pastry-tart",
    title: "Pastry, Cup Pastry & Tart",
  },
  {
    id: "cake",
    title: "Cake",
  },
  {
    id: "sweets",
    title: "sweets",
  },
  {
    id: "biscuits-toast",
    title: "Biscuits & Toast",
  },
  {
    id: "others",
    title: "Others",
  },
];

export const dummyProducts: IProduct[] = [
  {
    category: categories[0],
    feature: true,
    id: "1",
    images: [
      {
        large: require("./assets/pastry-cup-pastry-tart.jpeg"),
        medium: require("./assets/pastry-cup-pastry-tart.jpeg"),
        small: require("./assets/pastry-cup-pastry-tart.jpeg"),
      },
    ],
    price: 120,
    off: 20,
    totalRatings: 3,
    ratings: [{ id: "abc", point: 3 }],
    title: "A pastry",
    description: "This is pastry",
    ingredients: [
      "Chocolate moist sponge",
      "Chocolate cream",
      "Chocolate bar decoration",
    ],
  },
];

export const orders: IOrder[] = [
  {
    id: "1234",
    date: new Date(),
    paymentMethod: { accountNo: 123, id: "123", method: "bkash" },
    products: [
      {
        category: "xyz",
        id: "123",
        images: [],
        price: 120,
        quantity: 5,
        title: "loremhghghghghghg",
      },
    ],
    shippingAddress: {
      address: "123",
      city: "dhaka",
      mobile: "12345",
      area: "mirpur",
      zip: 1200,
    },
    shippingFee: 50,
    status: "pending",
    trackingId: "bp-1234",
    vat: 5,
    totalPrice: 120,
  },
  {
    id: "2345",
    date: new Date(),
    paymentMethod: { accountNo: 123, id: "123", method: "bkash" },
    products: [
      {
        category: "xyz",
        id: "123",
        images: [],
        price: 120,
        quantity: 5,
        title: "loremhghghghghghg",
      },
    ],
    shippingAddress: {
      address:
        "consectetur distinctio rerum est et asperiores ipsa id pariatur! Dicta.",
      city: "dhaka",
      mobile: "12345",
      area: "mirpur",
      zip: 1200,
    },
    shippingFee: 50,
    status: "processing",
    trackingId: "bp-2345",
    vat: 5,
    totalPrice: 120,
  },
  {
    id: "3456",
    date: new Date(),
    paymentMethod: { accountNo: 123, id: "123", method: "bkash" },
    products: [
      {
        category: "xyz",
        id: "123",
        images: [],
        price: 120,
        quantity: 5,
        title: "loremhghghghghghg",
      },
    ],
    shippingAddress: {
      address: "123",
      city: "dhaka",
      mobile: "12345",
      area: "mirpur",
      zip: 1200,
    },
    shippingFee: 50,
    status: "shipping",
    trackingId: "bp-3456",
    vat: 5,
    totalPrice: 120,
  },
  {
    id: "4567",
    date: new Date(),
    paymentMethod: { accountNo: 123, id: "123", method: "bkash" },
    products: [
      {
        category: "xyz",
        id: "123",
        images: [],
        price: 120,
        quantity: 5,
        title: "loremhghghghghghg",
      },
    ],
    shippingAddress: {
      address: "123",
      city: "dhaka",
      mobile: "12345",
      area: "mirpur",
      zip: 1200,
    },
    shippingFee: 50,
    status: "delivered",
    trackingId: "bp-4567",
    vat: 5,
    totalPrice: 120,
  },
];
