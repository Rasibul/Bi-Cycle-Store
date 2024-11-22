import { ObjectId } from 'mongoose';

// Defining a TypeScript type named `Order`
// This type describes the structure of a order data
export type Order = {
  email: string;
  product: ObjectId;
  quantity: number;
  totalPrice: number;
  createdAt?: Date;
  updatedAt?: Date;
};
