import { query } from "express";
import { FilterQuery, LeanDocument, UpdateQuery } from "mongoose";
import { SessionDocument, UserDocument } from "../@types";
import Session from "../models/sessio.models";
import {sign} from "../utils/jwt.utils";

export const createSession = async (userId:string,userAgent:string)=>{
    try{
        const session = await Session.create({
            user:userId,
            userAgent
        });
        return session.toJSON();
    }
    catch(err){
        if (err instanceof Error) {
            throw new Error(err.message)
        }
        else {
            throw new Error("Internal Server Error")
        }
    }
}

export const createAccessToken = ({
    user,
    session
}:{
    user : Omit<UserDocument,"password">|LeanDocument<Omit<UserDocument,"password">>,
    session:Omit<SessionDocument,"password">|LeanDocument<Omit<SessionDocument,"password">>
})=>{
    try{
        const accessToken = sign(
            {...user,session:session._id},
            {expiresIn:'15s'}
            )
        return accessToken;
    }
    catch(err){
        if (err instanceof Error) {
            throw new Error(err.message)
        }
        else {
            throw new Error("Internal Server Error")
        }
    }
}

export const createRefreshToken = (
    session:Omit<SessionDocument,"password">|LeanDocument<Omit<SessionDocument,"password">>
)=>{
    try{
        const refreshToken = sign({ session},{expiresIn:'30s'})
        return refreshToken;
    }
    catch(err){
        if (err instanceof Error) {
            throw new Error(err.message)
        }
        else {
            throw new Error("Internal Server Error")
        }
    }

}


export const findSession = async (query:FilterQuery<SessionDocument>)=>{
    try{
        const session = await Session.find(query).lean();
        return session;
    }
    catch(err){
        if (err instanceof Error) {
            throw new Error(err.message)
        }
        else {
            throw new Error("Internal Server Error")
        }
    }
}

export const updateSession = async (
    query:FilterQuery<SessionDocument>,
    update:UpdateQuery<SessionDocument>
)=>{
    try{
        const session = await Session.updateOne(query, update);
        return session;
    }
    catch(err){
        if (err instanceof Error) {
            throw new Error(err.message)
        }
        else {
            throw new Error("Internal Server Error")
        }
    }
}