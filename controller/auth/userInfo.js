import User from "../../model/User";
import jwt from "jsonwebtoken";

export default async function(req, res){
    try{
        const token = req.body.token;
        const pd = jwt.verify(token, process.env.ACCESS_KEY);
        const user = await User.findById(pd.id);
        return res.json(user);
    }
    catch(e){
        return res.status(401).json({error:e})
    }

}