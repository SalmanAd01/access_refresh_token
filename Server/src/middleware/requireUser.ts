import {Request,Response,NextFunction} from 'express';
import { get } from 'lodash';

const requireUser = (req:Request, res:Response, next:NextFunction)=>{
    try{
        const user = get(req,"user")
        if(!user){
            return res.status(401).send("Unauthorized");
        }
        return next();
    }
    catch(err){
        if(err instanceof Error){
            return res.status(409).send(err.message);
        }
        else{
            return res.send("Internal Server Error");
        }
    }
}

export default requireUser;