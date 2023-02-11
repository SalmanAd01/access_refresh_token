import jwt from 'jsonwebtoken';
import { envStringVar } from './dotenv.utils';

const privateKey = envStringVar('PRIVATE_KEY')
export const sign = (object:Object,options?:jwt.SignOptions|undefined) =>{
    return jwt.sign(object,privateKey,options);
}


export const decode = (token:string)=>{
    try{
        const decoded = jwt.verify(token,privateKey);
        return decoded;
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