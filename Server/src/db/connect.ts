import mongoose from "mongoose"
import { envStringVar } from "../utils/dotenv.utils"


const connectdb = ()=>{
    try{
        mongoose.connect(envStringVar('DB_URI'))
        console.log('DB connected')
    }
    catch(err){
        console.log(err)
    }
}

export default connectdb;