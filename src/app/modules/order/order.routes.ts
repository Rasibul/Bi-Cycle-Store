import { Router } from 'express';
import { OrderController } from './order.controller';

import isCustomer from '../../middlewares/isCustomer';
import { authenticateUser } from '../../middlewares/authenticate';


const router = Router();

// Create an order
router.post('/', authenticateUser, isCustomer, OrderController.createOrderController);


router.get('/:userId', authenticateUser, isCustomer, OrderController.getOrdersByUserController);

router.delete('/:id', authenticateUser, isCustomer, OrderController.deleteOrderByUserController);

// Calculate revenue
// router.get('/revenue', OrderController.calculateRevenueController);

// Exporting the routes
export const OrderRoutes = router;
