import httpStatus from 'http-status';
import bcrypt from 'bcrypt';
import { userService } from './user.service';
import catchAsync from '../../utilitis/catchAsync';
import sendResponse from '../../utilitis/sendResponse';
import jwt from 'jsonwebtoken';
import config from '../../config';
import AppError from '../../errors/AppError';


const registerUser = catchAsync(async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userService.createUser({
        name,
        email,
        password: hashedPassword,
    });
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'User registered successfully',
        data: { _id: user._id, name: user.name, email: user.email },
    })
});


const loginUser = catchAsync(async (req, res) => {
    const { email, password } = req.body;
    const user = await userService.findUserByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
        // return res.status(401).json({ success: false, message: 'Invalid credentials' });
        throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid credentials');
    }

    const token = jwt.sign({ id: user._id, role: user.role }, config.jwt_secret || '', {
        expiresIn: '1d',
    })
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Login successful',
        data: { token },
    })
})
const getSingleUser = catchAsync(async (req, res) => {
    const { id } = req.params;
    const user = await userService.findUserById(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User retrieved successfully',
        data: user,
    });
});

const getAllUsers = catchAsync(async (req, res) => {
    const users = await userService.getAllUsers();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Users retrieved successfully',
        data: users,
    });
});

const blockUser = catchAsync(async (req, res) => {
    const { id } = req.params;
    const user = await userService.blockUser(id);
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'User not found');
    }
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: user.isBlocked ? 'User blocked successfully' : 'User unblocked successfully',
        data: user,
    });
});

export const userController = {
    registerUser,
    loginUser,
    getSingleUser,
    getAllUsers,
    blockUser,
};
