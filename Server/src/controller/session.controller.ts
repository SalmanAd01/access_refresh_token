import { Request, Response } from 'express';
import { get } from 'lodash';
import { findSession } from '../services/session.service';


const sessionGet = async (req: Request, res: Response) => {
    try {

        const userId = get(req, "user._id");
        const session = await findSession({user:userId,valid:true});
        return res.send(session);

    }
    catch (err) {
        if (err instanceof Error) {
            res.status(409).send(err.message);
        }
        else {
            res.send('Internal Server Error');
        }
    }
}

export {sessionGet};