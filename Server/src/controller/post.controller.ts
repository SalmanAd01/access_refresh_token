import {Request,Response} from "express";

export const getPost = (req: Request, res: Response) => {
    return res.send("Hello World");
}