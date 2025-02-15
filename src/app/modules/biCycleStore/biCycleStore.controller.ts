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
  const { searchTerm } = req.query;
  let bicycles;
  if (searchTerm) {
    bicycles = await BiCycleStoreService.searchBicycles(searchTerm as string);
  } else {
    bicycles = await BiCycleStoreService.getAllBicycles();
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Bicycles retrieved successfully',
    data: bicycles,
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
  const { productId } = req.params;
  const updatedData = req.body;
  const updatedBicycle = await BiCycleStoreService.updateBicycle(
    productId,
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
