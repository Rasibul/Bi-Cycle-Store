import express from 'express';
import { userController } from './user.controller';
import { authenticateUser } from '../../middlewares/authenticate';




const router = express.Router();

// User Registration
router.post('/register', userController.registerUser);

// User Login
router.post('/login', userController.loginUser);

router.get('/:id', userController.getSingleUser);

router.get('/', userController.getAllUsers);

router.put('/block/:id', userController.blockUser);

router.post('/change-password', authenticateUser, userController.changePassword);


export const userRoutes = router;