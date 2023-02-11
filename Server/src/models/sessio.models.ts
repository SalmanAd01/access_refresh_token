import mongoose from "mongoose";
import { SessionDocument } from "../@types";
const schema = mongoose.Schema;


const sessionSchema = new schema({
    user:{
        type: schema.Types.ObjectId,
        ref: "user",
    },
    valid:{
        type: Boolean,
        default: true,
    },
    userAgent:{
        type: String,
        required: true,
    }
},{timestamps: true});


const Session = mongoose.model<SessionDocument>("session", sessionSchema);
export default Session;