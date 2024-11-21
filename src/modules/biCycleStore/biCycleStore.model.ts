import { Schema, model } from 'mongoose';
import { BiCycleStore } from './biCycleStore.interface';

const biCycleStoreSchema = new Schema<BiCycleStore>(
    {
        name: { type: String, required: true },
        brand: { type: String, required: true },
        price: {
            type: Number,
            required: true,
            min: [0, 'Price must be a positive number'], // Add validation for price
        },
        type: {
            type: String,
            required: true,
            enum: ['Mountain', 'Road', 'Hybrid', 'BMX', 'Electric'], // Enum validation
        },
        description: { type: String, required: true },
        quantity: {
            type: Number,
            required: true,
            min: [0, 'Quantity must be a non-negative number'], // Add validation for quantity
        },
        inStock: { type: Boolean, required: true },
    },
    { timestamps: true }
);


export const BiCycleStoreModel = model<BiCycleStore>('BiCycleStore', biCycleStoreSchema);