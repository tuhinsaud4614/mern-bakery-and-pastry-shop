import { ICategory, IOrder, IProduct } from './shared/utils/interfaces';

export const dummyCategories: ICategory[] = [
  {
    id: 'pastry-cup-pastry-tart',
    slug: 'pastry-cup-pastry-tart',
    title: 'Pastry, Cup Pastry & Tart',
    image: {
      large: require('./assets/pastry-cup-pastry-tart.jpeg'),
      medium: require('./assets/pastry-cup-pastry-tart.jpeg'),
      small: require('./assets/pastry-cup-pastry-tart-300w.jpeg'),
    },
  },
  {
    id: 'cake',
    slug: 'cake',
    title: 'Cake',
    image: {
      large: require('./assets/cake.jpeg'),
      medium: require('./assets/cake.jpeg'),
      small: require('./assets/cake-300w.jpeg'),
    },
  },
  {
    id: 'sweets',
    slug: 'sweets',
    title: 'sweets',
    image: {
      large: require('./assets/sweets.jpeg'),
      medium: require('./assets/sweets.jpeg'),
      small: require('./assets/sweets-300w.jpeg'),
    },
  },
  {
    id: 'biscuits-toast',
    slug: 'biscuits-toast',
    title: 'Biscuits & Toast',
    image: {
      large: require('./assets/biscuits-toast.jpeg'),
      medium: require('./assets/biscuits-toast.jpeg'),
      small: require('./assets/biscuits-toast-300w.jpeg'),
    },
  },
  {
    id: 'others',
    slug: 'others',
    title: 'Others',
    image: {
      large: require('./assets/others.jpeg'),
      medium: require('./assets/others.jpeg'),
      small: require('./assets/others-300w.jpeg'),
    },
  },
];

export const dummyProducts: IProduct[] = [
  {
    category: dummyCategories[0],
    feature: true,
    id: '1',
    images: [
      {
        large: require('./assets/pastry-cup-pastry-tart.jpeg'),
        medium: require('./assets/pastry-cup-pastry-tart.jpeg'),
        small: require('./assets/pastry-cup-pastry-tart.jpeg'),
      },
    ],
    price: 120,
    off: 20,
    totalRatings: 3,
    ratings: [{ id: 'abc', point: 3 }],
    title: 'A pastry',
    description: 'This is pastry',
    ingredients: [
      'Chocolate moist sponge',
      'Chocolate cream',
      'Chocolate bar decoration',
    ],
  },
];

export const orders: IOrder[] = [
  {
    id: '1234',
    date: new Date(),
    paymentMethod: { accountNo: 123, id: '123', method: 'bkash' },
    products: [
      {
        category: 'xyz',
        id: '123',
        images: [],
        price: 120,
        quantity: 5,
        title: 'loremhghghghghghg',
      },
    ],
    shippingAddress: {
      address: '123',
      city: 'dhaka',
      mobile: '12345',
      area: 'mirpur',
      zip: 1200,
    },
    shippingFee: 50,
    status: 'pending',
    trackingId: 'bp-1234',
    vat: 5,
    totalPrice: 120,
  },
  {
    id: '2345',
    date: new Date(),
    paymentMethod: { accountNo: 123, id: '123', method: 'bkash' },
    products: [
      {
        category: 'xyz',
        id: '123',
        images: [],
        price: 120,
        quantity: 5,
        title: 'loremhghghghghghg',
      },
    ],
    shippingAddress: {
      address:
        'consectetur distinctio rerum est et asperiores ipsa id pariatur! Dicta.',
      city: 'dhaka',
      mobile: '12345',
      area: 'mirpur',
      zip: 1200,
    },
    shippingFee: 50,
    status: 'processing',
    trackingId: 'bp-2345',
    vat: 5,
    totalPrice: 120,
  },
  {
    id: '3456',
    date: new Date(),
    paymentMethod: { accountNo: 123, id: '123', method: 'bkash' },
    products: [
      {
        category: 'xyz',
        id: '123',
        images: [],
        price: 120,
        quantity: 5,
        title: 'loremhghghghghghg',
      },
    ],
    shippingAddress: {
      address: '123',
      city: 'dhaka',
      mobile: '12345',
      area: 'mirpur',
      zip: 1200,
    },
    shippingFee: 50,
    status: 'shipping',
    trackingId: 'bp-3456',
    vat: 5,
    totalPrice: 120,
  },
  {
    id: '4567',
    date: new Date(),
    paymentMethod: { accountNo: 123, id: '123', method: 'bkash' },
    products: [
      {
        category: 'xyz',
        id: '123',
        images: [],
        price: 120,
        quantity: 5,
        title: 'loremhghghghghghg',
      },
    ],
    shippingAddress: {
      address: '123',
      city: 'dhaka',
      mobile: '12345',
      area: 'mirpur',
      zip: 1200,
    },
    shippingFee: 50,
    status: 'delivered',
    trackingId: 'bp-4567',
    vat: 5,
    totalPrice: 120,
  },
];
