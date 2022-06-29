import accessToken from "../../../../controller/auth/accessToken";

export default async function handler(req, res){
    if(req.method === "GET"){
       accessToken(req, res)
    }
    else{
        return res.status(404).send(`Cannot ${req.method} accessToken`);
    }
}