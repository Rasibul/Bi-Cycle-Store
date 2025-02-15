import httpStatus from "http-status";
import AppError from "../errors/AppError";
import catchAsync from "../utilitis/catchAsync";

const isCustomer = catchAsync(async (req, res, next) => {
    const user = req.user;

    if (user.role !== 'customer') {
        throw new AppError(httpStatus.FORBIDDEN, 'Access restricted to admins');
    }

    next();
})

export default isCustomer;
