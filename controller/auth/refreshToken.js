import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../../model/User";
import Token from "../../model/Token";

export default async function(req, res){
    const email = req.body.email;
    const password = req.body.password;
    const user = await User.findOne({email:email});
    if(user){
        const isUser = await bcrypt.compare(password, user.password);
        if(isUser){
            const token = jwt.sign({id:user._id}, process.env.REFRESH_KEY);
            const tok = await Token.create({hash:token});
            return tok;
        }
        else{
            return {"error":"Invalid Credentials"};
        }
    }
    else{
        return {"error":"Invalid Credentials"};
    }

}