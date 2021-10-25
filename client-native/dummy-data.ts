import { IProduct } from "./shared/utils/interfaces";

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
