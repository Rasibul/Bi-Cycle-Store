import { model, Schema } from 'mongoose';
import { Order } from './order.interface';

// Define the schema for the 'Order' collection
const orderSchema = new Schema<Order>(
  {
    email: { type: String, required: true },

    // Reference to the 'BiCycleStore' collection
    product: {
      type: Schema.Types.ObjectId,
      ref: 'BiCycleStore',
      required: true,
    },
    quantity: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
  },
  { timestamps: true },
);

// Export the model
export const OrderModel = model('Order', orderSchema);
