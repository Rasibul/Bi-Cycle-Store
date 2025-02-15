import mongoose from 'mongoose';
import { Order } from './order.interface';
import { OrderModel } from './order.model';

// createOrder
const createOrder = (orderData: Order) => {
  const order = OrderModel.create(orderData);
  return order;
};


const getOrdersByUser = async (userId: string) => {
  const orders = await OrderModel.aggregate([
    { $match: { user: new mongoose.Types.ObjectId(userId) } },
    {
      $lookup: {
        from: 'users',
        localField: 'user',
        foreignField: '_id',
        as: 'userDetails'
      }
    },
    {
      $lookup: {
        from: 'bicyclestores',
        localField: 'product',
        foreignField: '_id',
        as: 'productDetails'
      }
    },
    { $unwind: '$userDetails' },
    { $unwind: '$productDetails' },
    {
      $group: {
        _id: '$user',
        user: {
          $first: {
            name: '$userDetails.name',
            email: '$userDetails.email'
          }
        },
        products: {
          $push: {
            name: '$productDetails.name',
            brand: '$productDetails.brand',
            price: '$productDetails.price',
            type: '$productDetails.type',
            description: '$productDetails.description',
            quantity: '$quantity',
            totalPrice: '$totalPrice'
          }
        },
        totalOrderPrice: { $sum: '$totalPrice' }
      }
    }
  ]);

  return orders;
};


const deleteOrderByUser = async (orderId: string, userId: string) => {
  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(orderId)) {
    throw new Error('Invalid order ID');
  }

  // Find the order and ensure it belongs to the user
  const order = await OrderModel.findOne({ _id: orderId, user: userId });

  if (!order) {
    throw new Error('Order not found or unauthorized access');
  }

  // Delete the order
  await OrderModel.findByIdAndDelete(orderId);

  return { message: 'Order deleted successfully' };
};







// const calculateRevenue = async () => {
//   // Calculate total revenue
//   const result = await OrderModel.aggregate([
//     // Lookup to merge Order and BicycleStore collections
//     {
//       $lookup: {
//         from: 'bicyclestores', // Collection name in MongoDB
//         localField: 'product', // Field in Order collection
//         foreignField: '_id', // Field in BicycleStore collection
//         as: 'productDetails', // Merged data
//       },
//     },
//     { $unwind: '$productDetails' }, // Flatten the merged data
//     {
//       $group: {
//         _id: null, // No grouping key; calculate for all documents
//         totalRevenue: { $sum: '$totalPrice' }, // Summing totalPrie
//       },
//     },
//   ]);
//   return result;
// };

// Exporting the service methods
export const OrderService = {
  createOrder,
  // calculateRevenue,
  getOrdersByUser,
  deleteOrderByUser
};
