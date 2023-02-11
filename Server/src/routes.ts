import {Express} from 'express';
import Signup from './controller/signup.controller';
import Login from "./controller/login.controller"
import signupSchema from "./schema/signup.schema";
import { validate } from './middleware/validateSchema';
import loginSchema from './schema/login.schema';
import verifyAccessToken from './middleware/verifyAccessToken';
import requireUser from "./middleware/requireUser";
import {sessionGet} from "./controller/session.controller";
import refreshAccessToken from "./controller/refresh.controller"
import Logout from './controller/logout.controller';
import {getPost} from "./controller/post.controller"

const initRoutes = (app:Express)=>{

    app.post('/api/signup',validate(signupSchema),Signup);
    app.post('/api/login',validate(loginSchema),Login);
    app.get('/api/refresh',refreshAccessToken)

    app.use(verifyAccessToken);

    app.get('/api/session',requireUser,sessionGet)
    app.post('/api/logout',requireUser,Logout);

    app.get('/api/post',requireUser,getPost)

}


export default initRoutes;