import mongoose from "mongoose"

export interface UserDocument extends mongoose.Document {
    email: string;
    name: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    comparePassword: (password: string) => Promise<boolean>;
}
export interface SessionDocument extends mongoose.Document {
    user: UserDocument["_id"];
    valid: Boolean;
    userAgent: string;
    createdAt: Date;
    updatedAt: Date;
}