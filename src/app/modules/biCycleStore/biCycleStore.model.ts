import { Schema, model } from 'mongoose';
import { BiCycleStore } from './biCycleStore.interface';

// Define the schema for the 'BiCycleStore' collection

const biCycleStoreSchema = new Schema<BiCycleStore>(
  {
    name: { type: String, required: true },
    brand: { type: String, required: true },

    // 'price' field: a required number for the bicycle's price
    // Validation to ensure the price is a positive number
    price: {
      type: Number,
      required: true,
      min: [0, 'Price must be a positive number'],
    },

    // 'type' field: a required string representing the type of bicycle
    // The 'enum' ensures that only these values are allowed for 'type'

    type: {
      type: String,
      required: true,
      enum: ['Mountain', 'Road', 'Hybrid', 'BMX', 'Electric'],
    },
    description: { type: String, required: true },

    // 'quantity' field: a required number indicating how many bikes of this type are available
    // Validation to ensure the quantity is not negative

    quantity: {
      type: Number,
      required: true,
      min: [0, 'Quantity must be a non-negative number'],
    },

    // 'inStock' field: a required boolean indicating whether the bicycle is in stock
    inStock: { type: Boolean, required: true },
  },
  { timestamps: true },
);

// Create a model based on the 'BiCycleStore' schema to interact with the MongoDB collection

export const BiCycleStoreModel = model<BiCycleStore>(
  'BiCycleStore',
  biCycleStoreSchema,
);
