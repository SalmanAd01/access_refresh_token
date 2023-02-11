import { Request,Response } from "express";
import { createSession,createAccessToken,createRefreshToken } from "../services/session.service";
import { verifyUser } from "../services/user.service";


const Login = async (req: Request, res: Response) => {
    try{
        const user = await verifyUser(req.body);
        const session = await createSession(user._id,req.get("user-agent")||"");
    
        // @ts-ignore
        const accessToken = createAccessToken({user,session});
        // @ts-ignore
        const refreshToken = createRefreshToken(session);

        res.cookie('jwt',refreshToken,{httpOnly:true,secure:true,sameSite:'none',maxAge:7*24*60*60*1000})
        return res.send({accessToken})
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

export default Login;