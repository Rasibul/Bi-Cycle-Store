import { model, Schema } from 'mongoose';
import { Order } from './order.interface';

// Define the schema for the 'Order' collection
const orderSchema = new Schema<Order>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    product: { type: Schema.Types.ObjectId, ref: 'Bicycle', required: true },
    quantity: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'shipped', 'delivered', 'cancelled'], default: 'pending' }
  },
  { timestamps: true }
);

// Export the model
export const OrderModel = model('Order', orderSchema);
