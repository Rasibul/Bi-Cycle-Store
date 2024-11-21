import express from 'express';
import { BiCycleStoreController } from './biCycleStore.controller';


const router = express.Router();


router.post('/', BiCycleStoreController.createBicycleController);
router.get('/', BiCycleStoreController.getAllBicyclesController);

export const BiCycleStoreRoutes = router;