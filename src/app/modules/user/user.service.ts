import { TUser } from "./user.interface";
import { userModel } from "./user.model";


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
    return await userModel.findByIdAndUpdate(id, { isBlocked: true }, { new: true });
};


export const userService = {
    createUser,
    findUserByEmail,
    findUserById,
    updateUser,
    blockUser

};