import Token from "../../model/Token";
import jwt from "jsonwebtoken";

export default async function(req, res){
    const refToken = req.headers.authorization.split(" ")[1];
    const tok = await Token.findOne({hash:refToken});
    if(tok){
        const payload = jwt.verify(tok.hash, process.env.REFRESH_KEY);
        const token = jwt.sign(payload, process.env.ACCESS_KEY, {expiresIn:86400});
        return res.json({"accToken":token});
    }
    else{
        return res.status(401).json({"error":"Invalid refresh Token"});
    }
}