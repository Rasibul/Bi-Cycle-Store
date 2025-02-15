import { Order } from './order.interface';
import { OrderModel } from './order.model';

// createOrder
const createOrder = (orderData: Order) => {
  const order = OrderModel.create(orderData);
  return order;
};

const calculateRevenue = async () => {
  // Calculate total revenue
  const result = await OrderModel.aggregate([
    // Lookup to merge Order and BicycleStore collections
    {
      $lookup: {
        from: 'bicyclestores', // Collection name in MongoDB
        localField: 'product', // Field in Order collection
        foreignField: '_id', // Field in BicycleStore collection
        as: 'productDetails', // Merged data
      },
    },
    { $unwind: '$productDetails' }, // Flatten the merged data
    {
      $group: {
        _id: null, // No grouping key; calculate for all documents
        totalRevenue: { $sum: '$totalPrice' }, // Summing totalPrie
      },
    },
  ]);
  return result;
};

// Exporting the service methods
export const OrderService = {
  createOrder,
  calculateRevenue,
};
