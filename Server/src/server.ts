import express,{Request} from 'express';
import connectdb from './db/connect';
import initRoutes from './routes';
import {envIntVar} from './utils/dotenv.utils';
import cors from 'cors'
import cookieParser from 'cookie-parser';

const app = express();
const PORT=envIntVar('PORT');

app.use(cors<Request>({
    origin:'http://localhost:3000',
    credentials:true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser());

app.listen(PORT,()=>{
    initRoutes(app);
    connectdb()
    console.log(`http://localhost:${PORT}`);
})