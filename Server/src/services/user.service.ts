import { omit } from "lodash";
import { MongoError } from "mongodb";
import { DocumentDefinition, FilterQuery } from "mongoose";
import { UserDocument } from "../@types";
import User from "../models/user.model";


export const createUser =async (user:DocumentDefinition<UserDocument>) =>{
    try{
        await User.create(user);
    }
    catch(err){
        if((err as MongoError).code === 11000){
            throw new Error("Email is Already Used")
        }
        else{
            throw new Error(String(err));
        }
    }

}

export const verifyUser = async ({
    email,
    password
}:{
    email:string,
    password:string
})=>{
    try{
        const user = await User.findOne({email});
        if(!user){
            throw new Error("User Not Found");
        }
        else{
            const isValid = await user.comparePassword(password);
            if (!isValid){
                throw new Error("Password is Incorrect");
            }
            return omit(user.toJSON(),'password');
        }
    }
    catch(err){
        if (err instanceof Error){
            throw new Error(err.message);
        }
        else{
            throw new Error("Internal Server Error");
        }
    }
}

export const findUser = async (query:FilterQuery<UserDocument>) =>{
    try{
        const user = await User.findOne(query).lean();
        if(!user){
            throw new Error("User Not Found");
        }
        else{
            return user;
        }
    }
    catch(err){
        if (err instanceof Error){
            throw new Error(err.message);
        }
        else{
            throw new Error("Internal Server Error");
        }
    }
}
