/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { BiCycleStoreModel } from '../biCycleStore/biCycleStore.model';
import { OrderService } from './order.service';

const createOrderController = async (req: Request, res: Response) => {
  const { email, product, quantity, totalPrice } = req.body;

  try {
    // Fetch the bicycle by ID
    const bicycle: any = await BiCycleStoreModel.findById(product);
    if (!bicycle) {
      return res.status(404).json({
        message: 'Bicycle not found',
        status: false,
      });
    }

    // Check if the bicycle is in stock and has sufficient quantity
    if (!bicycle.inStock || bicycle.quantity < quantity) {
      return res.status(400).json({
        message: 'Insufficient stock',
        status: false,
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
    // Send a success response with the created order data
    return res.status(201).json({
      message: 'Order created successfully',
      status: true,
      data: newOrder,
    });
  } catch (error: any) {
    return res.status(500).json({ message: error.message, status: false });
  }
};

// calculateRevenue
const calculateRevenueController = async (req: Request, res: Response) => {
  try {
    // Call the service method
    const result = await OrderService.calculateRevenue();
    // Send a success response
    const totalRevenue = result.length ? result[0].totalRevenue : 0;
    return res.status(200).json({
      message: 'Revenue calculated successfully',
      status: true,
      data: {
        totalRevenue: totalRevenue,
      },
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
      status: false,
    });
  }
};

// Exporting the controllers
export const OrderController = {
  createOrderController,
  calculateRevenueController,
};
