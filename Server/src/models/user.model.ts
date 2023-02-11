import mongoose from "mongoose";
import { UserDocument } from "../@types";
import bcrypt from "bcrypt";
import { envIntVar } from "../utils/dotenv.utils";
const schema = mongoose.Schema;


const userSchema = new schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
},{timestamps:true});


userSchema.methods.comparePassword = async function (password: string) {
    const user = this as UserDocument;
    return await bcrypt.compare(password, user.password).catch(err => {
        throw new Error(err);
    });
}

userSchema.pre<UserDocument>('save',async function (this:UserDocument,next){
    let user = this;
    if(!user.isModified("password")) return next();
    const saltLength = envIntVar('SALT_LENGTH')   
    const salt = await bcrypt.genSalt(saltLength);
    const hash = await bcrypt.hashSync(user.password,salt);

    user.password = hash;
    return next();

})

const User = mongoose.model<UserDocument>('User', userSchema);
export default User;