import {Request, Response} from 'express';
import {createUser} from '../services/user.service';
const Signup = async (req: Request, res: Response)=>{
    try{
        await createUser(req.body);
        res.send('Signup Successful');
    }
    catch(err){
        if(err instanceof Error){
            res.status(409).send(err.message);
        }
        else{
            res.send('Internal Server Error');
        }
    }
}

export default Signup;