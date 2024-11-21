import express from 'express';
import { BiCycleStoreController } from './biCycleStore.controller';


const router = express.Router();


router.post('/', BiCycleStoreController.createBicycleController);
router.get('/', BiCycleStoreController.getAllBicyclesController);
router.get('/:productId', BiCycleStoreController.getBicycleByIdController);
router.put('/:productId', BiCycleStoreController.updateBicycleController);

export const BiCycleStoreRoutes = router;