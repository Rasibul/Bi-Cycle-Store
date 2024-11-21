import { Request, Response } from 'express';
import { BiCycleStoreService } from './biCycleStore.service';



const createBicycleController = async (req: Request, res: Response) => {
    try {
        const bicycle = req.body;
        const createdBicycle = await BiCycleStoreService.createBicycle(bicycle);
        res.status(201).json({
            message: "Bicycle created successfully",
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


const getAllBicyclesController = async (req: Request, res: Response) => {
    try {
        const { searchTerm } = req.query;
        let bicycles;

        if (searchTerm) {
            bicycles = await BiCycleStoreService.searchBicycles(searchTerm as string);
        } else {
            bicycles = await BiCycleStoreService.getAllBicycles();
        }

        res.status(200).json({
            message: "Bicycles retrieved successfully",
            status: true,
            data: bicycles,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message || 'Something went wrong',
            error: error,
            stack: error.stack,
        });
    }
};

export const BiCycleStoreController = { createBicycleController, getAllBicyclesController };