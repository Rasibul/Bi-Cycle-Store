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

export const BiCycleStoreController = { createBicycleController };