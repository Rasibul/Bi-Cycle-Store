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

const changePassword = catchAsync(async (req, res) => {
    const { currentPassword, newPassword, confirmPassword } = req.body;
    const userId = req.user?._id; // Ensure the user is attached to the request

    if (!userId) {
        return sendResponse(res, {
            statusCode: httpStatus.UNAUTHORIZED,
            success: false,
            message: 'User not authenticated',
            data: null,
        });
    }

    if (newPassword !== confirmPassword) {
        return sendResponse(res, {
            statusCode: httpStatus.BAD_REQUEST,
            success: false,
            message: 'New password and confirm password do not match',
            data: null,
        });
    }

    const user = await userService.findUserById(userId);
    if (!user) {
        return sendResponse(res, {
            statusCode: httpStatus.NOT_FOUND,
            success: false,
            message: 'User not found',
            data: null,
        });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
        return sendResponse(res, {
            statusCode: httpStatus.UNAUTHORIZED,
            success: false,
            message: 'Current password is incorrect',
            data: null,
        });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await userService.updateUserPassword(userId, hashedPassword);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Password updated successfully',
        data: null,
    });
});

export const userController = {
    registerUser,
    loginUser,
    getSingleUser,
    getAllUsers,
    blockUser,
    changePassword
};
