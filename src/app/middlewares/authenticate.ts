import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../utilitis/catchAsync';
import AppError from '../errors/AppError';
import config from '../config';
import { userModel } from '../modules/user/user.model';



export const authenticateUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");


    if (!token) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
    }

    try {
        const decoded = jwt.verify(token, config.jwt_secret || "") as { id: string };


        const user = await userModel.findById(decoded.id);
        if (!user) {
            throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!');
        }

        req.user = user; // Attach the full user object to the request
        next();
    } catch (error) {

        throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid token');
    }
});