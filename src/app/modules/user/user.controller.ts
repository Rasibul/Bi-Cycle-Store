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


export const userController = {
    registerUser,
    loginUser
};
