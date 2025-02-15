import { Router } from 'express';
import { OrderController } from './order.controller';
import authenticateUser from '../../middlewares/authenticate';
import isCustomer from '../../middlewares/isCustomer';


const router = Router();

// Create an order
router.post('/', authenticateUser, isCustomer, OrderController.createOrderController);


router.get('/:userId', authenticateUser, isCustomer, OrderController.getOrdersByUserController);

// Calculate revenue
// router.get('/revenue', OrderController.calculateRevenueController);

// Exporting the routes
export const OrderRoutes = router;
