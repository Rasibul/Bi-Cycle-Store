/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { BiCycleStoreModel } from '../biCycleStore/biCycleStore.model';
import { OrderService } from './order.service';
import catchAsync from '../../utilitis/catchAsync';
import sendResponse from '../../utilitis/sendResponse';
import httpStatus from "http-status";



const createOrderController = catchAsync(async (req: Request, res: Response) => {
  const { user, product, quantity, totalPrice, status } = req.body;

  // Start a transaction



  // Fetch the bicycle by ID
  const bicycle = await BiCycleStoreModel.findById(product);
  if (!bicycle) {
    return sendResponse(res, {
      statusCode: 404,
      success: false,
      message: 'Bicycle not found',
      data: null,
    });
  }

  // Check if the bicycle is in stock and has sufficient quantity
  if (!bicycle.inStock || bicycle.quantity < quantity) {

    return sendResponse(res, {
      statusCode: 400,
      success: false,
      message: 'Insufficient stock',
      data: null,
    });
  }

  // Deduct the requested quantity
  bicycle.quantity -= quantity;
  if (bicycle.quantity === 0) {
    bicycle.inStock = false;
  }

  // Save the updated bicycle data
  await bicycle.save();

  // Create the order
  const newOrder = await OrderService.createOrder(
    {
      user,
      product,
      quantity,
      totalPrice,
      status,
    },
  );



  // Send success response
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Order created successfully',
    data: newOrder,
  });

});




const getOrdersByUserController = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.params;

  // Fetch orders from service
  const orders = await OrderService.getOrdersByUser(userId);

  if (!orders.length) {
    return sendResponse(res, {
      statusCode: 404,
      success: false,
      message: 'No orders found for this user',
      data: [],
    });
  }

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Orders retrieved successfully',
    data: orders,
  });
});






const deleteOrderByUserController = catchAsync(async (req: Request, res: Response) => {
  const { id: orderId } = req.params;
  const userId = req.user.id;
  await OrderService.deleteOrderByUser(orderId, userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order deleted successfully',
    data: null,
  });
});


// const calculateRevenueController = catchAsync(async (req: Request, res: Response) => {
//   const result = await OrderService.calculateRevenue();
//   const totalRevenue = result.length ? result[0].totalRevenue : 0;
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Revenue calculated successfully',
//     data: {
//       totalRevenue,
//     },
//   });
// });


// Exporting the controllers
export const OrderController = {
  createOrderController,
  // calculateRevenueController,
  getOrdersByUserController,
  deleteOrderByUserController
};
