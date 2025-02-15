import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { userModel } from "../modules/user/user.model";
import config from "../config";
import catchAsync from "../utilitis/catchAsync";
import AppError from "../errors/AppError";
import httpStatus from "http-status";

export const authenticateUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.header("Authorization")?.replace("Bearer ", "")
    if (!token) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
    }

    const decoded = jwt.verify(token, config.jwt_secret || "") as JwtPayload;

    const user = await userModel.findById(decoded.id);
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
    }
    req.user = decoded; // Attach user info to the request
    next();
});

export default authenticateUser;
