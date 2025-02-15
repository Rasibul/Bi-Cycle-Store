import { ObjectId } from 'mongoose';

// Defining a TypeScript type named `Order`
// This type describes the structure of a order data
export type Order = {
  user: ObjectId;
  product: ObjectId;
  quantity: number;
  totalPrice: number;
  status: 'pending' | 'shipped' | 'delivered' | 'cancelled';
  createdAt?: Date;
  updatedAt?: Date;
};
