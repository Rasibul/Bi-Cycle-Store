import AppError from "../../errors/AppError";
import { TUser } from "./user.interface";
import { userModel } from "./user.model";
import httpStatus from 'http-status';

const createUser = async (userData: Partial<TUser>) => {
    return await userModel.create(userData);
};


const findUserByEmail = async (email: string) => {
    return await userModel.findOne({ email });
};

const findUserById = async (id: string) => {
    return await userModel.findById(id);
};

const updateUser = async (id: string, updateData: Partial<TUser>) => {
    return await userModel.findByIdAndUpdate(id, updateData, { new: true });
};

const blockUser = async (id: string) => {
    const user = await userModel.findById(id);
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'User not found');
    }
    user.isBlocked = !user.isBlocked;
    await user.save();
    return user;
};

const getAllUsers = async () => {
    return await userModel.find();
}

export const userService = {
    createUser,
    findUserByEmail,
    findUserById,
    updateUser,
    blockUser,
    getAllUsers,

};