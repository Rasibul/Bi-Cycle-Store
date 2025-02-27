import mongoose, { Schema } from "mongoose";
import { TUser } from "./user.interface";

const UserSchema = new Schema<TUser>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: { type: String, enum: ['admin', 'customer'], default: 'customer' },
        isBlocked: { type: Boolean, default: false },
    },
    { timestamps: true }
);

export const userModel = mongoose.model<TUser>('User', UserSchema);

