import { Order } from "./order.interface";
import { OrderModel } from "./order.model";

const createOrder = (orderData: Order) => {
    const order = OrderModel.create(orderData);
    return order
}


const calculateRevenue = async () => {
    const result = await OrderModel.aggregate([
        {
            $lookup: {
                from: 'bicyclestores', // Collection name in MongoDB
                localField: 'product', // Field in Order collection
                foreignField: '_id',   // Field in BicycleStore collection
                as: 'productDetails',  // Merged data
            },
        },
        { $unwind: '$productDetails' }, // Flatten the merged data
        {
            $group: {
                _id: null, // No grouping key; calculate for all documents
                totalRevenue: { $sum: '$totalPrice' }, // Summing totalPrie
            },
        },
    ])
    return result;
}

export const OrderService = {
    createOrder,
    calculateRevenue
}