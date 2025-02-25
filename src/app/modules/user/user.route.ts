import express from 'express';
import { userController } from './user.controller';



const router = express.Router();

// User Registration
router.post('/register', userController.registerUser);

// User Login
router.post('/login', userController.loginUser);

router.get('/:id', userController.getSingleUser);

export const userRoutes = router;