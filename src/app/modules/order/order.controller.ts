/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { BiCycleStoreModel } from '../biCycleStore/biCycleStore.model';
import { OrderService } from './order.service';
import catchAsync from '../../utilitis/catchAsync';
import sendResponse from '../../utilitis/sendResponse';
import httpStatus from "http-status";



const createOrderController = catchAsync(async (req: Request, res: Response) => {
  const { email, product, quantity, totalPrice } = req.body;

  // Fetch the bicycle by ID
  const bicycle: any = await BiCycleStoreModel.findById(product);
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

  // Update inStock field if quantity reaches 0
  if (bicycle.quantity === 0) {
    bicycle.inStock = false;
  }

  // Save the updated bicycle data
  await bicycle.save();

  // Create the order
  const newOrder = await OrderService.createOrder({
    email,
    product,
    quantity,
    totalPrice,
  });

  // Send success response
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Order created successfully',
    data: newOrder,
  });
});



const calculateRevenueController = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderService.calculateRevenue();
  const totalRevenue = result.length ? result[0].totalRevenue : 0;
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Revenue calculated successfully',
    data: {
      totalRevenue,
    },
  });
});


// Exporting the controllers
export const OrderController = {
  createOrderController,
  calculateRevenueController,
};
