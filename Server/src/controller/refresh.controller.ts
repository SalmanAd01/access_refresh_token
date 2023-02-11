import { Request, Response } from "express"
import { get, omit } from "lodash";
import Session from "../models/sessio.models";
import User from "../models/user.model";
import { createAccessToken } from "../services/session.service";
import { findUser } from "../services/user.service";
import { decode } from "../utils/jwt.utils";


const refreshAccessToken = async (req: Request, res: Response) => {
    try {
        const refreshToken = req.cookies?.jwt
        console.log("refreshToken",refreshToken);
        if (!refreshToken) {
            return res.status(401).send("Unauthorized");
        }
        const decoded = decode(refreshToken);
        if (!decoded) {
            console.log("decoded is null");
            res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true });
            return res.status(401).send("Refresh Token Expired");
        }
        const session = await Session.findById(get(decoded, 'session._id'))
        // @ts-ignore
        if (!session || !session?.valid) {
            return res.status(401).send("Unauthorized");

        }
        const user = await findUser({ _id: session.user._id })
        if (!user) {
            return res.status(401).send("Unauthorized");
            
        }
        const userOmitedPassword = omit(user, 'password');
        console.log(userOmitedPassword,session._id)
        // @ts-ignore
        const accessToken = createAccessToken({ user:userOmitedPassword, session:session._id })
        return res.send({ accessToken: accessToken });
    }
    catch (err) {
        if (err instanceof Error) {
            res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true });
            return res.status(409).send(err.message)
        }
        else {
            return res.send("Internal Server Error")
        }

    }
}

export default refreshAccessToken;