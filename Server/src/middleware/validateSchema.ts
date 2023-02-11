import { Request,Response,NextFunction } from "express";
import { AnySchema } from "yup";



export const validate = (schema:AnySchema) => async (req:Request, res:Response, next:NextFunction) => {
    try{
        await schema.validate({
            body:req.body,
            params:req.params,
            query:req.query
        })
        return next();
    }
    catch(err){
        if(err instanceof Error){
            return res.status(409).send(err.message)
        }
        else{
            return res.send("Internal Server Error")
        }
    }
}