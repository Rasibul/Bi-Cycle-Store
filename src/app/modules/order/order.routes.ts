import { Router } from 'express';
import { OrderController } from './order.controller';

const router = Router();

// Create an order
router.post('/', OrderController.createOrderController);

// Calculate revenue
router.get('/revenue', OrderController.calculateRevenueController);

// Exporting the routes
export const OrderRoutes = router;
