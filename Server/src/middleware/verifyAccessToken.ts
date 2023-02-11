import { Request, Response, NextFunction } from "express"
import { get } from "lodash";
import { decode } from "../utils/jwt.utils";


const verifyAccessToken = (req: Request, res: Response, next: NextFunction) => {
    try {

        const accessToken = get(req, "headers.authorization", "").replace(/^Bearer\s/, "");
        if(!accessToken){
            return res.status(401).send("Unauthorized");
        }
        const decoded = decode(accessToken);
        if(!decoded){
            return res.status(401).send("Unauthorized");
        }
        // @ts-ignore
        req.user = decoded;
        return next();
    }
    catch (err) {
        if (err instanceof Error) {
            return res.status(409).send(err.message)
        }
        else {
            return res.send("Internal Server Error")
        }

    }
}

export default verifyAccessToken;