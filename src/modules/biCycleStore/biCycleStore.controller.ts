import { Request, Response } from 'express';
import { BiCycleStoreService } from './biCycleStore.service';

// createBicycleController
const createBicycleController = async (req: Request, res: Response) => {
  try {
    // Access the bicycle data from the request body
    const bicycle = req.body;
    //  Call the service method to create a new bicycle in the database
    const createdBicycle = await BiCycleStoreService.createBicycle(bicycle);

    // Send a success response with the created bicycle data
    res.status(201).json({
      message: 'Bicycle created successfully',
      success: true,
      data: createdBicycle,
    });
  } catch (error: any) {
    // Structure error response
    res.status(400).json({
      success: false,
      message: error.message || 'something went wrong',
      error: error,
      stack: error.stack, // Include stack trace for debugging
    });
  }
};

// getAllBicyclesController
const getAllBicyclesController = async (req: Request, res: Response) => {
  try {
    // Access the bicycle data from the request body
    const { searchTerm } = req.query;
    let bicycles;
    // Call the service method to create a new bicycle in the database
    if (searchTerm) {
      bicycles = await BiCycleStoreService.searchBicycles(searchTerm as string);
    } else {
      bicycles = await BiCycleStoreService.getAllBicycles();
    }
    // Send a success response with the created bicycle data
    res.status(200).json({
      message: 'Bicycles retrieved successfully',
      status: true,
      data: bicycles,
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
