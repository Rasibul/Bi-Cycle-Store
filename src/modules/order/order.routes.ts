import { Router } from 'express';
import { OrderController } from './order.controller';

const router = Router();

// Create an order
router.post('/', OrderController.createOrderController);

router.get('/revenue', OrderController.calculateRevenueController);

export const OrderRoutes = router;
