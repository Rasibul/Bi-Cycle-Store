import express from 'express';
import { BiCycleStoreController } from './biCycleStore.controller';
import authenticateUser from '../../middlewares/authenticate';
import isAdmin from '../../middlewares/isAdmin';





const router = express.Router();

// Route to create a new bicycle in the store
// Calls the `createBicycleController` method in the BiCycleStoreController
router.post('/', BiCycleStoreController.createBicycleController);

// Route to get a list of all bicycles in the store
// Calls the `getAllBicyclesController` method in the BiCycleStoreController
router.get('/', BiCycleStoreController.getAllBicyclesController);

// Route to get details of a specific bicycle by its ID
// The `:productId` is a dynamic route parameter representing the bicycle's unique ID
// Calls the `getBicycleByIdController` method in the BiCycleStoreController
router.get('/:productId', BiCycleStoreController.getBicycleByIdController);

// Route to update a specific bicycle's details by its ID
// The `:productId` is a dynamic route parameter representing the bicycle's unique ID
// Calls the `updateBicycleController` method in the BiCycleStoreController
router.put('/:productId', authenticateUser, BiCycleStoreController.updateBicycleController);

// Route to delete a specific bicycle by its ID
// The `:productId` is a dynamic route parameter representing the bicycle's unique ID
// Calls the `deleteBicycleController` method in the BiCycleStoreController
router.delete('/:productId', authenticateUser, isAdmin, BiCycleStoreController.deleteBicycleController);

export const BiCycleStoreRoutes = router;
