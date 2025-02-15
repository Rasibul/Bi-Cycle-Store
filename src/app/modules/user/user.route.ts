import express from 'express';
import { userController } from './user.controller';



const router = express.Router();

// User Registration
router.post('/register', userController.registerUser);

// User Login
router.post('/login', userController.loginUser);



export const userRoutes = router;