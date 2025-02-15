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

// getBicycleByIdController
const getBicycleByIdController = async (req: Request, res: Response) => {
  try {
    // Access the bicycle data from the request body
    const { productId } = req.params;
    const bicycle = await BiCycleStoreService.getBicycleById(productId);

    if (!bicycle) {
      return res.status(404).json({
        message: 'Bicycle not found',
        status: false,
      });
    }
    // Send a success response with the created bicycle data
    res.status(200).json({
      message: 'Bicycle retrieved successfully',
      status: true,
      data: bicycle,
    });
  } catch (error: any) {
    // Structure error response
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      error: error,
      stack: error.stack,
    });
  }
};

// updateBicycleController
const updateBicycleController = async (req: Request, res: Response) => {
  try {
    // Access the bicycle data from the request body
    const { productId } = req.params;
    const updatedData = req.body;
    const updatedBicycle = await BiCycleStoreService.updateBicycle(
      productId,
      updatedData,
    );

    if (!updatedBicycle) {
      return res.status(404).json({
        message: 'Bicycle not found',
        status: false,
      });
    }
    // Send a success response with the created bicycle data
    res.status(200).json({
      message: 'Bicycle updated successfully',
      status: true,
      data: updatedBicycle,
    });
  } catch (error: any) {
    // Structure error response
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      error: error,
      stack: error.stack,
    });
  }
};

// deleteBicycleController
const deleteBicycleController = async (req: Request, res: Response) => {
  try {
    // Access the bicycle data from the request body
    const { productId } = req.params;
    const deletedBicycle = await BiCycleStoreService.deleteBicycle(productId);

    if (!deletedBicycle) {
      return res.status(404).json({
        message: 'Bicycle not found',
        status: false,
      });
    }
    // Send a success response with the created bicycle data
    res.status(200).json({
      message: 'Bicycle deleted successfully',
      status: true,
      data: {},
    });
  } catch (error: any) {
    // Structure error response
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      error: error,
      stack: error.stack,
    });
  }
};

// Exporting the controllers
export const BiCycleStoreController = {
  createBicycleController,
  getAllBicyclesController,
  getBicycleByIdController,
  updateBicycleController,
  deleteBicycleController,
};
