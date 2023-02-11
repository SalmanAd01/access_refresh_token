import { Request,Response } from 'express';
import { get } from 'lodash';
import { updateSession } from '../services/session.service';



const Logout = async (req:Request, res:Response) => {
    try{
        const sessionId = get(req,"user.session");
        console.log(sessionId);
        await updateSession({_id:sessionId},{valid:false});
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true });
        return res.send("Logout Successful");
    }
    catch(err){
        if(err instanceof Error){
            res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true });
            return res.status(409).send(err.message);
        }
        else{
            res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true });
            return res.send('Internal Server Error');
        }
    }


}


export default Logout;