import { Router } from 'express';
import { OrderController } from './order.controller';
import authenticateUser from '../../middlewares/authenticate';
import { authMiddlewares } from '../../middlewares/isAdmin';

const router = Router();

// Create an order
router.post('/', authenticateUser, authMiddlewares.isCustomer, OrderController.createOrderController);


router.get('/:userId', authenticateUser, authMiddlewares.isCustomer, OrderController.getOrdersByUserController);

// Calculate revenue
// router.get('/revenue', OrderController.calculateRevenueController);

// Exporting the routes
export const OrderRoutes = router;
