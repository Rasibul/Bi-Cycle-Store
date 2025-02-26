/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { BiCycleStoreService } from './biCycleStore.service';
import catchAsync from '../../utilitis/catchAsync';
import sendResponse from '../../utilitis/sendResponse';
import httpStatus from "http-status";



const createBicycleController = catchAsync(async (req: Request, res: Response) => {
  const bicycle = req.body;
  const createdBicycle = await BiCycleStoreService.createBicycle(bicycle);
  sendResponse(res, {

    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Bicycle created successfully',
    data: createdBicycle,
  });
});



const getAllBicyclesController = catchAsync(async (req: Request, res: Response) => {
  const { searchTerm, minPrice, maxPrice, category, availability, brand, page = 1, limit = 10 } = req.query;

  // Build filters object
  const filters: any = {};

  // Apply price filter correctly
  if (minPrice && maxPrice) {
    filters.price = { $gte: parseFloat(minPrice as string), $lte: parseFloat(maxPrice as string) };
  }
  if (category) {
    filters.type = category as string; // Make sure your category field in MongoDB is "type"
  }
  if (availability !== undefined) {
    filters.availability = availability === 'true'; // Convert to boolean
  }
  if (brand) {
    filters.brand = brand as string;
  }

  // Call the service method
  const result = await BiCycleStoreService.searchBicycles(
    searchTerm as string,
    filters,
    { page: parseInt(page as string), limit: parseInt(limit as string) }
  );

  // Send response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bicycles retrieved successfully',
    data: result,
  });
});





const getBicycleByIdController = catchAsync(async (req: Request, res: Response) => {
  const { productId } = req.params;
  const bicycle = await BiCycleStoreService.getBicycleById(productId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bicycle retrieved successfully',
    data: bicycle,
  });
});



const updateBicycleController = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedData = req.body;
  const updatedBicycle = await BiCycleStoreService.updateBicycle(
    id,
    updatedData,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bicycle updated successfully',
    data: updatedBicycle,
  });
});



const deleteBicycleController = catchAsync(async (req: Request, res: Response) => {
  const { productId } = req.params;
  const deletedBicycle = await BiCycleStoreService.deleteBicycle(productId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bicycle deleted successfully',
    data: deletedBicycle,
  });
});

// Exporting the controllers
export const BiCycleStoreController = {
  createBicycleController,
  getAllBicyclesController,
  getBicycleByIdController,
  updateBicycleController,
  deleteBicycleController,
};
