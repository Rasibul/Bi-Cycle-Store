import express from 'express';
import { BiCycleStoreController } from './biCycleStore.controller';


const router = express.Router();


router.post('/', BiCycleStoreController.createBicycleController);

export const BiCycleStoreRoutes = router;