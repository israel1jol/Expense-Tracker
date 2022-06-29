import jwt from "jsonwebtoken";

export default async function(req, res){
    const token = req.body.token;
    const payload = jwt.verify(token, process.env.ACCESS_KEY);
    return payload;
}
